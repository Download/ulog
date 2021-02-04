var ZWSP = '​'; // zero-width space
var firefox = require('../colors/utils').firefox

module.exports = {
  // alignment depends on color format specifiers in the browser
  hasAlign: require('../colors/utils').hasColor,

  specifier: {
    error: '%c%s%c%s',
    warn: '%c%s%c%s',
    info: '%c%s%c%s',
    log: '%c%s%c%s',
    debug: '%c%s%c%s',
    trace: '%c%s%c%s',
  },

  args: {
    error: ['padding-left:0px', ZWSP, 'padding-left:0px', ZWSP],
    warn:  ['padding-left:' + (firefox ? '12' :  '0') + 'px', ZWSP, 'padding-left:0px', ZWSP],
    info:  ['padding-left:' + (firefox ? '12' : '10') + 'px', ZWSP, 'padding-left:0px', ZWSP],
    log:   ['padding-left:' + (firefox ? '12' : '10') + 'px', ZWSP, 'padding-left:0px', ZWSP],
    debug: ['padding-left:' + (firefox ? '12' : '10') + 'px', ZWSP, 'padding-left:0px', ZWSP],
    trace: ['padding-left:0px', ZWSP, 'padding-left:0px', ZWSP],
  },
}
