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
