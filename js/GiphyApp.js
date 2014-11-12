;
(function(window, undefined) {

    "use strict";
    var GiphyView = Backbone.View.extend({
        tagName: "div",
        className: "view",
        initialize: function(opts) {
            this.options = _.extend(

                {}, {
                    $container: $('body')
                },
                opts
            );
            this.options.$container.prepend(this.el);
            this.render();
        },
        template: '<img src="{images.fixed_height.url}">',
        render: function() {
            this.el.innerHTML = _.template(this.template, this.options);

        }
    });

    function GiphyClient(options) {
        this.options = _.extend({}, options, {
            api_key: "dc6zaTOxFJmzC"
        });
        this.init();
    }

    GiphyClient.prototype.queryAPI = function(search) {
        var url = [
            "http://api.giphy.com/v1/gifs/search?q=",
            search,
            "&api_key=",
            this.options.api_key
        ];
        return $.get(url.join("")).then(function() {
            return arguments[0];
        });
    };

    GiphyClient.prototype.makeRequest = function() {
        $.when(
            this.queryAPI("pokemon")
        ).then(function() {
            arguments[0].data.forEach(function(data) {
            	console.log(data);
                new GiphyView(data);
            });

        });
    };

    GiphyClient.prototype.init = function() {
        var self = this;
        self.makeRequest();

    };
    window.GiphyClient = GiphyClient;
})(window, undefined);
