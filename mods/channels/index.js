var console = require('./console')
var noop = require('./noop')
var method = require('./method')

/**
 * mod: channels
 *
 * Introduces the concept of log channels.
 *
 * A log channel is a path a log message may take that leads to an output.
 *
 * This mod enables multiple channels to be defined (by other mods) and offers
 * a hook for other mods to customize how the channel output is created.
 *
 * This mod adds two default channels named 'output' and 'drain'.
 */
module.exports = {
  use: [
    require('../config'),
    // require('../options'),
    require('../props'),
  ],

  // adds the channels 'output' and 'drain'
  channels: {
    output: {
      out: console,
    },
    drain: {
      out: noop,
    }
  },

  // enhance the given loggers with channels
  ext: function(logger) {
    var ulog = this
    var channels = ulog.grab('channels', {})
    var channelOutputs = ulog.grab('channelOutput', [])
    var recorders = ulog.grab('record', [])
    logger.channels = {}
    for (var channel in channels) {
      var ch = logger.channels[channel] = {
        name: channel,
        channels: channels,
        out: channels[channel].out || console,
        recorders: recorders,
        fns: {},
      }
      ch.out = channelOutputs.reduce(function(r, channelOutput){
        return channelOutput.call(ulog, logger, ch) || r
      }, ch.out);
      for (var level in ulog.levels) {
        var rec = ch.recorders.reduce(function(rec, record){
          record.call(ulog, logger, rec)
          return rec
        }, { channel: channel, level: level })
        ch.fns[level] = (function(ch,rec){
          return (typeof ch.out == 'function'
            ? function(){
              rec.msg = [].slice.call(arguments)
              ch.out(rec)
            }
            : method(ch.out, rec)
          )
        })(ch,rec)
      }
    }
  },

  // after all ext hooks have run, assign the log methods to
  // the right channels based on logger.enabledFor
  after: function(logger) {
    for (var level in this.levels) {
      logger[level] = logger.channels[logger.enabledFor(level) ? 'output' : 'drain'].fns[level]
    }
  },

  record: function(logger, rec){
    rec.name = logger.name
    rec.logger = logger
    rec.ulog = this
  }
}
