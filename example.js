var ulog = require('./full')

var log
log = ulog('test:log1')
for (var level in ulog.levels) {
  log[level]('This is a ' + level.toUpperCase() + ' message')
}

log = ulog('test:log2')
for (var level in ulog.levels) {
  log[level]('This is a ' + level.toUpperCase() + ' message')
}

