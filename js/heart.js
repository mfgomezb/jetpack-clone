function Heart(game) {
    this.game = game;

    this.heart= new Image();
    this.heart.src = 'img/hearts.png';
    this.type = "heart"
    this.h = 50;
    this.w = 50;
    this.dx = 10;
    this.x = this.game.canvas.width;
    this.y = 250+Math.floor((Math.random()*50+(20)));
    
  }
  
  Heart.prototype.drawHeart = function() {
    this.game.ctx.save()
    this.game.ctx.drawImage(this.heart, this.x, this.y, 40, 40);
    this.game.ctx.restore()
  };

  Heart.prototype.move = function() {
    this.x -= this.dx;
  };