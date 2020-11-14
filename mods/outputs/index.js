// var ulog = require('../../core')
var grab = require('../../core/grab')
var props = require('../props')

module.exports = {
  use: [
    props,
  ],

  settings: {

    output: {
      config: 'log_output',
      prop: {
        default: 'console',
      }
    },

    drain: {
      config: 'log_drain',
      prop: {
        default: 'drain',
      }
    },
  },

  outputs: {
    drain: { log: function(){} },
    console: typeof console !== 'undefined' && console,
  },

  ext: function(logger) {
    var outputs = grab(this, 'outputs', {})
    var output = outputs[logger.output] || outputs.drain
    for (var name in this.levels) {
      logger[name] = output[name] || output.log
    }
    logger.discard = (outputs[logger.drain] || outputs.drain).log
  },
}
