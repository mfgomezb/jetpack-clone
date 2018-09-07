function Sound(game) {
    this.game = game;
}


Sound.prototype.coinAudio = function() {
    var audio = new Audio("audio/coin.wav");
    audio.play()
}

var audio1 = new Audio("audio/jetpack.wav");
Sound.prototype.jetpackAudio = function() {
    audio1.play();
}

Sound.prototype.jetpackAudioStop = function() {
    audio1.stop();
}

Sound.prototype.healAudio = function() {
    var audio = new Audio("audio/heal.wav");
    audio.play();
    }

Sound.prototype.stunAudio = function() {
    var audio = new Audio("audio/stun.wav");
    audio.play();
}

Sound.prototype.charAudio = function() {
    var audio = new Audio("audio/charsound.wav");
    audio.play();
}

Sound.prototype.evilAudio = function() {
    var audio = new Audio("audio/evilsound.wav");
    audio.play();
}

Sound.prototype.damageAudio = function() {
    var audio = new Audio("audio/damage.wav");
    audio.play();
}

Sound.prototype.evilDeathAudio = function() {
    var audio = new Audio("audio/gameover.wav");
    audio.play();
}   