function Char(game) {
    this.game = game;
 
    this.x = 100;
    this.height = this.game.canvas.height
    this.y = this.height/2;
    this.w = 25;
    this.h = 25;  
    this.gravityAcc = 1;                     // necesito incluir dos movimientos, ascenso (thrust) y descenso (gravity). 
    this.velocity = 0;                        // la direccion dependera de la activacion de los thrusters
    this.thrustPower = 7.5;                      // La fuerza del thrust debe de ser mayor a la gravedad para que pueda ascender.
}

var SPACE = 32;

Char.prototype.draw = function() {
    this.game.ctx.beginPath();
    this.game.ctx.lineWidth="4";
    this.game.ctx.strokeStyle="green";
    this.game.ctx.rect(this.x, this.y,50,50);
    this.game.ctx.stroke();

}

Char.prototype.thrust = function() {
    
    if (this.velocity > 0){
        this.velocity-=5;
    }
    
    if (this.y ==  this.height-100){
        this.velocity -= this.thrustPower;
        this.y += this.velocity;
    } else {
        this.velocity -= this.thrustPower;
        this.y += this.velocity;
    }
}



Char.prototype.gravity = function() {
    this.velocity += this.gravityAcc
    this.y += this.velocity

    if (this.y >= this.height-100){
        this.y = this.height-100
        this.velocity = 0 ;
    }

    if (this.y < 0){
        this.y = 0
        this.velocity = 0;
    }



    // if (this.y < 0){
    //     this.y = 0;
    //     this.direction = 0;
    //     console.log("0")

    // }
  };