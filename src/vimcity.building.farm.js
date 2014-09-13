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
