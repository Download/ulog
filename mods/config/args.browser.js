var parse = require('./parse')

module.exports = parse(
  location.search.replace(/^(\?|#|&)/, '').split('&'),
  /\+/g, ' ', decodeURIComponent
)
