;(function(window, undefined){
    "use strict";

    var NAMES = ["Sage", "Forrest", "Kale", "Fir", "Carrot", "Leaf", "Shroder", "Tanner", "Tucker", "Colter", "Casper", "Jasper", "JP", "TJ", "KC", "PK", "ZZ", "Rainier", "Jackson", "Baker", "McKinley", "Sierra", "Aspen", "Vail"]; //derp

    window.RipperFlickr = Backbone.Model.extend({
        defaults: {
            search: "Mount Rainier",
            tagmode: "any",
            format: "json",
            method: "flickr.photos.search",
            api_key: "12a9572403c91cd8fd6fcfef25eb7430",
            api_secret: "30148b5928593a73",
        },
        urlRoot: function(){
            return [
                "https://api.flickr.com/services/rest/?",
                "method=",
                this.get('method'),
                "&api_key=",
                this.get('api_key'),
                "&format=",
                this.get('format'),
                "&tags=",
                this.get('search'),
                "&tagmode=",
                this.get("tagmode"),
                "&jsoncallback=?"
            ].join("");
        },
        flickrPhotoURLTemplate: "https://farm{farm}.staticflickr.com/{server}/{id}_{secret}_{options}.jpg",
        getRandomImageUrl: function(){
            var self = this;
            return this.fetch().then(function(model){
                var photos = self.get('photos');
                var photo = photos && photos.photo && photos.photo.length && photos.photo[ ~~(Math.random() * (photos.photo.length-1)) ];
                photo.options = "b";
                return photo ? _.template(self.flickrPhotoURLTemplate, photo) : null;
            })
        }
    });

    var RipperNameView = Backbone.View.extend({
        template: "<div class='image'></div>",
        initialize: function(options){
            this.options = _.extend({}, { name: this.getRandomName() }, options)
            this.el.setAttribute('data-name', this.options.name);
            this.model = new RipperFlickr({ search: this.options.name });
            this.render();
        },
        getRandomName: function(){
            return NAMES[ ~~(Math.random() * (NAMES.length-1)) ];
        },
        render: function(){
            this.$el.html(this.template);
            this.getRandomImage();
        },
        getRandomImage: function(){
            var self = this;
            this.model.getRandomImageUrl().then(function(url){
                if(!url) return; // jus do nothing if no image found by the model
                self.el.querySelector('.image').style['background-image'] = "url("+url+")";
            });
        }
    })

    var RipperAppView = Backbone.View.extend({
        tagName: "div",
        className: "container",
        loadTemplate: function(name){
            return $.get('./templates/'+name+'.html').then(function(){
                return arguments[0];
            })
        },
        initialize: function(){
            $(document.body).append(this.el);
        }, 
        render: function(first, last){

            var data = [{
                className:"first-name"
            }, {
                className: "last-name"
            }];

            first  && (data[0].name = first);
            last && (data[1].name = last);

            this.subViews = [
                new RipperNameView(data[0]),
                new RipperNameView(data[1])
            ];
            
            var self = this;

            $.when(
                this.loadTemplate('ripper-button')
            ).then(function(ripperTemplate){
                self.el.innerHTML = ripperTemplate; // clear out the container, put the button in

                self.subViews.forEach(function(view){
                    self.$el.prepend(view.el); // append the containers for each child view
                })
            })
        },
        events: {
            "click .ripper-button": "rerender"
        },
        rerender: function(){
            var names = location.hash.substring(1).split("/");
            this.render(names[0], names[1]);
        }
    })

    var RipperApp = Backbone.Router.extend({
        initialize: function(){
            this.appLevelView = new RipperAppView();
            Backbone.history.start();
        },
        routes: {
            ":first/:last": "findNames",
            "*actions": "defaultRoute" // matches anything not matched before this, i.e. http://example.com/#anything-here
        },
        defaultRoute: function(){
            this.appLevelView.render();
        },
        findNames: function(first, last){
            this.appLevelView.render(first, last);
        }
    })

    window.RipperApp = RipperApp;
})(window, undefined);