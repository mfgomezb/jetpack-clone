function Evil(game) {
    this.game = game;
    this.evil = new Image();
    this.evil.src = 'img/evilbear.png';

    this.x = this.game.canvas.width - 150;
    this.y = 150;
    this.w = 90;
    this.h = 130;
    this.dy = 5;
    this.fall = true;
}


Evil.prototype.drawEvil = function () {
    this.game.ctx.save()
    this.game.ctx.drawImage(this.evil, this.x, this.y, this.w, this.h);
    this.game.ctx.restore()
}

Evil.prototype.move = function () {
    if (this.y >= 150 && this.y <= 500 && this.fall) {
        if (this.y == 500) {
            this.fall = false
        } else {
            this.y += this.dy;
        }
    } else if ((this.y >= 150 && this.y <= 500 && !this.fall)) {
        if (this.y == 150) {
            this.fall = true
        } else {
            this.y -= this.dy
        }
    }

};