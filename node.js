var log = require('./ulog')

var level, debug

if (process.env.LOG  ) {level = process.env.LOG}
if (process.env.DEBUG) {debug = process.env.DEBUG}

var fd = process.env.DEBUG_FD && parseInt(process.env.DEBUG_FD, 10),
		c = console;
if (typeof fd == 'number') {
	var stream = createWritableStdioStream(fd),
			logger = function(){stream.write(util.format.apply(this, arguments) + '\n')}
	c = {error:logger, warn:logger, info:logger, log:logger, trace:logger}
}

log.con = function(){return c}
if (debug) {log.enable(debug)}
module.exports = log()
log.level = level || log.INFO

// SEE https://github.com/visionmedia/debug/blob/2.2.0/node.js#L144
function createWritableStdioStream (fd) {
  var stream;
  var tty_wrap = process.binding('tty_wrap');

  switch (tty_wrap.guessHandleType(fd)) {
    case 'TTY':
      stream = new tty.WriteStream(fd);
      stream._type = 'tty';

      // Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    case 'FILE':
      var fs = require('fs');
      stream = new fs.SyncWriteStream(fd, { autoClose: false });
      stream._type = 'fs';
      break;

    case 'PIPE':
    case 'TCP':
      var net = require('net');
      stream = new net.Socket({
        fd: fd,
        readable: false,
        writable: true
      });

      // FIXME Should probably have an option in net.Socket to create a
      // stream from an existing fd which is writable only. But for now
      // we'll just add this hack and set the `readable` member to false.
      // Test: ./node test/fixtures/echo.js < /etc/passwd
      stream.readable = false;
      stream.read = null;
      stream._type = 'pipe';

      // FIXME Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    default:
      // Probably an error on in uv_guess_handle()
      throw new Error('Implement me. Unknown stream file type!');
  }

  // For supporting legacy API we put the FD here.
  stream.fd = fd;

  stream._isStdio = true;

  return stream;
}
