// var grab = require('../../core/grab')
// var palette = require('./utils').palette
// var levels = require('./utils').levels

var boolean = require('../props/boolean')

module.exports = {
  use: [
    require('../props'),
  ],

  settings: {
    align: {
      config: 'log_align',
      prop: boolean()
    },
  },
}
