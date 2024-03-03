import type { Adapter } from 'anylogger'

import merge from '../merge/merge.js'

const adapter: Adapter = (anylogger, ulog) => {
  // bail early if it was already extended
  if ((anylogger as any).ulog) return

  if (ulog && (ulog !== anylogger)) {
    // ulog was given, but differs from anylogger
    // there are probably two versions of anylogger hanging around
    console.warn('ulog: multiple versions of anylogger detected.')
    // try to make things work
    // this should be possible, as even among different versions, the anylogger
    // function remains functionally the same and it delegates all work to its
    // members anyway

    // take over the loggers from the project anylogger
    // replacing the field on ulog with the merged object should make both
    // versions of anylogger use the same collection of loggers and thus
    // function as one and the same. The merge ensures no loggers are lost
    ulog.all = merge(anylogger.all, ulog.all)
    // copy relevant fields from ulog to anylogger
    anylogger.ext = ulog.ext
    ;(anylogger as any).mods = ulog.mods
    ;(anylogger as any).use = ulog.use
    ;(anylogger as any).grab = ulog.grab
    ;(anylogger as any).ulog = ulog
  }
  // re-extend all loggers so cfg takes effect
  for (const logger in ulog.all) {
    ulog.ext(ulog(logger))
  }
}

export default adapter
