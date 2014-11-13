;
(function(window, undefined) {
    window.GiphyModel = Backbone.Model.extend({

        defaults: {
            search: "crazy",
            format: "json",
            api_key: "dc6zaTOxFJmzC"
        },
        urlRoot: function() {
            return [
                "/giphy/search",
                "?q=",
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

    });

    var GiphyView = Backbone.View.extend({
        template: "<div class='image'></div>",
        initialize: function(options) {
            this.model = new GiphyModel({
                search: "confused"
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
            });
        },
        events: {}
    });

    var AppView = Backbone.View.extend({
        el: document.querySelector('body'),
        initialize: function() {
            this.giphyView = new GiphyView();
            this.soundView = new SoundView();
        },
        events: {
            "click a.fa-thumbs-up": function(e) {
                this.uprender(e);
                //this.happyMusic(e);

            },   
            "click a.fa-thumbs-o-down": function(e) {
                this.downrender(e);
                //this.sadMusic(e);
            },
        },
        uprender: function() {
            var self = this;

            console.log(this.giphyView.model.attributes.search);

            this.giphyView.model.attributes.search = "happy";
            this.model = new GiphyModel({
                search: "happy"
            });
            this.model.getGif().then(function(url) {
                var x = (~~(Math.random() * (url.data.length)));
                self.el.querySelector('.image').innerHTML = "<img src=" + url.data[x].images.fixed_height.url + ">";
            })

        },

        // happyMusic: function() {
        //     var self=this.


        // },
        downrender: function() {
            var self = this;

            console.log(this.giphyView.model.attributes.search);
            this.giphyView.model.attributes.search = "sad";
            this.model = new GiphyModel({
                search: "sad"
            });
            this.model.getGif().then(function(url) {
                var x = (~~(Math.random() * (url.data.length)));
                self.el.querySelector('.image').innerHTML = "<img src=" + url.data[x].images.fixed_height.url + ">";
            })
        },
        refrender: function() {
            alert("not sure what do");
        }
    })

    var GiphyApp = Backbone.Router.extend({
        initialize: function() {
            this.appLevelView = new AppView();
            Backbone.history.start();
        },
        routes: {
            "*actions": "defaultRoute"
        },
        defaultRoute: function() {
            this.appLevelView.render();
        }
    });

    window.GiphyApp = GiphyApp;

})(window, undefined);
