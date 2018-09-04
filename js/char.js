function Char(game) {
    this.game = game;
    this.img = new Image();
    this.img.src = 'img/steakfries-thrust-1.png';
 
    this.x = 100;
    this.height = this.game.canvas.height
    this.y = this.height/2;
    this.w = 30;
    this.h = 30;  
    this.gravityAcc = 1;                     // necesito incluir dos movimientos, ascenso (thrust) y descenso (gravity). 
    this.velocity = 0;                        // la direccion dependera de la activacion de los thrusters
    this.thrustPower = 7.5;                      // La fuerza del thrust debe de ser mayor a la gravedad para que pueda ascender.
}


var TOP_KEY = 38;
var SPACE = 32;

Char.prototype.draw = function() {
    this.game.ctx.save()
    this.game.ctx.drawImage(this.img, this.x, this.y, 50, 50);
    this.game.ctx.restore()
}

Char.prototype.thrust = function() {
    if (this.velocity > 0){
        this.velocity-=2;
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
};