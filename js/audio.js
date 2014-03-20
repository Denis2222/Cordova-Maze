var my_media = null;
var mediaTimer = null;
function playAudio(src) {
    my_media = new Media(src, onSuccess, onError);
    my_media.play();
    if (mediaTimer == null) {
        mediaTimer = setInterval(function() {
            my_media.getCurrentPosition(
                function(position) {
                    if (position > -1) {
                        setAudioPosition((position) + " sec");
                    }
                },
                function(e) {
                    console.log("Error getting pos=" + e);
                    setAudioPosition("Error: " + e);
                }
            );
        }, 1000);
    }
}
function pauseAudio() {
    if (my_media) {
        my_media.pause();
    }
}
function stopAudio() {
    if (my_media) {
        my_media.stop();
    }
    clearInterval(mediaTimer);
    mediaTimer = null;
}
function onSuccess() {
    console.log("playAudio():Audio Success");
}
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
function setAudioPosition(position) {
    document.getElementById('audio_position').innerHTML = position;
}