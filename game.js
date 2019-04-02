function AsteroidsGame(id){
  this.canvas = document.getElementById(id);
  this.context = this.canvas.getContext('2d');
  this.canvas.focus();
  this.guide = true;
  this.asteroids = [];
  for(let i = 0; i < 4; i++){
    this.asteroids.push(this.moving_asteroids());
  }

  // Ship(x, y, mass, radius, power, weapon_power)
  this.ship = new Ship(
    this.canvas.width / 2, this.canvas.height / 2,
    10, 15,
    1000, 200
  );
  // array of projectiles
  this.projectiles = [];

  // listen the events
  this.canvas.addEventListener(
    'keydown', this.keyDown.bind(this), true
  );
  this.canvas.addEventListener(
    'keyup', this.keyUp.bind(this), true
  );

  //first call to animation
  window.requestAnimationFrame(this.frame.bind(this));
}

AsteroidsGame.prototype.moving_asteroids = function(){
  // Asteroid(mass, x, y, x_speed, y_speed, rotation_speed)
  let asteroid = new Asteroid(
    2000 + Math.random() * 8000,
    Math.random() * this.canvas.width,
    Math.random() * this.canvas.height,
  );
  // force, elapsed
  asteroid.twist((Math.random() - .5) * 500, 60);
  // angle, force, elapsed
  asteroid.push(Math.random() * 2 * Math.PI, 2000, 60);
  return asteroid
}

AsteroidsGame.prototype.draw = function(){
  if(this.guide){
    draw_grid(this.context);
    this.asteroids.forEach(function(asteroid){
      draw_line(this.context, asteroid, this.ship);
    }, this);
  }
  this.asteroids.forEach(function(asteroid){
    asteroid.draw(this.context, this.guide);
  }, this);
  this.ship.draw(this.context, this.guide);
  this.projectiles.forEach(function(p) {
    p.draw(this.context);
  }, this);
}

AsteroidsGame.prototype.update = function(elapsed) {
  this.asteroids.forEach(function(asteroid){
    asteroid.update(elapsed, this.context)
  }, this);
  this.ship.update(elapsed, this.context);
  this.projectiles.forEach(function(projectile, i, projectiles) {
    projectile.update(elapsed, this.context);
    if(projectile.life <= 0) {
      projectiles.splice(i, 1);
    }
  }, this);
  if(this.ship.trigger && this.ship.loaded) {
    this.projectiles.push(this.ship.projectile(elapsed));
  }
}

AsteroidsGame.prototype.frame = function(timestamp){
  if (!this.previous) this.previous = timestamp;
  var elapsed = timestamp - this.previous;
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.update(elapsed / 1000);
  this.draw();
  this.previous = timestamp;
  window.requestAnimationFrame(this.frame.bind(this));
}

// event handling
AsteroidsGame.prototype.keyDown = function(e){
  this.key_handler(e, true);
}
AsteroidsGame.prototype.keyUp = function(e){
  this.key_handler(e, false);
}
AsteroidsGame.prototype.key_handler = function(e, value) {
  var nothing_handled = false;
  switch(e.key || e.keyCode) {
    case "ArrowLeft":
    case 37: // left arrow
      this.ship.left_thruster = value;
      break;
    case "ArrowUp":
    case 38: // up arrow
      this.ship.thruster_on = value;
      break;
    case "ArrowRight":
    case 39: // right arrow
      this.ship.right_thruster = value;
      break;
    case "ArrowDown":
    case 40:
      this.ship.retro_on = value;
      break;
    case " ":
    case 32: //spacebar
      this.ship.trigger = value;
      break;
    case "g":
    case 71: // g for guide
      if(value) this.guide = !this.guide;
      break;
    default:
      nothing_handled = true;
  }
  if(!nothing_handled) e.preventDefault();
}
