Tetromino = {
  S: function ()
  {
    return new Polyomino([[0,0], [1,0], [1,1], [2,1]], [1, 0]);
  },
  Z: function ()
  {
    return new Polyomino([[0,1], [1,1], [1,0], [2,0]], [1,0]);
  },
  T: function ()
  {
    return new Polyomino([[0,0], [0,1], [0,2], [1,1]], [0, 1]);
  },
  I: function ()
  {
    return new Polyomino([[0,0], [0,1], [0,2], [0,3]], [0, 1]);
  },
  O: function ()
  {
    return new Polyomino([[0,0], [0,1], [1,1], [1,0]]);
  },
  L: function ()
  {
    return new Polyomino([[0,0], [1,0], [0,1], [0,2]]);
  },
  J: function ()
  {
    return new Polyomino([[0,0], [1,0], [1,1], [1,2]], [1, 0]);
  }
};
