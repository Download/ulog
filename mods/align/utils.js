var console = require('../channels/console')
module.exports = {
  hasAlign: function(output){return output === console},
  specifier: {
    trace: '\n'
  }
}
