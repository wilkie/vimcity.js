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
