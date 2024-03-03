// ulog - the universal logger
// © 2021 by Stijn de Witt
// License: MIT

// ulog.bundle.js => ulog.min.js
// this is the bundled version of ulog, for use as an old-fashioned script-include
// bundlers and node will use ulog.js directly
// the ulog bundle implements lazy loading
// If you don't want this, use the full bundle instead.

// import only ulog/core for now
import ulog from 'ulog/core'
// using `env` from the `cfg` mod to get config in a cross-platform way,
// while avoiding the rest of the footprint of the `cfg` module
import env from 'ulog/mods/cfg/env'

// just making sure ulog is available as global in the script version
(window as any).ulog = ulog;

// check if either `log` or `debug` is set
if (env.get('log') || env.get('debug')) {
  // yes. only now do we actually load the rest
  import(
    /* webpackChunkName: 'ulog.lazy' */
    'ulog/mods/fmt'
  )
  .then(({ default: fmt }) => {
    ulog.use(fmt)
    for (const logger in ulog.all) {
      ulog.ext(ulog(logger))
    }
  })
}
