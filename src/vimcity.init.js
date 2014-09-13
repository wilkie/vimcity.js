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
