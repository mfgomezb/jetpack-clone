function Obstacle(game) {
    this.game = game;
    this.img = new Image();
    this.img.src = 'img/zapper.png';
    this.type = "obstacle"

    this.h = 150;
    this.w = 30;
    this.m = Math.floor((Math.random()*100-(50)));
    this.m2 = Math.floor((Math.random()*100+100));
  
    this.dx = 10;
    this.x = this.game.canvas.width;
    this.y = 75+Math.floor((Math.random()*50+(20)));
    this.x2 = this.x+this.m;
    this.y2 = 2*this.y+this.m2;    
}
  
Obstacle.prototype.draw = function() {
    this.game.ctx.save()
    this.game.ctx.drawImage(this.img, this.x, this.y, 60, this.h);
    this.game.ctx.drawImage(this.img, this.x2, this.y2, 60, this.h);
    this.game.ctx.restore()
};


Obstacle.prototype.move = function() {
    this.x -= this.dx;
    this.x2 -= this.dx;
};