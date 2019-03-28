function draw_grid(ctx, minor, major, stroke, fill) {
  minor = minor || 10;
  major = major || minor * 5;
  stroke = stroke || '#00FF00';
  fill = fill || '#009900';
  ctx.save();
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;

  let width = ctx.canvas.width, height = ctx.canvas.height
  for(var x = 0; x < width; x += minor) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.lineWidth = (x % major == 0) ? .5 : .25;
    ctx.stroke();
    if(x % major == 0) {ctx.fillText(x, x, 10);}
  }
  for(var y = 0; y < height; y += minor) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.lineWidth = (y % major == 0) ? .5 : .25;
    ctx.stroke();
    if(y % major == 0) {ctx.fillText(y, 0, y + minor);}
  }
  ctx.restore();
}

function pacman(ctx, x, y, radius, open) {
  x = x || 200
  y = y || 200
  radius = radius || 150
  open = open || Math.random()

  // ctx.save();
  ctx.beginPath();
  // context.arc(x, y, radius, start_angle, end_angle)
  start_angle = Math.PI * .2 * open;
  end_angle = -Math.PI * .2 * (open);
  ctx.arc(x, y, radius, start_angle, end_angle);
  // context.lineTo(x, y)
  ctx.lineTo(x, y);
  ctx.fillStyle = 'yellow';
  ctx.fill();
  // ctx.restore();
  }


function draw_ship(ctx, radius, options) {
  options = options || {};
  ctx.save();
  if(options.guide) {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
  ctx.lineWidth = options.lineWidth || 2;
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "black";
  let angle = (options.angle || 0.5 * Math.PI) / 2;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(
    Math.cos(Math.PI - angle) * radius,
    Math.sin(Math.PI - angle) * radius
  );
  ctx.lineTo(
    Math.cos(Math.PI + angle) * radius,
    Math.sin(Math.PI + angle) * radius
  );
  ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
}