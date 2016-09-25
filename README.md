# ulog <sub><sup>v0.1.0</sup></sub>
Microscopically small universal logging library

[![npm](https://img.shields.io/npm/v/ulog.svg)](https://npmjs.com/package/ulog)
[![license](https://img.shields.io/npm/l/ulog.svg)](https://creativecommons.org/licenses/by/4.0/)
[![travis](https://img.shields.io/travis/Download/ulog.svg)](https://travis-ci.org/Download/ulog)
[![greenkeeper](https://img.shields.io/david/Download/ulog.svg)](https://greenkeeper.io/)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

<sup><sub><sup><sub>.</sub></sup></sub></sup>

![logo](https://cdn.rawgit.com/download/ulog/0.1.0/ulog.png)

Ulog builds on the experience gained building and using [Picolog](https://npmjs.com/package/picolog),
possibly the smallest universal logging library on NPM that supports levels, and adds some features
from [debug](https://npmjs.com/package/debug) that I missed. Even with these extra features, ulog is
still **very** small, weighing in just over 1 kB minified and gzipped.

## Download
* [ulog.umd.js](https://cdn.rawgit.com/download/ulog/0.1.0/ulog.umd.js) (~2kB, source)
* [ulog.min.js](https://cdn.rawgit.com/download/ulog/0.1.0/ulog.min.js) (~1.1kB, minified)

## Install
```sh
npm install --save ulog
```

## Include in your app

### require
*my-module.js*
```js
var ulog = require('ulog')
var log = ulog('my-module')
// or, shorthand
var log = require('ulog')('my-module')
```

### import
*my-module.js*
```sh
import ulog from 'ulog'
const log = ulog('my-module')
```

### AMD
*my-module.js*
```js
define(['ulog'], function(ulog){
	var log = ulog('my-module')
});
```

### Script tag
```html
<script src="https://cdn.rawgit.com/download/ulog/0.1.0/ulog.min.js"></script>
```

## Logging methods
ulog defines 6 logging methods, which correspond with available log levels:
```js
log.error('This logs an ERROR message');
log.warn('This logs a WARN message');
log.info('This logs an INFO message');
log.log('This logs a LOG message');
log.debug('This logs a DEBUG message');
log.trace('This logs a TRACE message');
```
ulog does **not** mess with your stacktrace or line numbers. Line numbers shown in the console
will be from your code, not from some wrapper function..

## Logging levels
ulog defines 6 logging levels, which correspond with the available logging methods:
```js
log.ERROR; // 1
log.WARN;  // 2
log.INFO;  // 3
log.LOG;   // 4
log.DEBUG; // 5
log.TRACE; // 6
```
In addition, there is a 7th level that completely disables all logging:
```js
log.NONE;  // 0
```
To get or set the log level, we use the `log.level` property:
```js
if (log.level >= log.INFO) {
	log.info('This message will be logged');
}
log.level = log.WARN;
log.info('This info message will NOT be logged.');
log.warn('This warning message WILL be logged.');
log.level = log.NONE;
log.error('Logging is completely disabled.');
```


## Default log level
I've found that it makes sense to have different default log levels in the browser
and in Node. In Node, logging is often the only UI we have available and we (the devs)
are the only ones that will see that logging. In the browser, we have an alternative
UI (the webpage itself), so logging will be less useful for normal users.

### In Node
In Node, the log level defaults to `log.INFO`. This allows you to use INFO, WARN and ERROR
when informing the user of stuff that happened. With Picolog I found I had to resort
to logging informational messages at WARN because I wanted them to be visible with the
default settings and this did not feel right.

### In the browser
In the browser the log level defaults to `log.WARN`. This means INFO messages will be excluded,
but for most users these messages won't be relevant anyway and we can easily change the
log level in the browser using a query parameter in the URL.

## Changing the log level
Changing the log level can be done in two ways:
 1. Programmatically, through the API
 2. Via a startup parameter

### Changing the log level via the API
We can set the global log level directly on the `ulog` function:
```js
var ulog = require('ulog')
// ...
ulog.level = ulog.DEBUG
```

We can set the level of a specific module in much the same way:
```js
var log = ulog('my-module')
// ...
log.level = ulog.DEBUG
```

### Changing the log level via a startup paramter
We can set the initial global log level with a startup parameter. In Node we use
an environment variable, whereas in the browser we use a querystring parameter in the url.

#### Environment variable
Set the environment variable `LOG` to the desired log level.

```sh
$ LOG=info && node ./myapp.js
```
or, in Windows:
```sh
$ set LOG=INFO && node ./myapp.js
```

#### Querystring parameter
Add the parameter `log` to the querystring of the page:

`http://www.example.com/?`**`log=debug`**

Both the uppercase and lowercase names of the log levels work,
as well as their numerical value.

### Setting modules to DEBUG with a startup parameter
We can set some modules to DEBUG using a startup parameter. In this mode, they
will log any messages of level DEBUG or higher.

#### Environment variable
Set the environment variable `DEBUG` to the module names:

```sh
$ DEBUG=my-module && node ./myapp.js
```
or, in Windows:
```sh
$ set DEBUG=my-module && node ./myapp.js
```

#### Querystring parameter
Add the parameter `debug` to the querystring of the page:

`http://www.example.com/?`**`debug=my-module`**

The `*` character may be used as a wildcard. Suppose for example your module has
loggers named "connect:bodyParser", "connect:compress" and "connect:session".
Instead of listing all three with `DEBUG=connect:bodyParser,connect:compress,connect:session`,
you may simply do `DEBUG=connect:*`.

You can also exclude specific loggers by prefixing them with a "-" character.
For example, `DEBUG=*,-connect:*` would include all debuggers except those
starting with "connect:".

## Using ulog as a polyfill
ulog supports all functions in the [NodeJS Console API](https://nodejs.org/api/console.html),
so you should be able to use it as a polyfill in environments where there is no `console` available (e.g. Nashorn):
```js
// assuming you already made sure there is a `global` object
global.console = log;
console.info('Nashorn can do logging to!');
```

## Performance considerations
The logging methods on the `log` object that correspond to a log level which is higher than the
currently set level, are replaced by no-op methods. As such, you generally don't have to worry
about the performance overhead of leaving the log statements in the production code. There is
one exception to this rule though. If preparing the message itself is a costly operation, you
may want to surround the log code with an `if (log.level >= myLevel)` statement:
```js
if (log.level >= log.INFO) {
	var message = doLotsOfWorkToGenerateLogMessage();
	log.info(message);
}
```

## Copyright
Copyright 2016 by [Stijn de Witt](http://StijnDeWitt.com). Some rights reserved.

## License
Licensed under the [Creative Commons Attribution 4.0 International (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/) Open Source license.
