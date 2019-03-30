function Asteroid(segments, radius, noise){
  this.x = canvas.width * Math.random();
  this.y = canvas.height * Math.random();
  this.angle = 0;
  this.x_speed = canvas.width * (Math.random() - .5);
  this.y_speed = canvas.height * (Math.random() - .5);
  this.rotation_speed = 2 * Math.PI * (Math.random() - .5);
  this.radius = radius;
  this.noise = noise;
  this.shape = [];
  for(let i = 0; i < segments; i++){
    this.shape.push(Math.random() - .5);
  }
}

Asteroid.prototype.update = function(elapsed){
  if(this.x - this.radius + elapsed * this.x_speed > canvas.width){
    this.x = -this.radius;
  }
  if(this.x + this.radius + elapsed * this.x_speed < 0){
    this.x = canvas.width + this.radius;
  }
  if(this.y - this.radius + elapsed * this.y_speed > canvas.height){
    this.y = -this.radius;
  }
  if(this.y + this.radius + elapsed * this.y_speed < 0){
    this.y = canvas.height + this.radius;
  }
  this.x += elapsed * this.x_speed;
  this.y += elapsed * this.y_speed;
  this.angle = (this.angle + this.rotation_speed * elapsed) % (2 * Math.PI);
}

Asteroid.prototype.draw = function(ctx, guide){
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle);
  draw_asteroid(ctx, this.radius, this.shape, {
    guide: this.guide,
    noise: this.noise
  });
  ctx.restore();
}

function PacMan(x, y, radius, speed){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.speed = speed;
  this.angle = 0;
  this.x_speed = speed;
  this.y_speed = 0;
  this.time = 0;
  this.mouth = 0;
}

PacMan.prototype.draw = function(ctx){
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle);
  draw_pacman(ctx, this.radius, this.mouth);
  ctx.restore();
}

PacMan.prototype.turn = function(direction){
  if (this.y_speed){
    this.x_speed = -direction * this.y_speed;
    this.y_speed = 0;
    this.angle = this.x_speed > 0 ? 0 : Math.PI;
  } else {
    this.y_speed = direction * this.x_speed;
    this.x_speed = 0;
    this.angle = this.y_speed > 0 ? 0 : Math.PI;
  }
}

PacMan.prototype.turn_left = function(){
  this.turn(-1);
}
PacMan.prototype.turn_right = function(){
  this.turn(1);
}

PacMan.prototype.update = function(elapsed, width, height){
  // an average of once per 100 frames
  if(Math.random() <= .01){
    if(Math.random < .5){
      this.turn_left();
    } else {
      this.turn_right();
    }
  }
  if(this.x - this.radius + elapsed * this.x_speed > width) {
    this.x = -this.radius;
  }
  if(this.x + this.radius + elapsed * this.x_speed < 0) {
    this.x = width + this.radius;
  }
  if(this.y - this.radius + elapsed * this.y_speed > height) {
    this.y = -this.radius;
  }
  if(this.y + this.radius + elapsed * this.y_speed < 0) {
    this.y = height + this.radius;
  }
  this.x += this.x_speed * elapsed;
  this.y += this.y_speed * elapsed;
  this.time += elapsed;
  this.mouth = Math.abs(Math.sin(2 * Math.PI * this.time));
}