;(function(window, undefined){
    
    window.Soundcloud = Backbone.Model.extend({
        defaults: {
            format: "js",
            client_id: "9f71c1134013b218057ea215865270fc",
        },
        urlRoot: function(){
            return [
                "https://api.soundcloud.com/",
                "tracks.",
                this.get("format"),
                "?client_id=",
                this.get("client_id"),
            ].join("");
        },
        //flickrPhotoURLTemplate: "https://farm{farm}.staticflickr.com/{server}/{id}_{secret}_{options}.jpg",
        // getMusicUrl: function(){
        //     var self = this;
        //     return this.fetch().then(function(){
        //         var photos = self.get('photos');
        //         var photo = photos && photos.photo && photos.photo.length && photos.photo[ ~~(Math.random() * (photos.photo.length-1)) ];
        //         photo.options = "b";

        //         return photo ? _.template(self.flickrPhotoURLTemplate, photo) : null;
        //     })
        // }
    });

    var SoundcloudAppView = Backbone.View.extend({
        tagName: "div",
        className: "container",
        loadTemplate: function(name){
            return $.get('./templates/'+name+'.html').then(function(){
                return arguments[0];
            })
        },
        initialize: function(){
            $(document.body).append(this.el);
            this.render(); // just go ahead and render immediately
        }, 
        render: function(){

            this.subViews = [
                new RipperNameView({ className:"first-name" }),
                new RipperNameView({ className: "last-name" })
            ];
            
            var self = this;

            $.when(
                this.loadTemplate('ripper-button')
            ).then(function(ripperTemplate){
                self.el.innerHTML = ripperTemplate;

                self.subViews.forEach(function(view){
                    self.$el.prepend(view.el);
                })
            })
        },
        events: {
            "click .ripper-button": "render"
        }
    })

    var SoundcloudApp = Backbone.Router.extend({
        initialize: function(){
            this.appLevelView = new RipperAppView();
            Backbone.history.start();
        },
        routes: {
            "*actions": "defaultRoute" // matches anything not matched before this, i.e. http://example.com/#anything-here
        },
        defaultRoute: function(){
            //...
        },
    })

    window.SoundcloudApp = SoundcloudApp;
})(window, undefined);