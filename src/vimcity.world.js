function initVimCityWorld(context) {
  'use strict';

  var VimCity = context.VimCity;

  VimCity.World = function(options) {
    this.width    = options.width;
    this.height   = options.height;

    // Create an empty grid
    this.grid         = new Array(this.height);
    this.building_map = new Array(this.height);
    for (var y = 0; y < this.height; y++) {
      // Build row
      this.building_map[y] = new Array(this.width);
      this.grid[y]         = new Array(this.width);
      for (var x = 0; x < this.width; x++) {
        // Build tile
        this.building_map[y][x] = [0, 0, null];
        this.grid[y][x]         = {
          color: 'white',
          chr:   ''
        };
      }
    }
  };

  /* Returns whether or not the given building can be placed at the given
   * location on the world.
   */
  VimCity.World.prototype.can_build = function(building, y, x) {
    if (y + building.height > this.height) {
      return false;
    }

    if (x + building.width > this.width) {
      return false;
    }

    for(var i = y; i < y + building.height; i++) {
      for(var j = x; j < x + building.width; j++) {
        if (this.building_map[i][j][2] !== null) {
          return false;
        }
      }
    }

    return true;
  }

  /* Add the given building to the internal character world */
  VimCity.World.prototype.add_building = function(building, y, x) {
    // Check to make sure we can build something here
    if (!this.can_build(building, y, x)) {
      return;
    }

    for(var i = y; i < this.height && i < y + building.height; i++) {
      for(var j = x; j < this.width && j < x + building.width; j++) {
        this.grid[i][j]         = {
          color: building.symbol_color[i-y][j-x],
          chr:   building.symbol_char[i-y][j-x]
        };
        this.building_map[i][j] = [y, x, building];
      }
    }
  };

  /* Destroy the building in the internal character world at the given coords */
  VimCity.World.prototype.destroy_building = function(y, x) {
    // Find building at that location
    var building_tile = this.building_map[y][x];
    if (building_tile[2] === null) {
      return;
    }

    // Reset x,y coordinates to top-left of building
    y = building_tile[0];
    x = building_tile[1];

    // Grab building metadata
    var building = building_tile[2];

    // Destroy building at x,y
    for(var i = y; i < this.height && i < y + building.height; i++) {
      for(var j = x; j < this.width && j < x + building.width; j++) {
        this.grid[i][j]         = {
          color: 'white',
          chr: ''
        };
        this.building_map[i][j] = [0, 0, null];
      }
    }
  };

  if (DEBUG) {
  }
}
