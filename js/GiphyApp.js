;
(function(window, undefined) {
    window.GiphyModel = Backbone.Model.extend({
        defaults: {
            search: "happy",
            format: "json",
            api_key: "dc6zaTOxFJmzC"
        },
        urlRoot: function() {
            return [
                "http://api.giphy.com/v1/gifs/search?q=",
                this.get("search"),
                "&api_key=",
                this.get("api_key")
            ].join("");
        },
        getGif: function() {
            var self = this;
            return this.fetch().then(function(model) {
                return model;
            })
        }

    })
    var GiphyView = Backbone.View.extend({
        template: "<div class ='image'></div>",
        initialize: function(options) {
            this.model = new GiphyModel({
                search: "ryan"
            });
            this.options = _.extend({}, {
                    $container: $('div.page.page-right')
                },
                options
            )
            this.options.$container.append(this.el);
            this.render();
        },
        render: function() {
            this.getRandomImage();
            this.el.innerHTML = _.template(this.template, this.options)
        },
        getRandomImage: function() {
            var self = this;
            this.model.getGif().then(function(url) {
                var x = (~~(Math.random() * (url.data.length)));
                self.el.querySelector('.image').innerHTML = "<img src=" + url.data[x].images.fixed_height.url + ">";
            })
        }
    })
    var GiphyApp = Backbone.Router.extend({
        initialize: function() {
            this.appLevelView = new GiphyView();
            Backbone.history.start();
        },
        routes: {
            "*actions": "defaultRoute"
        },
        defaultRoute: function() {
            this.appLevelView.render();
        }
    })
    window.GiphyApp = GiphyApp;
    // var GiphyAppView = Backbone.View.extend({
    //     tagName: "div",
    //     className: "view",
    //     loadTemplate: function(name) {
    //         return $.get("./templates/" + name + ".html").then(function() {
    //             return arguments[0];
    //         })
    //     },
    //     initialize: function() {
    //         $(document.body).append(this.el);
    //     },
    //     render: function() {
    //         console.log(this.$el.html(this.template));
    //         var self = this;
    //         $.when(
    //             this.loadTemplate('GiphyGifs')
    //         ).then(function(giphyTemplate) {
    //             self.el.innerHTML = giphyTemplate;
    //         })
    //     }
    // })
    // var GiphyView = Backbone.View.extend({
    //     tagName: "div",
    //     className: "view",
    //     initialize: function(opts) {
    //         this.options = _.extend(

    //             {}, {
    //                 $container: $('body')
    //             },
    //             opts
    //         );
    //         this.options.$container.prepend(this.el);
    //         this.render();
    //     },
    //     template: '<img src="{images.fixed_height.url}">',
    //     render: function() {
    //         this.el.innerHTML = _.template(this.template, this.options);

    //     }
    // });

    // function GiphyClient(options) {
    //     this.options = _.extend({}, options, {
    //         api_key: "dc6zaTOxFJmzC"
    //     });
    //     this.init();
    // }

    // GiphyClient.prototype.queryAPI = function(search) {
    //     var url = [
    //         "http://api.giphy.com/v1/gifs/search?q=",
    //         search,
    //         "&api_key=",
    //         this.options.api_key
    //     ];
    //     return $.get(url.join("")).then(function() {
    //         return arguments[0];
    //     });
    // };

    // GiphyClient.prototype.makeRequest = function() {
    //     $.when(
    //         this.queryAPI("pokemon")
    //     ).then(function() {
    //         arguments[0].data.forEach(function(data) {
    //             new GiphyView(data);
    //         });

    //     });
    // };

    // GiphyClient.prototype.init = function() {
    //     var self = this;
    //     self.makeRequest();

    // };
})(window, undefined);
