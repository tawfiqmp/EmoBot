(function(window, undefined) {
    "use strict";

    var SoundBot = Backbone.Model.extend({
        defaults: {
            format: 'json',
            q: 'soul',
            client_id: '9f71c1134013b218057ea215865270fc',
            tags: 'happy',
            order: 'hotness',
            limit: '5',
            offset: '0'
        },

        urlRoot: function() {
            return [
                'http://api.soundcloud.com/playlists?',
                'format=',
                this.get('format'),
                '&q=',
                this.get('q'),
                '&client_id=',
                this.get('client_id'),
                '&tags=',
                this.get('tags'),
                '&order=',
                this.get('order'),
                '&limit=',
                this.get('limit'),
                '&offset=',
                this.get('offset')
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
        tagName: 'li'
        template:  _.template($('#trackTemplate').html()),
    	initialize: function(){
    		this.model = new SoundBot();
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
            this.$el.html(this.template(this.model.attributes));
    	},
        getNewSound: function() {
            var self = this;
            this.model.getSound().then(function() {
                self.el.querySelector('.tracks').innerHTML
            });
        }
    });

    window.SoundApp = SoundBot;
    window.soundView = SoundView;
})(window, undefined);
