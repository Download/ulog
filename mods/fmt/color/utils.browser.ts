import type { HasColor, Specifier, Argument, Palette, Colors } from './types.js'

  // Detect firefox to compensate for it's lack of support for format specifiers on console.trace
export const firefox = (typeof navigator != 'undefined') &&
    /firefox/i.test(navigator.userAgent)

export const hasColor: HasColor = (output) => (
  (output === console)
      && (navigator.userAgent.indexOf('MSIE') === -1)
      && (navigator.userAgent.indexOf('Trident') === -1)
)

export const specifier: Specifier = (color) => {
  return '%c'
}

export const specifierAfter: Specifier = function(color){
  return ''
}

export const argument: Argument = function(color){
  return ['color:rgb(' + color.r + ',' + color.g + ',' + color.b + ')']
}

export const palette: Palette = (function() {
  var palette: Palette = []
  for (var r=0; r<8; r++) {
    for (var g=0; g<8; g++) {
      for (var b=0; b<8; b++) {
        if ((r + g + b > 8) && (r + g + b < 16)) // filter out darkest and lightest colors
        palette.push({r:24*r, g:24*g, b:24*b})
      }
    }
  }
  return palette
})()

export const levelColors: Colors = {
  error: { r: 192, g:  64, b:   0 },
  warn:  { r: 180, g:  96, b:   0 },
  info:  { r:  64, g: 128, b:  16 },
  log:   { r:  64, g:  64, b:  64 },
  debug: { r:  96, g:  96, b:  96 },
  trace: { r: 112, g: 112, b: 112 },
}

export default {
  firefox,
  hasColor,
  specifier,
  specifierAfter,
  palette,
  levelColors,
}
