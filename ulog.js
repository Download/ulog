// ulog - the universal logger
// © 2021 by Stijn de Witt
// License: MIT
var ulog = module.exports = require('./base')
ulog.use([
  require('./mods/debug'),
  require('./mods/levels'),
  require('./mods/outputs'),
  require('./mods/formats'),
  require('./mods/colors'),
  require('./mods/align'),
])
