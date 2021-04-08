var merge = require('../../core/merge')

module.exports = function(ctx) {
  return function(rec) {
    if (rec.msg && (rec.msg.length >= 1) && (typeof rec.msg[0] == 'object') && !Array.isArray(rec.msg[0]) &&
       ((rec.msg.length > 1) || (rec.msg[0].msg))) {
      // call signature matches stuctured logging pattern
      // first, remove the record object from the message
      var object = rec.msg.shift()
      if (object.msg) {
        // append the message on the object to the (possibly empty) rec.msg array
        rec.msg.push.apply(rec.msg, Array.isArray(object.msg) ? object.msg : [ object.msg ])
      }
      // merge the object onto the log record
      merge(rec, object)
    }
  }
}
