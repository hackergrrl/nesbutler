var pb = require('pixelbutler');

/* TODO:
 * default to NES resolution + scaling (but allow opts)
 * built-in NES colour palette (as pb colours)
 * defining sprite and bg palettes
 * add sprites to pattern table (2d array)
 * sprite drawing (x, y, palette)
 * nametable population + drawing
 * add sprites to pattern table (loading image data/file)
 */

/* Questions:
 * should api users need to define their palettes, or just allow the full 64-colour set to be used/indexed?
 * how can x/y scrolling be made "easy"?
 */

/* Palettes:
 * 2 palettes, each 16 bytes
 * background & sprites
 * byte correponds to one of the 64 total colours
 */

/* Hardcore Limitations:
 * 64 sprites total
 * 8 sprites per scanline (optional flicker)
 */

/* Pattern Tables:
 * define a set of 8x8 image data
 * Q: identify by numeral or string?
 */

/* Sprites:
 * x, y
 * choice of 4 sprite palette colours
 */

/* Nametables/BGs:
 * BG is 32x30 (or NxM) array of bytes/names
 */

/* Controllers:
 * let api user config the inputs that map to all 8 buttons
 * (up to N players)
 * A, B
 * Select, Start
 * Up, Down, Left, Right
 */

module.exports.Game = Game;

function Game(opts) {
  opts.width = opts.width || 256;
  opts.height = opts.height || 240;
  opts.center = opts.center || true;
  opts.scale = opts.scale || 'fit';
  var fb = new pb.Stage(opts);

  this.width = opts.width;
  this.height = opts.height;

  // Core RGB palette.
  var palette = [
    pb.rgb(0, 0, 0),
    pb.rgb(0, 100, 100),
    pb.rgb(0, 180, 180),
    pb.rgb(0, 240, 240),
    pb.rgb(255,255,0),
    pb.rgb(0,255,255),
  ];

  // Sprite palette.
  var spritePalette = [
    0,
    1,
    2,
    3,
    4,
    5,
  ];

  // Table of all sprite/bg graphics.
  var patternTable = [];

  // Sprites to render.
  var sprites = [];



  this.setPattern = function(idx, pat) {
    patternTable[idx] = pat;
  };

  this.addSprite = function(spr) {
    sprites.push(spr);
    return spr;
  };

  this.render = function() {
    fb.clear(palette[0]);

    for (var idx in sprites) {
      var sprite = sprites[idx];
      var pattern = patternTable[sprite.pattern];
      for (var i=0; i < pattern[0].length; i++) {
        for (var j=0; j < pattern.length; j++) {
          var rgb = palette[spritePalette[sprite.palette[pattern[j][i]]]];
          fb.setPixel(sprite.x+i, sprite.y+j, rgb);
        }
      }
    }

    fb.render();
  };
};
