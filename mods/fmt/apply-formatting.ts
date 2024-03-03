import type { Logger, LogObject } from 'anylogger'
import type { HasLvl } from '../lvl/lvl.js'

import {
  hasColor,
  specifier,
  argument,
  specifierAfter
} from './color/utils.js'

export default function(rec: any, fmt: any, msg: any, r: any){
  const logger: Logger & HasLvl = rec.logger
  var out = logger.output
  if (out === console) {
    var color = hasColor(out)
    var c = color && rec.logger.color && fmt.color;
    c = c == 'level' ? rec.colors.levels[rec.level] : c
    c = c == 'logger' ? rec.colors.palette[rec.colors.index] : c
    r[0] += (c && specifier(c)) || ''
    var len = Array.isArray(msg) ? msg.length : 1
    for (var i=0; i<len; i++) {
      var m = Array.isArray(msg) ? msg[i] : msg
      r[0] += fmt.specifier || (typeof m == 'object' ? '%O ' : '%s ')
    }
    r[0] += (c && specifierAfter(c)) || ''
    r.push.apply(r, (c && argument(c)) || [])
  }
  r.push.apply(r, Array.isArray(msg) ? msg : [ msg ])
  return r
}
