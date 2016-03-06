var theAudioContext;
window.addEventListener('load', init, false);
function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    theAudioContext = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser... music will not work');
  }
}
function loadSound(url){
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function(){
        theAudioContext.decodeAudioData(request.response, function(buffer){
            return(buffer);
        }, console.log("error loading sound: "+url));
    };
    request.send();
}
var soundList = [];
function sound(name,url){
    this.name = name;
    this.url = url;
    this.buffer = loadSound(url);
    soundList.push(this);
}

var backgroundMusicOne = new sound("backgroundMusicOne","resources/music.mp3");

