var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //playAudio("/android_asset/www/mp3/drum.mp3");
    },
    receivedEvent: function(id) {
        app.start();
    },    
    start: function(){
    }
};
