Function.prototype.bind = function (self)
{
  var method = this;
  return function ()
  {
    method.apply(self, arguments);
  }
};

(function (R, $)
{
  // input commands
  var LEFT = 1,
      RIGHT = 2,
      DOWN = 3,
      ROTATE = 4,
      DROP = 5;
  
  var Hatetris = function (raphael)
  {
    this.raphael = raphael;
    $(this.ready.bind(this));
  }
  
  Hatetris.prototype.ready = function ()
  {
    $(document).keydown(this.keydown.bind(this));
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
			case 38: this.input(ROTATE); break;
			default: return;
		}
		
		// cancel the event
		event.preventDefault();
  }
  
  Hatetris.prototype.input = function (command)
  {
    
  }
  
  R.fn.hatetris = function ()
  {
    new Hatetris(this);
    return this;
  }
})(Raphael, jQuery);
