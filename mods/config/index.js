var grab = require('../../core/grab')
var args = require('./args')
var env = require('./env')
var read = require('./read')
var watch = require('./watch')

module.exports = {
  use: [
    require('../settings'),
  ],

  get: function(result, name) {
    var ulog = this
    if (!ulog.config) {
      ulog.config = {};
      ulog.config = read(ulog)
      watch(ulog)
    }
    if (!result) {
      var settings = grab(ulog, 'settings', {})
      name = settings[name] && settings[name].config || name
    }
    result || ulog.config[name] || args[name] || env[name]

    // var settings = this.grab('settings')
    // name = settings[name] && settings[name].config || name
    return result || ulog.config[name] || args[name] || env[name]
  },

  set: function(name) {
    if (name === 'log_config') this.config = read(this)
  }
}
