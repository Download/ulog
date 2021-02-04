var merge = require('../../core/merge')

module.exports = function(prop) {
  var result = {
    default: 'on',
    fromStr: function(v){return v=='on' || v=='yes' || v=='true' || v=='enabled'},
    toStr: function(v){return v ? 'on' : 'off'}
  }
  merge(result, prop)
  return result
}
