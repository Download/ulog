module.exports = {
  use: [
    require('../levels'),
  ],

  init: function() {
    this.enabled = this.get.bind(this, 'debug')
    this.enable = this.set.bind(this, 'debug')
    this.disable = this.set.bind(this, 'debug', '')
  }
}
