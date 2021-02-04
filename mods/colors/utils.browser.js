var console = require('../channels/console')

module.exports = {
  // Detect firefox to compensate for it's lack of support for format specifiers on console.trace
  firefox: (typeof navigator != 'undefined') && /firefox/i.test(navigator.userAgent),

  hasColor: function(output){
    return (output === console) &&
        (navigator.userAgent.indexOf('MSIE') === -1) &&
        (navigator.userAgent.indexOf('Trident') === -1)
  },

  colorSpecifier: function(color){
    return '%c'
  },

  colorSpecifierAfter: function(color){
    return ''
  },

  colorArgument: function(color){
    return ['color:rgb(' + color.r + ',' + color.g + ',' + color.b + ')']
  },

  palette: (function() {
    var palette = []
    for (var r=0; r<8; r++) {
      for (var g=0; g<8; g++) {
        for (var b=0; b<8; b++) {
          if ((r + g + b > 8) && (r + g + b < 16)) // filter out darkest and lightest colors
          palette.push({r:24*r, g:24*g, b:24*b})
        }
      }
    }
    return palette
  })(),

  levels: {
    error: { r: 192, g:  64, b:   0 },
    warn:  { r: 180, g:  96, b:   0 },
    info:  { r:  64, g: 128, b:  16 },
    log:   { r:  64, g:  64, b:  64 },
    debug: { r:  96, g:  96, b:  96 },
    trace: { r: 112, g: 112, b: 112 },
  },
}
