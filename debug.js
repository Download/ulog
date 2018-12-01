var ulog = require('./')

ulog.formats.push(format);

module.exports = ulog;

function format(logger, method, args) {
  console.info('format', 'logger', logger, 'method', method, 'args', args)
  args.unshift(time(), logger.name.substring(0,18).padEnd(20, ' '))
}

function time(){
  var d = new Date(), 
      hr = d.getHours().toString().padStart(2,'0'),
      min = d.getMinutes().toString().padStart(2,'0');
  return `${hr}:${min} `
}
