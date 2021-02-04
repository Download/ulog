var merge = require('../../core/merge')
var env = require('./env')
var args = require('./args')

module.exports = function(watched, data) {
  var cfg = {}
  merge(cfg, env)
  merge(cfg, args)
  data && merge(cfg, data)
  // var result = {}
  // for (var setting in watched) {
  //   if (setting in cfg) result[setting] = cfg[setting]
  // }
  return cfg
}
