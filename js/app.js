window.onload = app;

// runs when the DOM is loaded
function app() {

    // load some scripts (uses promises :D)
    loader.load({
        url: "./bower_components/jquery/dist/jquery.min.js"
    }, {
        url: "./bower_components/lodash/dist/lodash.min.js"
    }, {
        url: "./bower_components/backbone/backbone.js"
    }, {
        url: "./bower_components/pathjs/path.min.js"
    }, {
        url: "./js/soundcloud.js"
    }, {    
        url: "connect.soundcloud.com/sdk.js"
    }).then(function() {
        _.templateSettings.interpolate = /\{([\s\S]+?)\}/g;

        window.soundcloud = new SoundcloudApp();
        // start app?
    
    });

}
