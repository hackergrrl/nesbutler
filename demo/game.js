var nesbutler = require('./index');

var nes = new nesbutler.Game({
  canvas: 'game-area',
});

nes.setPattern(0, [
  [ 1, 0, 0, 0, 0, 0, 0, 1 ],
  [ 0, 1, 1, 3, 3, 1, 1, 0 ],
  [ 0, 1, 0, 0, 0, 0, 1, 0 ],
  [ 0, 2, 0, 0, 0, 0, 2, 0 ],
  [ 0, 2, 0, 0, 0, 0, 2, 0 ],
  [ 0, 1, 0, 0, 0, 0, 1, 0 ],
  [ 0, 1, 1, 3, 3, 1, 1, 0 ],
  [ 1, 0, 0, 0, 0, 0, 0, 1 ],
]);

nes.setPattern(1, [
  [ 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 3, 3, 3, 3, 3, 3, 2 ],
  [ 1, 3, 3, 3, 3, 3, 3, 2 ],
  [ 1, 3, 3, 3, 3, 3, 3, 2 ],
  [ 1, 3, 3, 3, 3, 3, 3, 2 ],
  [ 1, 3, 3, 3, 3, 3, 3, 2 ],
  [ 1, 3, 3, 3, 3, 3, 3, 2 ],
  [ 1, 2, 2, 2, 2, 2, 2, 2 ],
]);

nes.setPattern(2, [
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 1, 1, 0, 0, 0 ],
  [ 0, 3, 1, 1, 1, 1, 3, 0 ],
  [ 0, 0, 1, 1, 1, 1, 0, 0 ],
  [ 0, 0, 0, 1, 1, 0, 0, 0 ],
  [ 0, 0, 0, 2, 2, 0, 0, 0 ],
  [ 0, 0, 0, 2, 2, 0, 0, 0 ],
  [ 0, 0, 0, 2, 2, 0, 0, 0 ],
]);

var foes = [];
for (var i=0; i < 20; i++) {
  var spr = nes.addSprite({
    pattern: 0,
    // x: (i % 32) * 8,
    // y: Math.floor(i / 32) * 8,
    x: Math.floor(Math.random() * 256),
    y: Math.floor(Math.random() * 240),
    palette: [0, 4, 3, 5],
  });
  spr.vx = Math.floor(Math.random() * 3 - 1);
  spr.vy = Math.floor(Math.random() * 3 - 1);

  foes.push(spr);
}

var chr = nes.addSprite({
  pattern: 2,
  x: 100,
  y: 75,
  palette: [0, 2, 3, 5]
});

setInterval(function() {
  for (var i in foes) {
    var sprite = foes[i];
    sprite.x += sprite.vx;
    sprite.y += sprite.vy;
    if (sprite.x+8 > nes.width || sprite.x < 0) {
      sprite.vx *= -1;
    }
    if (sprite.y+8 > nes.height || sprite.y < 0) {
      sprite.vy *= -1;
    }
  }

  nes.render();
}, 16);
