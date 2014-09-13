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
