(function ($)
{
  Polyomino = function (coords)
  {
    this.coords = coords;
    this.x = 0;
    this.y = 0;
    
    // compute extent
    this.max_x = Math.max.apply(this, $.map(this.coords, function (p) {return p[0]}));
    this.max_y = Math.max.apply(this, $.map(this.coords, function (p) {return p[1]}));
  }
  
  // move (x, y, max_x, max_y)
  // =========================
  // 
  // Changes the polyomino's position to the given (x, y) coordinates.
  // 
  // The polyomino is not permitted to leave the positive area within
  // the given maximum (x, y) coordiantes.
  
  Polyomino.prototype.move = function (x, y, max_x, max_y)
  {
    if (x < 0 || y < 0 ||
        max_x && this.max_x + this.x > max_x ||
        max_y && this.max_y + this.y > max_y)
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
  // the given maximum (x, y) coordiantes.
  
  Polyomino.prototype.translate = function (dx, dy, max_x, max_y)
  {
    return this.move(this.x + dx, this.y + dy, max_x, max_y);
  }
  
  // left (max_x, max_y)
  // ===================
  // 
  // Rotate the polyomino clockwise.
  // 
  // The polyomino is not permitted to leave the positive area within
  // the given maximum (x, y) coordiantes.
  
  Polyomino.prototype.clockwise = function (max_x, max_y)
  {
    // swap extents
    var t = this.max_x;
    this.max_x = this.max_y;
    this.max_y = t;
    
    $.each(this.coords, function (_, p)
    {
      var p0 = p[0], p1 = p[1];
      // swap x and y
      p[0] = p1;
      p[1] = p0;
      // reflect in x
      p[0] = this.max_x - p[0];
    }.bind(this));
    
    return;
  }
  
  Polyomino.prototype.coordinates = function ()
  {
    return $.map(this.coords, function (p)
    {
      return [[p[0] + this.x, p[1] + this.y]];
    }.bind(this));
  }
  
})(jQuery);




//       x      x             x
//      xxx     xx   xxx     xx     
//              x     x       x     


