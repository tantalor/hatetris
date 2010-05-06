Tetromino = {
  S: function ()
  {
    return new Polyomino([[0,0], [1,0], [1,1], [2,1]]);
  },
  Z: function ()
  {
    return new Polyomino([[0,1], [1,1], [1,0], [2,0]]);
  },
  T: function ()
  {
    return new Polyomino([[0,0], [0,1], [0,2], [1,1]]);
  }
};
