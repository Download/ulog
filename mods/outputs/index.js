var parse = require('kurly/parse')
var pipe = require('kurly/pipe')

var console = require('../channels/console')
var method = require('../channels/method')
const noop = require('../channels/noop')

/**
 * mod: outputs
 *
 * Makes the outputs of logger channels configurable via props
 */
module.exports = {
  use: [
    require('../props'),
    require('../channels'),
  ],

  // adds a collection of outputs
  // an output is either an object with `log()`, `info()`, `warn()` etc methods,
  // or a kurly tag
  outputs: {
    console: console,
    noop: noop,
  },

  // adds 'output' and `drain` props to configure the output of these channels
  settings: {
    output: {
      config: 'log_output',
      prop: {
        default: 'console',
      },
    },
    drain: {
      config: 'log_drain',
      prop: {
        default: 'noop',
      },
    },
  },

  // override the channel output constructor to take logger props into account
  channelOutput: function(logger, ch){
    if (! (ch.cfg = logger[ch.name])) return
    ch.outputs = this.grab('outputs', {})
    var ast = parse(ch.cfg, { optional: true })
        .filter(function(node){return typeof node == 'object'})
    var outs = pipe(ast, ch.outputs)
        .map(function(node){return node.tag})
    return (
      outs.length === 0 ? 0 :
      (outs.length === 1) && (typeof outs[0] == 'object') ? outs[0] :
      function(rec) {
        for (var i=0,out; out=outs[i]; i++) {
          if (typeof out == 'function') out(rec)
          else method(out, rec).apply(out, rec.msg)
        }
      }
    )
  },
}
