(function(window, undefined) {
    "use strict";

    var SoundBot = Backbone.Model.extend({
        defaults: {
            format: 'json',
            q: 'soul',
            client_id: '9f71c1134013b218057ea215865270fc',
            tags: 'funny',
            limit: '5',
            offset: '0',
            genre: 'rock'
        },

        urlRoot: function() {
            return [
                '/soundcloud/tracks?',
                'format=',
                this.get('format'),
                '&q=',
                this.get('q'),
                '&client_id=',
                this.get('client_id'),
                '&tags=',
                this.get('tags'),
                '&limit=',
                this.get('limit'),
                '&offset=',
                this.get('offset'),
                '&genre=',
                this.get('genre')
            ].join("");

        },
        getSound: function() {
            var self = this;
            return this.fetch().then(function(model) {
                return model;
            });
        }
    });

    var SoundView = Backbone.View.extend({

        template: "<div class='music'></div>",
    	initialize: function(options){
    		this.model = new SoundBot({
                q: "happy",
                genre: "pop",
                tags: "american"
            });
            this.options = _.extend({}, {
                    $container: $('div.page.page-left')
                },
                options
            )
            this.options.$container.append(this.el);
    		this.render();
    	},
    	render: function(){
    		this.getNewSound();
            this.el.innerHTML = _.template(this.template, this.options)
    	},
        getNewSound: function() {
            var self = this;
            this.model.getSound().then(function(url) {

                for(var i = 0; i< url.length; i++){
                    console.log(url[i]);
                    self.el.querySelector('.music').innerHTML += "<iframe src= 'http://w.soundcloud.com/player?url=" + url[i].uri + "'width='100%' 'height=450' 'frameborder='no'>"
                }
            });
        }
    });

//<iframe src="http://w.soundcloud.com/player?url=http://api.soundcloud.com/playlists/<%= id %>" width="100%" frameborder="no">

    window.SoundApp = SoundBot;
    window.SoundView = SoundView;
})(window, undefined);
