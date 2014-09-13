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
