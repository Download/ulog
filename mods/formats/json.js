var structured = require('./structured')

module.exports = function(logger) {
  structured(this, logger, JSON.stringify)
}
