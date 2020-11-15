// ulog - the universal logger
// © 2020 by Stijn de Witt
// License: MIT

// This is the bundled version of ulog/full, for use as an old-fashioned script-include.
// Bundlers and node will use full.js directly
var kurly = require('./mods/kurly')
var ulog = module.exports = require('./ulog.bundle')
ulog.use(kurly)
