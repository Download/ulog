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
    'debug,log,log_output,log_format,log_color,log_align':
    // when changes happen, load the other mods if needed
    function(){
      var ulog = this
      // webpack specific API to lazy load modules
      require.ensure(
        // ensure these modules are loaded
        [
          './mods/debug',
          './mods/levels',
          './mods/outputs',
          './mods/formats',
          './mods/colors',
          './mods/align',
        ],
        // then execute this function, notice require being overridden
        function(require){
          // add the mods to ulog
          if (ulog.use([
            // use the overridden require to lazy load the modules
            require('./mods/debug'),
            require('./mods/levels'),
            require('./mods/outputs'),
            require('./mods/formats'),
            require('./mods/colors'),
            require('./mods/align'),
          ])) {
            // re-initialize the loggers if mods were added
            ulog.ext()
          }
        },
        // chunkname webpack will use for these lazy modules: ulog.lazy.min.js
        'ulog.lazy'
      )
    },
  }
})
