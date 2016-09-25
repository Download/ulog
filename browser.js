var log = require('./ulog'),
		qs = location.search.substring(1),
		args = qs && qs.split('&'),
		lvl, dbg, i, m

for (i=0; m=args && args[i] && args[i].split('='); i++) {
	(m[0] == 'log') && (lvl = m[1])
	(m[0] == 'debug') && (dbg = m[1])
}

log.con = function(){return window.console && console}
dbg && log.enable(dbg)
module.exports = log()
log.level = lvl || log.WARN
