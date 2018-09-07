function Game(canvas, level) {
    this.canvas = document.getElementById(canvas);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 30;
    this.reset(level);
    this.controlVar = 0;
  }

Game.prototype.start = function() {
this.interval = setInterval(function() {
    this.clear();
    this.framesCounter++;

    if (this.controlVar == 0) {

        if (level%240 == 0 || ((level%100 == 0)&&(level%120 == 0))) {
            level = level - 60;
        } else {
            level = level;
        }

        this.commonState1and2();    

        if (this.framesCounter > 1000){ 
            this.controlVar = 1
        }
        if (this.framesCounter % level === 0) {
            this.generateObstacle();
        }
        if (this.framesCounter % 100 === 0) {
            this.generateCoin();
        }

    } else if (this.controlVar == 1) {
        this.commonState1and2();
        this.isImpact();
        this.moveEvil();
        this.evilLifeCheck()
        this.drawEvilHealth();
        this.evilShoot();
        this.evilImpact();

    } else if (this.controlVar == 2) {
        this.moveAll();
        this.draw();
        this.drawWinScoreBoard();
        this.storeScore(playerName)
    } else if (this.controlVar == 3) {
        this.gameOverScreenDraw();
        this.storeScore(playerName)
    }

}.bind(this), 1000 / this.fps);
};

Game.prototype.reset = function(level) {
    this.background = new Background(this);
    this.char = new Char(this);
    this.evil = new Evil(this);
    this.sound = new Sound(this);
    this.framesCounter = 0;
    this.obstacles = [];
    this.coins = [];
    this.bullets = [];
    this.evilBullets = [];
    this.hearts = [];
    this.score = 0;
    this.life = 3;
    this.evilLife = 10;
    this.level = level;
};

Game.prototype.commands = function () {
    document.onkeydown = function(event) {
        if (event.keyCode == 32) {
            this.char.thrust();
            this.sound.jetpackAudio();
        } else if (event.keyCode == 38) {
            this.generateBullet();
            this.sound.charAudio();
        }
    }.bind(this);

    document.onkeyup = function(event) {
            this.sound.jetpackAudio();
    }.bind(this);
};

Game.prototype.evilShoot = function () {
    Math.random()
    if (Math.random() < 0.05) {
        this.generateEvilBullet();
        this.sound.evilAudio();
    }
}

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}; 

Game.prototype.draw = function() {
    this.background.draw();
    this.char.draw();
    this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
    this.coins.forEach(function(coin) { coin.drawCoin(); });
    this.bullets.forEach(function(bullet) { bullet.drawBullet(); });
    this.evilBullets.forEach(function(evilBullet) { evilBullet.drawEvilBullet(); });
    this.hearts.forEach(function(heart) { heart.drawHeart(); });
    this.drawScoreBoard();
};


Game.prototype.drawEvil = function() {
    this.evil.drawEvil();
}

Game.prototype.moveAll = function() {
    this.background.move();
    this.char.gravity();
    this.obstacles.forEach(function(obstacle) { obstacle.move(); });
    this.coins.forEach(function(coin) { coin.move(); });
    this.bullets.forEach(function(bullet) { bullet.move(); });
    this.evilBullets.forEach(function(evilBullet) { evilBullet.evilBulletMove(); });
    this.hearts.forEach(function(heart) { heart.move(); });
};

Game.prototype.moveEvil = function() {
    this.evil.move();
}

Game.prototype.storeScore = function(playerName) {
    this.playerName = playerName;
    localStorage.setItem(playerName, this.score);
}

Game.prototype.gameOverScreenDraw = function() {
    this.background.draw();
    this.char.draw();
    this.GameOverScoreBoard();
}

Game.prototype.commonState1and2 = function() {
    this.moveAll();
    this.draw();
    this.commands();
    this.clearObjects();
    this.coinGrab();
    this.heartGrab();
    this.isCollision();
    if (this.framesCounter % 240 === 0) {
        this.generateHeart();
    }
    if (this.charLifeCheck() == false) {
        this.controlVar = 3;
    }
}

// clear functions

Game.prototype.clearObjects = function() {
    this.coins = this.coins.filter(function(coin) {
      return coin.x >= -50;
    });
    this.bullets = this.bullets.filter(function(bullet) {
        return bullet.x < this.canvas.width;
    }.bind(this));
    this.obstacles = this.obstacles.filter(function(obstacle) {
        return obstacle.x >= -175;
    });
    this.hearts = this.hearts.filter(function(heart) {
        return heart.x >= -50;
    });
    
};

//object generation
  
Game.prototype.generateCoin = function() {
    var posX = [0, 40, 80, 120]
    var posY = (Math.floor(Math.random()*1*(4-1)))
    for (i = 0; i < posX.length; i++){
        this.coins.push(new Coin(this, posX[i], posY));
    }  
};


Game.prototype.generateObstacle = function() {
    this.obstacles.push(new Obstacle(this));
};

Game.prototype.generateBullet = function() {
    this.bullets.push(new Bullet(this, this.char.x, this.char.y));
};

Game.prototype.generateEvilBullet = function() {
    this.evilBullets.push(new Bullet(this, this.evil.x, this.evil.y));
};

Game.prototype.generateHeart = function() {
    this.hearts.push(new Heart(this));
};


Game.prototype.evilLifeCheck = function () {
    if (this.evilLife > 0) {
        this.drawEvil()
    } else {
        this.controlVar = 2;
        this.sound.evilDeathAudio();
        this.score +=10;
    }
}

Game.prototype.charLifeCheck = function () {
    if (this.life == 0) {
        this.controlVar = 3;
    } 
}

// object intersection detection

Game.prototype.isCollision = function() {
    return this.obstacles.forEach(function(obstacle, i) {
        if (this.impactChecker(obstacle) 
        || (((this.char.x + this.char.w) > obstacle.x2) 
        && ((this.char.y + this.char.h) > obstacle.y2) 
        && ((this.char.y + this.char.h) < obstacle.y2+obstacle.h)  
        && ((this.char.x) < obstacle.x2+obstacle.w))
        ) {
            this.obstacles.splice(i,1);
            this.sound.stunAudio();
            this.life--;
            return true;
        };
    }.bind(this));
};

Game.prototype.impactChecker = function (element) {
    return (((this.char.x + this.char.w) > element.x) && 
    ((this.char.y + this.char.h) > element.y) && 
    ((this.char.y + this.char.h) < element.y+element.h) && 
    ((this.char.x) < element.x+element.w));
}

Game.prototype.coinGrab = function() {
    return this.coins.forEach(function(coin, i) {
    if (this.impactChecker(coin)) {
        this.coins.splice(i,1);
        this.score++;
        this.sound.coinAudio();
        return true;
    } ;
    }.bind(this));
};

Game.prototype.heartGrab = function() {
    return this.hearts.forEach(function(heart, i) {
    if (this.impactChecker(heart)) {
        this.hearts.splice(i,1);
        this.sound.healAudio();
        this.life++;
        return true;
    } ;
    }.bind(this));
};

Game.prototype.isImpact = function() {
    return this.bullets.forEach(function(bullet, i) {
        if ( 
            ((bullet.x+bullet.w) > this.evil.x)
        &&  ((bullet.y+bullet.h) > this.evil.y)
        &&  ((bullet.y+bullet.h) < (this.evil.y+this.evil.h))
        ) {
            this.bullets.splice(i,1);
            this.evilLife--;
            this.sound.damageAudio();
            return true;
        };
    }.bind(this));
};

Game.prototype.evilImpact = function() {
    return this.evilBullets.forEach(function(evilBullet, i) {
    if (this.impactChecker(evilBullet)) {
        this.evilBullets.splice(i,1);
        this.life--;
        this.sound.damageAudio();
        return true;
    };
    }.bind(this));
};

// scoreboard

Game.prototype.drawScoreBoard = function() {
    this.ctx.font = "bold 30px sans-serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(Math.floor(this.score), this.canvas.width-50, 50);
    scoreCoin = new Image();
    scoreCoin.src = 'img/moneda.png';
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

Game.prototype.drawEvilHealth = function () {
    this.ctx.font = "bold 30px sans-serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(Math.floor(this.evilLife), this.canvas.width-220, 50);
    evil = new Image();
    evil.src = 'img/evilbear.png';
    this.ctx.save()
    this.ctx.drawImage(evil, this.canvas.width-260, 27, 27, 27);
    this.ctx.restore()
}

Game.prototype.drawWinScoreBoard = function() {
    this.ctx.fillStyle = "rgba(127, 191, 63, 0.4)";
    this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
    this.ctx.font = "bold 40px sans-serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("SCORE: ", (this.canvas.width/2)-150, (this.canvas.height/2)+30);
    this.ctx.fillText(Math.floor(this.score), (this.canvas.width/2)+30, (this.canvas.height/2)+30);
    this.ctx.font = "bold 60px sans-serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("YOU WIN!!", (this.canvas.width/2)-150, (this.canvas.height/2)-20);
    setTimeout(function(){
        location.reload()
    }, 2500);
    
}

Game.prototype.GameOverScoreBoard = function() {
    this.ctx.fillStyle = "rgba(224, 30, 30, 0.68)";
    this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
    this.ctx.font = "bold 40px sans-serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("SCORE: ", (this.canvas.width/2)-150, (this.canvas.height/2)+30);
    this.ctx.fillText(Math.floor(this.score), (this.canvas.width/2)+30, (this.canvas.height/2)+30);
    this.ctx.font = "bold 60px sans-serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("GAME OVER!", (this.canvas.width/2)-150, (this.canvas.height/2)-20);
    setTimeout(function(){
        location.reload()
    }, 2500)
}

  
