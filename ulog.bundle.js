// ulog - the universal logger
// © 2020 by Stijn de Witt
// License: MIT

// This is the bundled version of ulog, for use as an old-fashioned script-include.
// Bundlers and node will use main.js directly
module.exports = self.ulog = self.anylogger = require('./')
