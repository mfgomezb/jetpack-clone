function Obstacle(game) {
    this.game = game;
    this.img = new Image();
    this.img.src = 'img/zapper.png';
    this.coin= new Image();
    this.coin.src = 'img/zapper.png';
    // this.w = 20;
    // this.h = Math.floor((Math.random())*180+(180-120));
    // this.h2 = 400 - this.h

    this.h = 150;
    this.w = 60;
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
    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.game.ctx.drawImage(this.img, this.x2, this.y2, this.w, this.h);
    this.game.ctx.restore()
    // this.game.ctx.beginPath();
    
    // this.game.ctx.fillStyle = "white";
    // this.game.ctx.fillStyle = "#F9A520";
    // this.game.ctx.moveTo(this.x, this.x); 
    // this.game.ctx.lineTo(this.x+200, 0); // x, y
    // this.game.ctx.lineTo(100, 200);
    // this.game.ctx.fill();
    // this.game.ctx.closePath();
    
    // this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
    // this.game.ctx.fillStyle = "blue";
    // this.game.ctx.fillRect(this.x+this.m, 120+this.h+120, this.w, this.h2);
  };
  
  Obstacle.prototype.drawCoin = function() {
    this.game.ctx.save()
    this.game.ctx.drawImage(this.coin, this.x, this.y, this.w, this.h);
    this.game.ctx.restore()
  };


  Obstacle.prototype.move = function() {
    this.x -= this.dx;
    this.x2 -= this.dx;
  };