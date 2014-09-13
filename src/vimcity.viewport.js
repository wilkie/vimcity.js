function initVimCityViewport(context) {
  'use strict';

  var VimCity = context.VimCity;

  VimCity.Viewport = function(options) {
    this.width    = options.width  || 100;
    this.height   = options.height || 40;
    this.selector = options.selector;

    this.world    = options.world;

    this.y        = options.y || 0;
    this.x        = options.x || 0;

    // Grab the world element
    this.world_div = document.getElementById(this.selector.slice(1));

    // Create an empty grid
    this.grid = new Array(this.height);
    for (var y = 0; y < this.height; y++) {
      // Build row
      var row = document.createElement('div');
      row.className = "vimcity-world-row vimcity-world-row-" + y;
      this.world_div.appendChild(row);

      this.grid[y] = new Array(this.width);
      for (var x = 0; x < this.width; x++) {
        // Build tile
        var tile = document.createElement('div');
        tile.className = "vimcity-world-tile vimcity-world-tile-" + y + "-" + x;
        tile.style.fontFamily      = "'Courier', monospace";
        tile.style.fontSize        = "12px";
        tile.style.width           = "10px";
        tile.style.height          = "16px";
        tile.style.backgroundColor = "black";
        tile.style.display         = "inline-block";
        tile.style.color           = "white";
        tile.style.verticalAlign   = "top";
        tile.style.lineHeight      = "16px";
        tile.style.cursor          = "default";
        row.appendChild(tile);

        this.grid[y][x] = tile;
      }
    }
  };

  VimCity.Viewport.prototype.move = function(y, x) {
    if (y < 0) {
      y = 0;
    }

    if (x < 0) {
      x = 0;
    }

    if (x + this.width > this.world.width) {
      x = this.world.width - this.width;
    }

    if (y + this.height > this.world.height) {
      y = this.world.height - this.height;
    }

    this.y = y;
    this.x = x;
    this.draw();
  };

  VimCity.Viewport.prototype.move_up = function() {
    this.move(this.y - 1, this.x);
  };

  VimCity.Viewport.prototype.move_down = function() {
    this.move(this.y + 1, this.x);
  };

  VimCity.Viewport.prototype.move_left = function() {
    this.move(this.y, this.x - 2);
  };

  VimCity.Viewport.prototype.move_right = function() {
    this.move(this.y, this.x + 2);
  };

  VimCity.Viewport.prototype.draw = function() {
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        if ((i+this.y >= this.world.height) ||
            (j+this.x >= this.world.width)  ||
            (i+this.y < 0) ||
            (j+this.x < 0)) {
          this.grid[i][j].innerHTML = '';
        }
        else {
          this.grid[i][j].innerHTML = this.world.grid[i+this.y][j+this.x];
        }
      }
    }
  };
}
