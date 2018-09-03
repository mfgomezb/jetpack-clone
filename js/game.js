function Game(canvadId) {
    this.canvas = document.getElementById(canvadId);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
  
  
    this.reset();
  }

Game.prototype.start = function() {
this.interval = setInterval(function() {
    this.clear();
    this.framesCounter++;
    if (this.framesCounter % 50 === 0) {
        this.generateObstacle();
    } 
    this.moveAll();
    this.draw();
    this.thrustCommand();
    console.log(this.obstacles)

    this.clearObstacles();
    if (this.isCollision()) {
        console.log("game over")
        window.confirm()
      }
    
}.bind(this), 2000 / this.fps);
};

Game.prototype.reset = function() {
    this.background = new Background(this);
    this.char = new Char(this);
    this.framesCounter = 0;
    this.obstacles = [];
};

Game.prototype.draw = function() {
    this.background.draw();
    this.char.draw();
    this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
};

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}; 

Game.prototype.moveAll = function() {
    this.background.move();
    this.char.gravity();
    this.obstacles.forEach(function(obstacle) { obstacle.move(); });
};

Game.prototype.thrustCommand = function () {
    document.onkeydown = function(event) {
        if (event.keyCode === SPACE) {
        this.char.thrust();
        }
    }.bind(this);
}


Game.prototype.clearObstacles = function() {
    this.obstacles = this.obstacles.filter(function(obstacle) {
      return obstacle.x >= -175;
    });
  };
  
  Game.prototype.generateObstacle = function() {
    this.obstacles.push(new Obstacle(this));
  };


Game.prototype.isCollision = function() {
    return this.obstacles.some(function(obstacle) {
        return (
        (((this.char.x + this.char.w) > obstacle.x+10) && ((this.char.y + this.char.h) > obstacle.y-10) && ((this.char.y + this.char.h) < obstacle.y+obstacle.h+10) && ((this.char.x) < obstacle.y+obstacle.w-10)) 
        || (((this.char.x + this.char.w) > obstacle.x2+10) && ((this.char.y + this.char.h) > obstacle.y2-10) && ((this.char.y + this.char.h) < obstacle.y2+obstacle.h+10)  && ((this.char.x) < obstacle.y2+obstacle.w-10))
        );
    }.bind(this));
};
  