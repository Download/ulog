module.exports = {
  use: [
    require('../channels'),
  ],

  settings: {
    debug: {}
  },

  init: function() {
    this.enabled = this.get.bind(this, 'debug')
    this.enable = this.set.bind(this, 'debug')
    this.disable = this.set.bind(this, 'debug', '')
  },

  ext: function(logger) {
    logger.enabledFor = this.get.bind(this, 'debug', logger.name)
  }
}
