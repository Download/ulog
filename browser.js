var log = require('./ulog')

var qs = location.search.substring(1),
		args = qs && qs.split('&'),
		lvl, dbg, i, m

try {
	lvl = localStorage.getItem('log')
	dbg = localStorage.getItem('debug')
} catch(e) {}

for (i=0; m=args && args[i] && args[i].split('='); i++) {
	m[0] == 'log' ? lvl = m[1] : 0
	m[0] == 'debug' ? dbg = m[1] : 0
}

log.con = function(){return window.console || self.console}
dbg && log.enable(dbg)
log()
log.level = lvl || log.WARN

module.exports = log
