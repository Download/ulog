var parse = require('./parse')

module.exports = parse(
  process.argv.slice(2)
)
