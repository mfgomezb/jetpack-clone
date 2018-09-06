function Bullet(game, x, y) {
    this.game = game;
    this.type = "bullet"
    this.x = x;
    this.y = y;
    this.bulletVelocity = 15;
    this.bulletVelocity2 = 30;
    this.missile = new Image();
    this.missile.src = 'img/missile.png';
    this.missile2 = new Image();
    this.missile2.src = 'img/bulletEvil.png';
    this.h = 25;
    this.w = 25;

}

Bullet.prototype.drawBullet = function() {
    this.game.ctx.save()
    this.game.ctx.drawImage(this.missile, this.x, this.y, this.w, this.h);
    this.game.ctx.restore()
}

Bullet.prototype.drawEvilBullet = function() {
    this.game.ctx.save()
    this.game.ctx.drawImage(this.missile2, this.x, this.y, this.w, this.h);
    this.game.ctx.restore()
}

Bullet.prototype.move = function() {
  this.x += this.bulletVelocity;
}

Bullet.prototype.evilBulletMove = function() {
    if (Math.random() > 0.5) {
        this.x -= this.bulletVelocity;
    } else {
        this.x -= this.bulletVelocity2;
    }
    
    if (this.y > 350){
        this.y -= Math.floor(Math.random()*30-(10))
    } else {
        this.y += Math.floor(Math.random()*30-(10))
    }
  }
