var boolean = require('../props/boolean')
var palette = require('./utils').palette
var levels = require('./utils').levels

module.exports = {
  use: [
    require('../props')
  ],

  colors: {
    palette: palette,
    levels: levels,
  },

  settings: {
    colored: {
      config: 'log_color',
      prop: boolean(),
    },
  },

  record: function(logger, rec) {
    if (logger.colored) {
      if (!logger.colors) {
        logger.colors = this.grab('colors', {})
        logger.colors.index = hash(logger.name) % logger.colors.palette.length
      }
      if (!logger.color) {
        logger.color = logger.colors.palette[logger.colors.index]
      }
    }
  }
}

function hash(s) {
  for (var i=0, h=0xdeadbeef; i<s.length; i++)
      h = imul(h ^ s.charCodeAt(i), 2654435761)
  return (h ^ h >>> 16) >>> 0
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul#Polyfill
function imul(a, b) {
  b |= 0
  var result = (a & 0x003fffff) * b;
  if (a & 0xffc00000 /*!== 0*/) result += (a & 0xffc00000) * b |0;
  return result |0;
}
