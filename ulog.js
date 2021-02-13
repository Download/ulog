// ulog - the universal logger
// © 2021 by Stijn de Witt
// License: MIT
(module.exports = require('./base')).use([
  require('./mods/debug'),
  require('./mods/outputs'),
  require('./mods/formats'),
  require('./mods/colors'),
  require('./mods/align'),
])
