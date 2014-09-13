/*! vimcity - v0.1.0 - 2014-09-13 - wilkie */
;(function (global) {

/*jslint browser: true*/
/*global $*/

// Compiler directive for UglifyJS.  See occamViz.const.js for more info.
if (typeof DEBUG === 'undefined') {
  DEBUG = true;
}

// LIBRARY-GLOBAL CONSTANTS
//
// These constants are exposed to all library modules.

// GLOBAL is a reference to the global Object.
var Fn = Function, GLOBAL = new Fn('return this')();

// LIBRARY-GLOBAL METHODS
//
// The methods here are exposed to all library modules.  Because all of the
// source files are wrapped within a closure at build time, they are not
// exposed globally in the distributable binaries.

/**
 * A no-op function.  Useful for passing around as a default callback.
 */
function noop () { }

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
    this.world.add_building(atmo_gen, 3, 3);
    this.world.destroy_building(4, 4);
    this.world.add_building(atmo_gen, 3, 3);
    this.world.add_building(starport, 8, 4);
    this.viewport.draw();

    return this;
  };

  VimCity.prototype.run = function() {
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
      symbol:           ['o|o',
                         '|o|'],
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
      symbol:           ['~~~~V~',
                         '~V~~~ ',
                         '~v~~V~'],
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
                         ' = ',
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
        this.grid[y][x]         = ' ';
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
        this.grid[i][j]         = building.symbol[i-y][j-x];
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
        this.grid[i][j]         = " ";
        this.building_map[i][j] = [0, 0, null];
      }
    }
  };

  if (DEBUG) {
  }
}

} (this));
