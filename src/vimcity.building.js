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
