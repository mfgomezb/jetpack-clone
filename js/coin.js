function Coin(game, posX, posY) {
    this.game = game;
    this.posX = posX;
    this.posY = posY;
    this.type = "coin"

    this.coin= new Image();
    this.coin.src = 'img/moneda.png';
    this.h = 40;
    this.w = 40;
    this.dx = 10;
    this.x = this.game.canvas.width+this.posX;
    this.arrY = [150, 300, 450]
    this.y = this.arrY[this.posY]
}
  
  Coin.prototype.drawCoin = function(posX, posY) {
    this.game.ctx.save()
    this.game.ctx.drawImage(this.coin, this.x, this.y, this.w, this.h);
    this.game.ctx.restore()
};

  Coin.prototype.move = function() {
    this.x -= this.dx;
};