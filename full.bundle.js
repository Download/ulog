// ulog - the universal logger
// © 2021 by Stijn de Witt
// License: MIT

// full.bundle.js => full.min.js
// this is the bundled version of ulog, for use as an old-fashioned script-include
// bundlers and node will use ulog.js directly
// the full bundle is basically just ulog, without any lazy loading
// for lazy loading support, use ulog.min.js

// just making sure both ulog and anylogger are available as globals in the script version
module.exports = self.ulog = self.anylogger = require('./ulog')

// ....aaand we're done already :)