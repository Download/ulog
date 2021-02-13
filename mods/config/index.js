var grab = require('../../core/grab')
// var args = require('./args')
// var env = require('./env')
var read = require('./read')
var update = require('./update')
var notify = require('./notify')
var watch = require('./watch')
var config = module.exports = {
  use: [
    require('../settings'),
  ],

  settings: {
    config: {
      config: 'log_config'
    }
  },

  init: function(){
    this.get('config')
  },

  get: function(result, name) {
    if (! this.config) {
      config.update(this)
    }
    if (!result) {
      var settings = grab(this, 'settings', {})
      name = settings[name] && settings[name].config || name
      result = this.config[name]
    }
    return result
  },

  update: function(ulog) {
    ulog.config = ulog.config || {}
    var newCfg = read(ulog)
    var changed = update(ulog.config, newCfg)
    if (changed.length) notify(ulog, changed)
    watch(ulog)
  },

  set: function(name) {
    if (name === 'log_config') config.update(this)
  }
}
