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
