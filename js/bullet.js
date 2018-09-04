function Bullet(game, x, y) {
    this.game = game;

    this.x = x;
    this.y = y;
    this.bulletVelocity = 15;
    this.missile = new Image();
    this.missile.src = 'img/missile.png';
    this.h = 25;
    this.w = 25;

}

Bullet.prototype.drawBullet = function() {
    this.game.ctx.save()
    this.game.ctx.drawImage(this.missile, this.x, this.y, this.w, this.h);
    this.game.ctx.restore()
}

Bullet.prototype.move = function() {
  this.x += this.bulletVelocity;
}
