// Detect V8 in browsers to compensate for a bug where toString is called twice
var bug = (typeof Intl != 'undefined') && Intl.v8BreakIterator
var firefox = require('../colors/utils').firefox

module.exports.makeStatic = function(fmt){
  if (bug && (typeof fmt == 'function') && (fmt.toString === fmt)) {
    var skip = bug
    fmt.toString = function(){
      if (skip) return skip = ''
      skip = bug
      return fmt()
    }
  }
  return fmt
}

module.exports.makeStaticPipe = function(output, method, rec, args) {
  return method.bind.apply(method, [output].concat(firefox && (rec.level === 'trace') ? [] : args))
}
