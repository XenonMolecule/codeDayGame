var soundList = [];
function sound(name,url){
    this.name = name;
    this.url = url;
    this.audio = initializeSound(url);
    soundList.push(this);
}

function initializeSound(src){
    var audio = new Audio();
    audio.src = src;
    audio.loop = true;
    audio.volume = 0;
    return audio;
}

var backgroundMusicOne = new sound("backgroundMusicOne","resources/music.mp3");
var silence = new sound("silence","resources/blank.wav");
var backgroundMusicTwo = new sound("backgroundMusicTwo","resources/backMusic2.mp3");