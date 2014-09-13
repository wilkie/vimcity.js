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
