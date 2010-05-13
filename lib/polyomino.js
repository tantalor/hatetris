(function ($)
{
  // Polyomino (coords, rotate)
  // ==========================
  //
  // Create a polyomino with cells in the given coordinates (as [[x,y], ...])
  // and the given rotation point (as [x,y]).
  
  Polyomino = function (coords, rotate)
  {
    this.coords = coords;
    this.rotate = rotate || [0, 0];
    this.x = 0;
    this.y = 0;
    
    // compute extent
    this.ext_x = 1 + Math.max.apply(this, $.map(this.coords, function (p) {return p[0]}));
    this.ext_y = 1 + Math.max.apply(this, $.map(this.coords, function (p) {return p[1]}));
  }
  
  // move (x, y, max_x, max_y)
  // =========================
  // 
  // Changes the polyomino's position to the given (x, y) coordinates.
  // 
  // The polyomino is not permitted to leave the positive area within
  // the given maximum (x, y) coordinates.
  
  Polyomino.prototype.move = function (x, y, max_x, max_y)
  {
    if (x < 0 || y < 0 ||
        max_x && this.ext_x + x > max_x ||
        max_y && this.ext_y + y > max_y)
    {
      return false;
    }
    
    this.x = x;
    this.y = y;
    
    return true;
  }
  
  // translate (dx, dy, max_x, max_y)
  // =========================
  // 
  // Translate the polyomino's position by the given (dx, dy).
  // 
  // The polyomino is not permitted to leave the positive area within
  // the given maximum (x, y) coordinates.
  
  Polyomino.prototype.translate = function (dx, dy, max_x, max_y)
  {
    return this.move(this.x + dx, this.y + dy, max_x, max_y);
  }
  
  // clockwise (max_x, max_y)
  // ===================
  // 
  // Rotate the polyomino clockwise.
  // 
  // The polyomino is not permitted to leave the positive area within
  // the given maximum (x, y) coordinates.
  
  Polyomino.prototype.clockwise = function (max_x, max_y)
  {
    // swap extents
    var t = this.ext_x;
    this.ext_x = this.ext_y;
    this.ext_y = t;
    
    var old_rotate = [this.rotate[0], this.rotate[1]];
    
    $.each(this.coords.concat([this.rotate]), function (_, p)
    {
      var p0 = p[0], p1 = p[1];
      // swap x and y
      p[0] = this.ext_x - 1 - p1;
      p[1] = p0;
    }.bind(this));
    
    this.translate(old_rotate[0] - this.rotate[0], old_rotate[1] - this.rotate[1]);
  }
  
  // counter_clockwise (max_x, max_y)
  // ===================
  // 
  // Rotate the polyomino counter_clockwise.
  // 
  // The polyomino is not permitted to leave the positive area within
  // the given maximum (x, y) coordinates.
  
  Polyomino.prototype.counter_clockwise = function (max_x, max_y)
  {
    // swap extents
    var t = this.ext_x;
    this.ext_x = this.ext_y;
    this.ext_y = t;
    
    var old_rotate = [this.rotate[0], this.rotate[1]];
    
    $.each(this.coords.concat([this.rotate]), function (_, p)
    {
      var p0 = p[0], p1 = p[1];
      // swap x and y
      p[0] = p1;
      p[1] = this.ext_y - 1 - p0;
    }.bind(this));
    
    this.translate(old_rotate[0] - this.rotate[0], old_rotate[1] - this.rotate[1]);
  }
  
  Polyomino.prototype.coordinates = function ()
  {
    return $.map(this.coords, function (p)
    {
      return [[p[0] + this.x, p[1] + this.y]];
    }.bind(this));
  }
  
})(jQuery);
