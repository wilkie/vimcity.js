/*jslint browser: true*/
/*global $*/

if (typeof DEBUG === 'undefined') {
  DEBUG = true;
}

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
    var farm     = new VimCity.Building.Farm();
    this.world.add_building(atmo_gen, 3, 3);
    this.world.destroy_building(4, 4);
    this.world.add_building(atmo_gen, 3, 3);
    this.world.add_building(starport, 8, 4);
    this.world.add_building(farm, 18, 4);
    this.viewport.draw();

    return this;
  };

  VimCity.prototype.run = function() {
    // Set up game timer
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
