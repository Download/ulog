// ulog - the universal logger
// © 2020 by Stijn de Witt
// License: MIT

// This is the full version of ulog, with kurly included.
// require('ulog/full') to include
var kurly = require('./mods/kurly')
var ulog = module.exports = require('./')
ulog.use(kurly)
