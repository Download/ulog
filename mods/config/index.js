var grab = require('../../core/grab')
// var args = require('./args')
// var env = require('./env')
var read = require('./read')
var update = require('./update')
var notify = require('./notify')
var watch = require('./watch')

module.exports = {
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
    var ulog = this
    if (!ulog.config) {
      ulog.config = {};
      var newCfg = read(ulog)
      var changed = update(ulog.config, newCfg)
      if (changed.length) notify(ulog, changed)
      watch(ulog)
    }
    if (!result) {
      var settings = grab(ulog, 'settings', {})
      name = settings[name] && settings[name].config || name
      result = ulog.config[name]
    }
    return result
  },

  set: function(name) {
    if (name === 'log_config') this.config = read(this)
  }
}
