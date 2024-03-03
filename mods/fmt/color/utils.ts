import type { Color, Argument, Specifier, HasColor, Colors, Palette } from './types.js'

export const firefox = false;

export const hasColor: HasColor = (output) => {
  return (
    // TODO check whether process was redirected to file first
    output === console
  )
}

export const specifier: Specifier = (color) => {
  return '\u001B[38;2;' + color.r + ';' + color.g + ';' + color.b + 'm'
}

export const argument: Argument = (color) => {
  return []
}

export const specifierAfter: Specifier = (color) => {
  return '\x1b[0m'
}

export const palette: Palette = (function() {
  const result: Color[] = []
  for (var r=0; r<8; r++) {
    for (var g=0; g<8; g++) {
      for (var b=0; b<8; b++) {
        // filter out darkest and lightest colors
        if ((r + g + b > 8) && (r + g + b < 16)) {
          result.push({r:32*r, g:32*g, b:32*b})
        }
      }
    }
  }
  return result
})()

export const levelColors: Colors = {
  error: { r: 244, g:  96, b:  48 },
  warn:  { r: 200, g: 140, b:   0 },
  info:  { r: 128, g: 204, b:  96 },
  log:   { r: 192, g: 192, b: 192 },
  debug: { r: 160, g: 160, b: 160 },
  trace: { r: 144, g: 144, b: 144 },
}

export default {
  firefox,
  hasColor,
  specifier,
  specifierAfter,
  palette,
  levelColors,
}
