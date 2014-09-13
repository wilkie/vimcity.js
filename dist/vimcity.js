/*! vimcity - v0.1.0 - 2014-09-13 - wilkie */
;(function (global) {

/*jslint browser: true*/
/*global $*/

if (typeof DEBUG === 'undefined') {
  DEBUG = true;
}

/**
 * Init wrapper for the core module.
 * @param {Object} The Object that the library gets attached to in
 * vimcity.init.js. If the library was not loaded with an AMD loader such as
 * require.js, this is the global Object.
 */
function initVimCityCore (context) {
  var VimCity = context.VimCity = function(options) {
    options = options || {};

    this.div = document.getElementById(options.selector.slice(1));

    /* Create the game world class */
    this.world_div = document.createElement('div');
    this.world_div.setAttribute('id', 'vimcity-world');
    this.div.appendChild(this.world_div);

    this.world = new VimCity.World({
      width: 200,
      height: 80
    });

    this.viewport = new VimCity.Viewport({
      width: 100,
      height: 40,
      world: this.world,
      selector: '#vimcity-world'
    });

    /* Keyboard input */
    var thiz = this;
    document.onkeydown = function(e) {
      e = e || window.event;

      if ((e.keyCode == 72)) {
        thiz.viewport.move_left();
      }
      else if ((e.keyCode == 75)) {
        thiz.viewport.move_up();
      }
      else if ((e.keyCode == 76)) {
        thiz.viewport.move_right();
      }
      else if ((e.keyCode == 74)) {
        thiz.viewport.move_down();
      }
    };

    var atmo_gen = new VimCity.Building.AtmoGen();
    var starport = new VimCity.Building.Starport();
    var farm     = new VimCity.Building.Farm();
    this.world.add_building(atmo_gen, 3, 3);
    this.world.destroy_building(4, 4);
    this.world.add_building(atmo_gen, 3, 3);
    this.world.add_building(starport, 8, 4);
    this.world.add_building(farm, 18, 4);
    this.viewport.draw();

    return this;
  };

  VimCity.prototype.run = function() {
    // Set up game timer
  };

  // DEBUG CODE
  //
  // With compiler directives, you can wrap code in a conditional check to
  // ensure that it does not get included in the compiled binaries.  This is
  // useful for exposing certain properties and methods that are needed during
  // development and testing, but should be private in the compiled binaries.
  if (DEBUG) {
  }
}

function initVimCityBuildingAtmoGen(context) {
  'use strict';

  var VimCity = context.VimCity;

  VimCity.Building.AtmoGen = function() {
    VimCity.Building.call(this, {
      symbol:           ['{blue}o{gray}|{blue}o',
                         '{gray}|{blue}o{gray}|'],
      name:             "AtmoGen",
      height:           2,
      width:            3,
      cost:             1000,
      capacity:         0,
      workers_required: 30,
      description:      "Produces Oxygen",
      bonuses:
        "Permits expantion of the city. Can store 2000 Oxygen units."
    });
  };

  /* Inherit from Building */
  VimCity.Building.AtmoGen.prototype = Object.create(VimCity.Building.prototype);
  VimCity.Building.AtmoGen.prototype.constructor = VimCity.Building.AtmoGen;

  if (DEBUG) {
  }
}

function initVimCityBuildingFarm(context) {
  'use strict';

  var VimCity = context.VimCity;

  VimCity.Building.Farm = function() {
    VimCity.Building.call(this, {
      symbol:           ['{magenta}~~~~{green}V{magenta}~',
                         '{magenta}~{green}V{magenta}~~~ ',
                         '{magenta}~{green}v{magenta}~~{green}V{magenta}~'],
      name:             "Farm",
      height:           3,
      width:            6,
      cost:             1000,
      capacity:         0,
      workers_required: 10,
      description:      "Produces purple grass, a desirable commodity.",
      bonuses:
        "Goods sell for 2c a worker, maximum of 20."
    });
  };

  /* Inherit from Building */
  VimCity.Building.Farm.prototype = Object.create(VimCity.Building.prototype);
  VimCity.Building.Farm.prototype.constructor = VimCity.Building.Farm;

  if (DEBUG) {
  }
}

function initVimCityBuilding (context) {
  'use strict';

  var VimCity = context.VimCity;

  VimCity.Building = function(options) {
    this.symbol           = options.symbol;
    this.name             = options.name;
    this.height           = options.height;
    this.width            = options.width;
    this.cost             = options.cost;
    this.capacity         = options.capacity;
    this.workers_required = options.workers_required;
    this.description      = options.description;
    this.bonuses          = options.bonuses;

    // Spawn building character and color sheets
    var y = 0;
    var x = 0;

    // Default color
    var color = 'white';

    this.symbol_color = new Array(this.height);
    this.symbol_char  = new Array(this.height);
    for(var i = 0; i < this.height; i++) {
      this.symbol_color[i] = new Array(this.width);
      this.symbol_char[i]  = new Array(this.width);
      for(var j = 0; j < this.width; j++) {
        // Read color
        while(options.symbol[y][x] == '{') {
          var end_index = options.symbol[y].indexOf("}", x);
          color = options.symbol[y].substring(x+1, end_index);
          x = end_index+1;
        }

        // Output symbol and color
        this.symbol_color[i][j] = color;
        this.symbol_char[i][j]  = options.symbol[y][x];

        x++;
      }
      x = 0;
      y++;
    }
  };

  VimCity.Building.prototype.add_to_city = function(city) {
    city.coins                -= this.cost;
    city.population_cap       += this.capacity;
    city.free_workers         -= self.workers_required;

    city.buildings[this.name] += 1;
  };

  VimCity.Building.prototype.remove_from_city = function(city) {
    city.buildings[this.name] -= 1;

    city.coins                += this.cost;
    city.population_cap       -= this.capacity;
    city.free_workers         += self.workers_required;
  };

  if (DEBUG) {
  }
}

function initVimCityBuildingSeitch(context) {
  'use strict';

  var VimCity = context.VimCity;

  VimCity.Building.Seitch = function() {
    VimCity.Building.call(this, {
      symbol:           ['H'],
      name:             "Seitch",
      height:           1,
      width:            1,
      cost:             100,
      capacity:         10,
      workers_required: 0,
      description:      "A simple House",
      bonuses:          "none"
    });
  };

  /* Inherit from Building */
  VimCity.Building.Seitch.prototype = Object.create(VimCity.Building.prototype);
  VimCity.Building.Seitch.prototype.constructor = VimCity.Building.Seitch;

  if (DEBUG) {
  }
}

function initVimCityBuildingStarport(context) {
  'use strict';

  var VimCity = context.VimCity;

  VimCity.Building.Starport = function() {
    VimCity.Building.call(this, {
      symbol:           ['\\ /',
                         ' {red}={white} ',
                         '/ \\'],
      name:             "Starport",
      height:           3,
      width:            3,
      cost:             2000,
      capacity:         0,
      workers_required: 20,
      description:      "Allows for interstellar travel",
      bonuses:
        "Boosts your city's population"
    });
  };

  /* Inherit from Building */
  VimCity.Building.Starport.prototype = Object.create(VimCity.Building.prototype);
  VimCity.Building.Starport.prototype.constructor = VimCity.Building.Starport;

  if (DEBUG) {
  }
}

function initVimCityCity (context) {
  'use strict';

  var VimCity = context.VimCity;

  VimCity.City = function(options) {
    this.coins             = options.coins;
    this.population        = options.population;
    this.population_cap    = 0;
    this.free_workers      = this.population;
    this.money_per_second  = 0;
    this.people_per_second = 0;
    this.oxygen            = 1000;
    this.happiness         = 1;
    this.buildings         = {};
  };

  VimCity.City.prototype.update = function() {
    this.coins += this.money_per_second * 5.0 / 12.5;

    if (this.population < this.population_cap) {
      this.population   += this.people_per_second / 12.5 * this.happiness;
      this.free_workers += this.people_per_second / 12.5 * this.happiness;
    }

    this.oxygen -= this.population / 12.5;

    if (this.oxygen < this.buildings['AtmoGen'] * 1500) {
      this.coins  -= this.buildings['AtmoGen'] * 2 / 12.5;
    }

    if (this.oxygen < this.buildings['AtmoGen'] * 1500) {
      this.oxygen += this.buildings['AtmoGen'] * 100 / 12.5;
    }

    if (this.oxygen < 0) {
      this.oxygen = 0;
    }

    if (this.happiness < 0) {
      this.happiness = 0.001;
    }
  };

  if (DEBUG) {
  }
}

var initVimCity = function (context) {
  // Initialize Core
  initVimCityCore(context);

  // Initialize Options
  initVimCityOptions(context);

  // Initialize Viewport
  initVimCityViewport(context);

  // Initialize World
  initVimCityWorld(context);

  // Initialize Building
  initVimCityBuilding(context);

  // Initialize Every Building Type
  initVimCityBuildingAtmoGen(context);
  initVimCityBuildingFarm(context);
  initVimCityBuildingStarport(context);
  initVimCityBuildingSeitch(context);

  return context.VimCity;
};

if (typeof define === 'function' && define.amd) {
  // Expose VimCity as an AMD module if it's loaded with RequireJS or
  // similar.
  define(function () {
    return initVimCity({});
  });
} else {
  // Load VimCity normally (creating a VimCity global) if not using an AMD
  // loader.
  initVimCity(this);
}

function initVimCityOptions(context) {
  'use strict';

  var VimCity = context.VimCity;

  // This character is used when trying to render outside of world map
  VimCity.OUT_BOUNDS_CHAR = 'x'

  // This character is used when world map tile is empty
  VimCity.EMPTY_CHAR      = ' ';

  // Grid is rendered in some empty spaces within world map
  VimCity.GRID_CHAR       = '.';
  VimCity.GRID_COLOR      = '#880000';
  VimCity.GRID_WIDTH      = 4;
  VimCity.GRID_HEIGHT     = 2;
}

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
        var world_y = i + this.y;
        var world_x = j + this.x;

        if ((world_y >= this.world.height) ||
            (world_x >= this.world.width)  ||
            (world_y < 0) ||
            (world_x < 0)) {
          this.grid[i][j].style.color = 'red';
          this.grid[i][j].innerHTML   = VimCity.OUT_BOUNDS_CHAR;
        }
        else {
          var tile = this.world.grid[world_y][world_x];

          if (tile.chr == '') {
            this.grid[i][j].style.color = VimCity.GRID_COLOR;

            if ((world_y % VimCity.GRID_HEIGHT == 0) &&
                (world_x % VimCity.GRID_WIDTH  == 0)) {
              this.grid[i][j].innerHTML   = VimCity.GRID_CHAR;
            }
            else {
              this.grid[i][j].innerHTML   = VimCity.EMPTY_CHAR;
            }
          }
          else {
            this.grid[i][j].style.color = tile.color;
            this.grid[i][j].innerHTML   = tile.chr;
          }
        }
      }
    }
  };
}

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

} (this));
