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
