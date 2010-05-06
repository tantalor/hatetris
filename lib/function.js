Function.prototype.bind = function (self)
{
  var method = this;
  return function ()
  {
    return method.apply(self, arguments);
  }
};
