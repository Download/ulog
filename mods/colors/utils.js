module.exports = {
  firefox: false,

  hasColor: function(output){
    return (typeof console !== 'undefined') && (output === console)
  },

  colorSpecifier: function(color){
    return '\u001B[38;2;' + color.r + ';' + color.g + ';' + color.b + 'm'
  },

  colorArgument: function(color){
    return []
  },

  colorSpecifierAfter: function(color){
    return '\x1b[0m'
  },

  palette: (function() {
    var palette = []
    for (var r=0; r<8; r++) {
      for (var g=0; g<8; g++) {
        for (var b=0; b<8; b++) {
          if ((r + g + b > 8) && (r + g + b < 16)) // filter out darkest and lightest colors
          palette.push({r:32*r, g:32*g, b:32*b})
        }
      }
    }
    return palette
  })(),

  levels: {
    error: { r: 244, g:  96, b:  48 },
    warn:  { r: 200, g: 140, b:   0 },
    info:  { r: 128, g: 204, b:  96 },
    log:   { r: 192, g: 192, b: 192 },
    debug: { r: 160, g: 160, b: 160 },
    trace: { r: 144, g: 144, b: 144 },
  },
}
