function Game(canvas) {
    this.canvas = document.getElementById(canvas);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 30;
    this.reset();
    this.controlVar = false;

  }

Game.prototype.start = function() {
this.interval = setInterval(function() {
    this.clear();
    this.framesCounter++;
    console.log(this.framesCounter)
    if (this.framesCounter > 100){ this.controlVar = true}
    if (this.controlVar == false) {
        
    if (this.framesCounter % 80 === 0) {
        this.generateObstacle();

    if (this.framesCounter % 240 === 0) {
        this.generateHeart();
    }
    } 
    if (this.framesCounter % 100 === 0) {
        var posX = [0, 40, 80, 120]
        var posY = (Math.floor(Math.random()*1*(4-1)))
        for (i = 0; i < posX.length; i++){
            this.generateCoin(posX[i], posY);
        }
    }
    
    this.moveAll();
    this.draw();
    this.commands();
    this.clearObstacles();
    this.clearCoins();
    this.clearBullets();
    this.clearHearts();
    this.coinGrab()
    this.heartGrab()


    if (this.isCollision()) {
        this.life--
        console.log("game over")
      }
    
    
    } else {

        this.moveAll();
        this.draw();
        this.commands();
        this.clearBullets();
        this.coinGrab()
        this.heartGrab()
    }

   
    
}.bind(this), 1000 / this.fps);

};

Game.prototype.reset = function() {
    this.background = new Background(this);
    this.char = new Char(this);
    this.framesCounter = 0;
    this.framesCounter2 = 0;
    this.obstacles = [];
    this.coins = [];
    this.bullets = [];
    this.hearts = [];
    this.score = 0;
    this.life = 3;
};

Game.prototype.commands = function () {
    document.onkeydown = function(event) {
        if (event.keyCode == 38) {
            this.char.thrust(); 
        } else if (event.keyCode == 32) {
            this.generateBullet();
        }
    }.bind(this);
}

Game.prototype.draw = function() {
    this.background.draw();
    this.char.draw();
    this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
    this.coins.forEach(function(coin) { coin.drawCoin(); });
    this.bullets.forEach(function(bullet) { bullet.drawBullet(); });
    this.hearts.forEach(function(heart) { heart.drawHeart(); });
    this.drawScoreBoard();
};

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}; 

Game.prototype.moveAll = function() {
    this.background.move();
    this.char.gravity();
    this.obstacles.forEach(function(obstacle) { obstacle.move(); });
    this.coins.forEach(function(coin) { coin.move(); });
    this.bullets.forEach(function(bullet) { bullet.move(); });
    this.hearts.forEach(function(heart) { heart.move(); });
};


// clear functions

Game.prototype.clearCoins = function() {
    this.coins = this.coins.filter(function(coin) {
      return coin.x >= -50;
    });
  };

Game.prototype.clearBullets = function() {
    this.bullets = this.bullets.filter(function(bullet) {
        return bullet.x < this.canvas.width;
    }.bind(this));
};

Game.prototype.clearObstacles = function() {
    this.obstacles = this.obstacles.filter(function(obstacle) {
      return obstacle.x >= -175;
    });
  };

Game.prototype.clearHearts = function() {
this.hearts = this.hearts.filter(function(heart) {
    return heart.x >= -175;
});
};

//object generation
  
Game.prototype.generateCoin = function(posX, posY) {
    this.coins.push(new Coin(this, posX, posY));
};

  
Game.prototype.generateObstacle = function() {
    this.obstacles.push(new Obstacle(this));
};

Game.prototype.generateBullet = function() {
    this.bullets.push(new Bullet(this, this.char.x, this.char.y));
};

Game.prototype.generateHeart = function() {
    this.hearts.push(new Heart(this));
};


// object intersection detection

Game.prototype.isCollision = function() {
    return this.obstacles.forEach(function(obstacle, i) {
        if (
        (((this.char.x + this.char.w) > obstacle.x) 
        && ((this.char.y + this.char.h) > obstacle.y) 
        && ((this.char.y + this.char.h) < obstacle.y+obstacle.h) 
        && ((this.char.x) < obstacle.x+obstacle.w)) 
        || (((this.char.x + this.char.w) > obstacle.x2) 
        && ((this.char.y + this.char.h) > obstacle.y2) 
        && ((this.char.y + this.char.h) < obstacle.y2+obstacle.h)  
        && ((this.char.x) < obstacle.x2+obstacle.w))
        ) {
            this.obstacles.splice(i,1);
            this.life--;
            return true;
        };
    }.bind(this));
};

Game.prototype.coinGrab = function() {
    return this.coins.forEach(function(coin, i) {
    if (
    ((this.char.x + this.char.w) > coin.x) && 
    ((this.char.y + this.char.h) > coin.y) && 
    ((this.char.y + this.char.h) < coin.y+coin.h) && 
    ((this.char.x) < coin.x+coin.w)
    ) {
        this.coins.splice(i,1);
        this.score++;
        return true;
    } ;
    }.bind(this));
};

Game.prototype.heartGrab = function() {
    return this.hearts.forEach(function(heart, i) {
    if (
    ((this.char.x + this.char.w) > heart.x) && 
    ((this.char.y + this.char.h) > heart.y) && 
    ((this.char.y + this.char.h) < heart.y+heart.h) && 
    ((this.char.x) < heart.x+heart.w)
    ) {
        this.hearts.splice(i,1);
        this.life++;
        return true;
    } ;
    }.bind(this));
};


// scoreboard

Game.prototype.drawScoreBoard = function() {
    this.ctx.font = "bold 30px sans-serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(Math.floor(this.score), this.canvas.width-50, 50);
    scoreCoin = new Image();
    scoreCoin.src = 'img/coin2.png';
    this.ctx.save()
    this.ctx.drawImage(scoreCoin, this.canvas.width-85, 25, 30, 30);
    this.ctx.restore()
    this.ctx.font = "bold 30px sans-serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(Math.floor(this.life), this.canvas.width-120, 50);
    scoreHearts = new Image();
    scoreHearts.src = 'img/hearts.png';
    this.ctx.save()
    this.ctx.drawImage(scoreHearts, this.canvas.width-160, 27, 27, 27);
    this.ctx.restore()
}

  
