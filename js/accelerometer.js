var accelerometer = {
    initialize: function() {
        this.bindEvents();
        this.watchID = null;
        this.viewAcc = 10;//See Acceleration cube
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        function startWatch() {
            var options = { frequency: 200 };
            watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        }
        function stopWatch() {
            if (watchID) {
                navigator.accelerometer.clearWatch(watchID);
                watchID = null;
            }
        }
        function onSuccess(acceleration) {
            $.event.trigger("accelerationIn",acceleration);
            if(this.viewAcc>0){
                var x = acceleration.x*this.viewAcc;
                var y = acceleration.y*this.viewAcc;
                var z = acceleration.z*this.viewAcc;
                $('#cube1').css('top',x+'px').css('left','-60px');
                $('#cube2').css('top',y+'px').css('left','-40px');
                $('#cube3').css('top',z+'px').css('left','-30px');
            }
        }
        function onError() {
           alert('accelerometer.onError');                 
        }
        startWatch();
    }
};