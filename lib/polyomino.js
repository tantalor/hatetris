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
    
    // compute extent as [width, height]
    this.ext = $.map([0, 1], function (i)
    {
      return 1 + Math.max.apply(this, $.map(this.coords, function (p)
      {
        return p[i];
      }));
    }.bind(this));
  }
  
  // move (x, y, acceptable)
  // =========================
  // 
  // Changes the polyomino's position to the given (x, y) coordinates.
  
  Polyomino.prototype.move = function (x, y, acceptable)
  {
    var _x = this.x;
    var _y = this.y;
    
    this.x = x;
    this.y = y;
    
    if (acceptable && !acceptable(this))
    {
      // revert
      this.x = _x;
      this.y = _y;
      return false;
    }
    
    return true;
  }
  
  // translate (dx, dy, acceptable)
  // =========================
  // 
  // Translate the polyomino's position by the given (dx, dy).
  
  Polyomino.prototype.translate = function (dx, dy, acceptable)
  {
    return this.move(this.x + dx, this.y + dy, acceptable);
  }
  
  // clockwise (acceptable)
  // ===================
  // 
  // Rotate the polyomino clockwise.
  
  Polyomino.prototype.clockwise = function (acceptable)
  {
    return this._rotate(Polyomino._rotate_clockwise, acceptable);
  }
  
  // counter_clockwise (acceptable)
  // ===================
  // 
  // Rotate the polyomino counter clockwise.
  
  Polyomino.prototype.counter_clockwise = function (acceptable)
  {
    return this._rotate(Polyomino._rotate_counter_clockwise, acceptable);
  }
  
  Polyomino.prototype.coordinates = function ()
  {
    return $.map(this.coords, function (p)
    {
      return [[p[0] + this.x, p[1] + this.y]];
    }.bind(this));
  }
  
  Polyomino.prototype._rotate = function (rotator, acceptable)
  { 
    // copy old values
    var _ext = this.ext;
    var _coords = this.coords;
    var _rotate = this.rotate;
    
    // swap extents
    var ext = this.ext = [this.ext[1], this.ext[0]];
    
    // rotate
    this.rotate = rotator(this.rotate, this.ext);
    this.coords = $.map(this.coords, function (p) {
      return [rotator(p, ext)];
    });
    
    // test rotation
    if (!this.translate(_rotate[0] - this.rotate[0], _rotate[1] - this.rotate[1], acceptable))
    {
      // revert
      this.rotate = _rotate;
      this.ext = _ext;
      this.coords = _coords;
    }
  }
  
  Polyomino._rotate_clockwise = function (p, ext)
  {
    return [ext[0] - 1 - p[1], p[0]];
  }
  
  Polyomino._rotate_counter_clockwise = function (p, ext)
  {
    return [p[1], ext[1] - 1 - p[0]];
  }
  
})(jQuery);
