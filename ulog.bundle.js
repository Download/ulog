// ulog - the universal logger
// © 2021 by Stijn de Witt
// License: MIT

// ulog.bundle.js => ulog.min.js
// this is the bundled version of ulog, for use as an old-fashioned script-include
// bundlers and node will use ulog.js directly
// the ulog bundle implements lazy loading
// If you don't want this, use the full bundle instead.

// just making sure both ulog and anylogger are available as globals in the script version
module.exports = self.ulog = self.anylogger = require('./base')

// add a mod to ulog to load logging on-demand
ulog.use({
  watch: {
    // watch for changes in these config keys
    'debug,log':
    // when changes happen, load the other mods if needed
    function(){
      // webpack specific API to lazy load modules
      require.ensure(
        // ensure these modules are loaded
        [ './mods/lazy' ],
        // then execute this function, notice require being overridden
        function(require){
          // use the overridden require to lazy load the modules
          if (ulog.use(require('./mods/lazy'))) {
            // re-initialize the loggers if mods were added
            ulog.ext()
          }
        },
        'ulog.lazy' // chunkname webpack will use: ulog.lazy.min.js
      )
    }
  }
})
