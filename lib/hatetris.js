(function (R, $)
{
  // input commands
  var LEFT = 1,
      RIGHT = 2,
      DOWN = 3,
      CLOCKWISE = 4,
      COUNTER_CLOCKWISE = 5,
      DROP = 6;
  
  // grid dimensions
  var ROWS = 25,
      COLS = 10;
  
  var Hatetris = function (raphael)
  {
    this.raphael = raphael;
    $(this.ready.bind(this));
  }
  
  Hatetris.prototype.ready = function ()
  {
    $(document).keydown(this.keydown.bind(this));
    
    this.scale_x = this.raphael.width / COLS;
    this.scale_y = this.raphael.height / ROWS;
    
    this.drawGrid();
    
    this.current(Tetromino.T());
    this.drawPolyomino(this.current());
  }
  
  Hatetris.prototype.keydown = function (event)
  {
    // translate keydown event into input command
    switch (event.keyCode)
    {
      case 32: this.input(DROP); break;
			case 37: this.input(LEFT); break;
			case 39: this.input(RIGHT); break;
			case 40: this.input(DOWN); break;
			case 38: this.input(CLOCKWISE); break;
			case 88: this.input(CLOCKWISE); break;
			case 90: this.input(COUNTER_CLOCKWISE); break;
			default: return;
		}
		
		// cancel the event
		event.preventDefault();
  }
  
  Hatetris.prototype.current = function (polyomino)
  {
    return polyomino !== undefined ? this._current = polyomino : this._current;
  }
  
  Hatetris.prototype.input = function (command)
  {
    if (command === CLOCKWISE) {
      this.current().clockwise(COLS, ROWS);
      this.drawPolyomino(this.current());
    }
    
    if (command === COUNTER_CLOCKWISE) {
      this.current().counter_clockwise(COLS, ROWS);
      this.drawPolyomino(this.current());
    }
    
    if (command === LEFT) {
      this.current().translate(-1, 0, COLS, ROWS);
      this.drawPolyomino(this.current());
    }
    
    if (command === RIGHT) {
      this.current().translate(1, 0, COLS, ROWS);
      this.drawPolyomino(this.current());
    }
    
    if (command === DOWN) {
      this.current().translate(0, 1, COLS, ROWS);
      this.drawPolyomino(this.current());
    }
  }
  
  Hatetris.prototype.drawGrid = function ()
  {
    if (this.grid) return;
    
    this.grid = this.raphael.set();
    
    for (var i = 1; i < COLS; i++)
    {
      this.grid.push(
        this.raphael.path(['M', i*this.scale_x, 0, i*this.scale_x, this.raphael.height])
          .attr('stroke', '#DDD')
      );
    }

    for (var i = 1; i < ROWS; i++)
    {
      this.grid.push(
        this.raphael.path(['M', 0, i*this.scale_y, this.raphael.height, i*this.scale_y])
          .attr('stroke', '#DDD')
      );
    }
    
    this.grid.push(
      this.raphael.rect(0, 0, this.raphael.width - 1, this.raphael.height - 1)
    );
  }
  
  Hatetris.prototype.drawPolyomino = function (polyomino)
  {
    if (polyomino.set)
    {
      polyomino.set.remove();
    } else
    {
      polyomino.set = this.raphael.set();
    }
    
    $.each(polyomino.coordinates(), function (i, p)
    {
      polyomino.set.push(
        this.raphael.rect(p[0] * this.scale_x, p[1] * this.scale_y, this.scale_x, this.scale_y)
          .attr('fill', '#999')
      );
    }.bind(this));
  }
    
  R.fn.hatetris = function ()
  {
    new Hatetris(this);
    return this;
  }
})(Raphael, jQuery);
