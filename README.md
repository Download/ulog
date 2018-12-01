# ulog <sub><sup>v2.0.0-beta.3</sup></sub>
### Microscopically small universal logging library

[![npm](https://img.shields.io/npm/v/ulog.svg)](https://npmjs.com/package/ulog)
[![license](https://img.shields.io/npm/l/ulog.svg)](https://creativecommons.org/licenses/by/4.0/)
[![travis](https://img.shields.io/travis/Download/ulog.svg)](https://travis-ci.org/Download/ulog)
[![greenkeeper](https://img.shields.io/david/Download/ulog.svg)](https://greenkeeper.io/)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

<sup><sub><sup><sub>.</sub></sup></sub></sup>

![logo](https://cdn.rawgit.com/download/ulog/1.0.0/ulog.png)

`ulog` started as [Picolog](https://npmjs.com/package/picolog), the smallest 
possible logging library I could build that could act as a drop-in replacement 
for the native console (which varied wildly across environments back then).
Compared to `picolog`, `ulog` adds some features from 
[debug](https://npmjs.com/package/debug) that I missed. Even with these extra 
features, `ulog` is still **very** small, weighing in just over 1 kB minified 
and gzipped.


## ulog v2

In version 2, `ulog` is more compatible with `debug` than ever before. 
The biggest change is that the logger objects returned from `ulog()` are no 
longer objects. They are functions, just like in `debug`. But unlike the 
functions returned by `debug`, those from `ulog` are *also* fully functional 
logger objects will all methods we have on the native console and more.

For most code using `ulog` v1 or `debug`, upgrading to `ulog` v2 should be 
relatively painless. The only backward-incompatibility this version introduces
compared to `ulog` v1 is the fact that the statement `typeof log == 'object'` 
is no longer true for `ulog` v2 loggers. For code 
[using `ulog` as a replacement for `debug`](#using-ulog-as-a-replacement-for-debug), 
the upgrade path should be easier than for `ulog` v1, because of the improved 
compatibility in v2.

### beta
Please try out the latest v2 beta. To do so, you need to add a beta flag to the
npm install command:

```sh
npm install --save ulog@beta
```

I do recommend trying out the beta, but if you just need the tried and tested
v1, switch branch to the latest 1.x tag for the docs for that release and just
don't add the beta flag to your npm install command.


## Install

I recommend installing `ulog` with NPM:

```sh
npm install --save ulog
```

You should also be able to use e.g. Yarn etc.


## Download

If you want the file for the browser to include in your project yourself,
you can download it from here.

* [ulog.umd.js](https://cdn.rawgit.com/download/ulog/2.0.0-beta.3/ulog.umd.js) (~3kB, source)
* [ulog.min.js](https://cdn.rawgit.com/download/ulog/2.0.0-beta.3/ulog.min.js) (~2kB, minified)


## Include in your app

I recommend using `require` or `import` in your projects and bundling a browser
version with Webpack.

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

### Script tag
If you want, you can import `ulog` with a script tag:

```html
<script src="https://cdn.rawgit.com/download/ulog/2.0.0-beta.3/ulog.min.js"></script>
<script src="myscript.js"></script>
```
*myscript.js*
```js
	var log = ulog('my-module')
```


## Logging methods

`ulog` defines 6 logging methods, which correspond with available log levels:
```js
log.error('This logs an ERROR message')
log.warn('This logs a WARN message')
log.info('This logs an INFO message')
log.log('This logs a LOG message')
log.debug('This logs a DEBUG message')
log.trace('This logs a TRACE message')
```
Note how these methods are all from the 
[standard console API](https://console.spec.whatwg.org/).
Whenever possible, calls to these methods go directly to the corresponding 
native method.

> On some systems, `debug()` is not natively available.

In addition, ulog v2 defines some additional methods that map to native 
functions and are there to increase compatibility with other popular logging
libraries:

```js
log.verbose('This logs a message at level LOG using method log()')
log.silly('This logs a message at level TRACE using method log()')
```

Calls to all these methods will be direct calls to the native logging 
functions if available and enabled. This means that there will be no code in 
the callstack that is not yours. This helps with debugging because browsers 
tend to show the file name and line number of the point the log call was made 
from. When logging using these methods, line numbers shown in the console will
be from your code, not from some wrapper function. 

> In recent years, browsers have been adding features to ignore some parts of the call stack


## log()

In v2, the logger objects returned by `ulog` are functions. We can call them to
log messages, like so:

```js
log('This logs a DEBUG message')
```

By default, this will log a message at level `DEBUG`. But we can change that
by specifying the desired log level as the first argument:

```js
log('info', 'This logs an INFO message')
```


## Formatting

In the section about [logging methods](#logging-methods) we discussed how calls to 
these methods will be direct native calls whenever possible. This is great for our 
line numbers. But this also means `ulog` can't do any formatting on these log calls. 
And formatting log messages can be a great feature.

So for v2, calls to the new logger function will be intercepted, so we can do some 
formatting if we want. No formatting is applied by default, but you can easily add 
your own formatter like this:

```js
import ulog from 'ulog'

function myFormat(logger, method, args){
	// add the logger name to the call
  args.unshift(logger.name + ': ')
}

ulog.formats.push(myFormat) // from here on, our format is used
```

Any code calling the logger function will have the formatting applied:

```js
import ulog from 'ulog' 
const log = ulog('my-module')
log.level = log.DEBUG
log('Hello, World') // > 'my-module:  Hello World'
```

Calls to native methods are not formatted:

```js
log.info('Hello, World') // > 'Hello World'
```

Adding the option to add formatters came at a cost of ~50 bytes on the total
file but I feel it is worth it.


## Logging levels

ulog defines 6 logging levels, which correspond with the natively available 
logging functions:

```js
log.ERROR // 1
log.WARN  // 2
log.INFO  // 3
log.LOG   // 4
log.DEBUG // 5
log.TRACE // 6
```

In addition, there is a 7th level that completely disables all logging:

```js
log.NONE  // 0
```

### log.level
To get or set the log level, we use the `log.level` property:

```js
if (log.level >= log.INFO) {
	log.info('This message will be logged')
}
log.level = log.WARN
log.info('This info message will NOT be logged.')
log.warn('This warning message WILL be logged.')
log.level = log.NONE
log.error('Logging is completely disabled.')
```

> In general, code should not set the log level directly, but instead rely on 
> the host environment for the log level. See the sections below about the 
> [default log level](#default-log-level), the related 
> [startup parameter](#changing-the-log-level-via-a-startup-parameter) and 
> [debug mode](#debug-mode).


## Default log level

I've found that it makes sense to have different default log levels in 
the browser and in Node. In Node, logging is often the only UI we have 
available and we (the devs) are the only ones that will see that logging. 
In the browser, we have an alternative UI (the webpage itself), so 
logging will be less useful for normal users.

### In Node
In Node, the log level defaults to `log.INFO`. This allows you to use 
INFO, WARN and ERROR when informing the user of stuff that happened. 
With Picolog I found I had to resort to logging informational messages 
at WARN because I wanted them to be visible with the default settings 
and this did not feel right.

### In the browser
In the browser the log level defaults to `log.WARN`. This means INFO 
messages will be excluded, but for most users these messages won't be 
relevant anyway and we can easily change the log level in the browser 
using a query parameter in the URL or localStorage (see next section).


## Changing the log level

Changing the log level can be done in two ways:
 1. Programmatically, through the API
 2. Via a startup parameter

### Changing the log level via the API
We can set the global log level directly on the `ulog` function:

```js
import ulog from 'ulog'
ulog.level = ulog.DEBUG
```

But this is not recommended for most code! It is much better to set the
log level directly on a single module and leave the global settings alone.

We can set the level of a specific module in much the same way:
```js
import ulog from 'ulog'
const log = ulog('my-module')
log.level = log.DEBUG
```

For most code, it is best to treat `log.level` as if it was read-only,
and rely upon the environment to set the log level, using the startup
parameters described below.

### Changing the log level via a startup parameter
We can set the initial global log level with a startup parameter. In 
Node we use an environment variable, whereas in the browser we use a 
querystring parameter in the url or a key in localStorage.

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

`http://www.example.com/?log=debug`

Both the uppercase and lowercase names of the log levels work,
as well as their numerical values.

#### localStorage key
Add the key `log` to the localStorage of the page:
```js
localStorage.setItem('log', 'info')
```
then refresh the page.

Both the uppercase and lowercase names of the log levels work,
as well as their numerical values.


## Debug mode

In addition to setting the global log level and setting the log levels of
individual loggers, you can also enable debug mode for a group of loggers.
When in debug mode, the logger's individual log level will only be used if
it is set to TRACE. Otherwise it will be ignored and the module will behave
as if its level was set to DEBUG.

### Enabling debug mode via the API
The `ulog` function has 3 methods that allow us to control debug mode:
* `ulog.enable(str)` - Enables debug mode for the loggers listed in `str`
* `ulog.enabled(name)` - Tests whether the logger is currently in debug mode
* `ulog.disable()` - Disables debug mode for all loggers

The `*` character may be used as a wildcard. Suppose for example your module has
loggers named "connect:bodyParser", "connect:compress" and "connect:session".
Instead of listing all three with `connect:bodyParser,connect:compress,connect:session`,
you may simply use `connect:*`.

You can also exclude specific loggers by prefixing them with a "-" character.
For example, `*,-connect:*` would include all debuggers except those
starting with "connect:".

```js
// given modules app, lib, connect:bodyParser, connect:compress and connect:session
ulog.enable('app,connect:*')
ulog.enabled('app') // true
ulog.enabled('lib') // false
ulog.enabled('connect:compress') // true
ulog.enable('app,connect:*,-connect:compress') // negation symbol means 'except'
ulog.enabled('app') // true
ulog.enabled('lib') // false
ulog.enabled('connect:compress') // false
ulog.disable()
ulog.enabled('app') // false
```

### Enabling debug mode via a startup parameter
We can enable debug mode for some loggers using a startup parameter. On Node
we use environment variables and on the browser we use querystring parameters
or localStorage keys.

#### Environment variable
Set the environment variable `DEBUG` to the string with logger names:

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

#### localStorage key
Add the key `debug` to the localStorage of the page:
```js
localStorage.setItem('debug', 'my-module')
```
then refresh the page.


## Using ulog as a replacement for debug

If you are using `ulog` as a replacement for `debug`, you may want to try the
new endpoint `ulog/debug` introduced in v2:

```js
import ulog from 'ulog/debug'
const log = ulog('my-module')
const other = ulog('other-module')
log('Message')             // > '20:15  my-module           Message'
other('Another message')   // > '20:15  other-module        Another message'
```

It is not doing that much at the moment but I plan to make this a
compatibility endpoint for debug.

You can also use this as a Webpack alias, to make all modules that use `debug` 
switch to `ulog/debug` instead. Compatibility is not guaranteed though so your
mileage may vary:

```js
{
    resolve: {
        alias: {
            'debug': 'ulog/debug'
        }
    }
}
```


## Using ulog as a polyfill

ulog supports all functions in the 
[NodeJS Console API](https://nodejs.org/api/console.html), so you should be 
able to use it as a polyfill in environments where there is no `console` 
available (e.g. Nashorn):

```js
// assuming you already made sure there is a `global` object
global.console = log;
console.info('Nashorn can do logging to!');
```

Since v2, the logger objects are functions and not objects, which may affect
code testing for the existence of the console like:

```js
if (typeof console == 'object') {
	// use the console
}
```

Such tests will fail as of v2. I am hoping to solve this with a dedicated 
`ulog/polyfill` endpoint, but have not yet got around to implementing it. 
In the mean time you can use some `extend` function to create an object 
from a logger function:

```js
// assuming you have some `extend` function:
global.console = extend({}, log)
console.info('Nashorn can do logging to!');
```


## `assert` does not throw

ulog patches the [different behavior](https://github.com/jasnell/node/blob/master/doc/api/console.md#consoleassertvalue-message-args) 
of `console.assert` in Node compared to browsers. In ulog, `assert` behaves 
just like in the browsers and never throws.


## Performance considerations

The logging methods on the `log` object that correspond to a log level which 
is higher than the currently set level, are replaced by no-op methods. As such,
you generally don't have to worry about the performance overhead of leaving 
the log statements in the production code. There is one exception to this rule
though. If preparing the message itself is a costly operation, you may want to
surround the log code with an `if (log.level >= myLevel)` statement:

```js
if (log.level >= log.INFO) {
	var message = doLotsOfWorkToGenerateLogMessage();
	log.info(message);
}
```


## Issues

Add an issue in the [issue tracker](https://github.com/download/ulog/issues)
to let me know of any problems you find, or questions you may have.


## Credits

Credits go to:
* Felix Geisendörfer from [debuggable.com](http://debuggable.com/) for kindly 
  giving up the `ulog` namespace on NPM. Thanks Felix!
* TJ Holowaychuk for creating [debug](https://github.com/visionmedia/debug), 
  which was a great inspiration for ulog.


## Copyright

Copyright 2018 by [Stijn de Witt](http://StijnDeWitt.com). Some rights reserved.


## License

Licensed under the [Creative Commons Attribution 4.0 International (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/) Open Source license.
