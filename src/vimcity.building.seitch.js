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
