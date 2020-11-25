# ulog <sub><sup>v2.0.0-beta.9</sup></sub>
### The Universal Logger

[![npm](https://img.shields.io/npm/v/ulog.svg)](https://npmjs.com/package/ulog)
[![license](https://img.shields.io/npm/l/ulog.svg)](https://opensource.org/licenses/MIT)
[![travis](https://img.shields.io/travis/Download/ulog.svg)](https://travis-ci.org/Download/ulog)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

<sup><sub><sup><sub>.</sub></sup></sub></sup>

![logo](https://raw.githubusercontent.com/Download/ulog/beta10/ulog.png)


## The logger for applications

`ulog` is *the* logger for Javascript applications. It's universal, meaning it runs everywhere. You can use `ulog` in your Express server application running on Node JS just as well as in your React single page application running in the browser. It just works.

![screenshot](https://unpkg.com/ulog@2.0.0-beta.9/screenshot.jpg)


## Install

```sh
npm i -S anylogger ulog
```

### Add to entry point
In the entry point of your application import `ulog`:

*index.js*
```js
import "ulog"
```


## Use

In your code, import `anylogger` and use it to create loggers and do logging:

```js
import anylogger from 'anylogger'
const log = anylogger('my-app')
log('Logging is easy!')
```

This way, your code is decoupled from `ulog` and if you ever want to switch to another logging library, you will be able to do so without having to change any of that code.

> **anylogger**
> [`anylogger`](https://npmjs.com/package/anylogger) is a logging facade that allows code to use logging without getting coupled to a specific logging system. You can use that code with any logging system out there.


## The logger for libraries

When we write a library to be used by other libraries or applications, we typically don't want to decide which logger these libraries or applications should use. Instead, we want to use whatever logging framework the client code is using.

### Install ulog as a dev dependency

We can have the cake and eat it to. We can decouple our library from `ulog`
for the client code, while still using it in development. To do so, we install
`anylogger` as a regular dependency and `ulog` as a dev dependency:

```sh
npm install --save anylogger && npm install --save-dev ulog
```

In our tests:

*test.js*
```js
  import `ulog`
```

In our library code:

*my-lib.js*
```js
  import anylogger
  const log = anylogger('my-lib')
  log('Logging is easy')
```


## Script tag

If you want, you can import `ulog` with a script tag:

```html
<script src="https://unpkg.com/ulog@2.0.0-beta.9"></script>
<!-- includes `anylogger` and publishes to `self.anylogger` and `self.ulog`. -->
<script src="myscript.js"></script>
```
*myscript.js*
```js
	var log = anylogger('my-module')
	log('Logging is easy!')
```

Or, if you want the full version:

```html
<script src="https://unpkg.com/ulog@2.0.0-beta.9/full.min.js"></script>
```


## Download

If you want the file for the browser to include in your project yourself, you can download it from here.

* [ulog.min.js](https://unpkg.com/ulog@2.0.0-beta.9) (~2.8kB minified and gzipped)
* [full.min.js](https://unpkg.com/ulog@2.0.0-beta.9/full.min.js) (~3.5kB minified and gzipped)


## Why `ulog`

The two most popular logging libraries on NPM at the moment are [`debug`](https://npmjs.com/package/debug) and [`loglevel`](https://npmjs.com/package/loglevel), with 85.6M and 8.8M weekly downloads, respectively. They are both great loggers, but neither of them completely satisfied my requirements for a logging library.

`debug` has a simple API and is configurable on both Node JS via environment variables and in the browser via localStorage, though not dynamic, requiring a restart before changes take effect. It's simplicity makes it an excellent choice for debug logging (as it's name implies), but it lacks support for log levels, so if you want to log error messages for example, you end up needing another library for that. It offers nicely formatted (and even colored!) log messages, but because of that mangles the call stack, which is a huge downside in the browser imho. It offers some rudimentary support for configuring the destination of log messages, allowing you to send logging to a file instead of the console. Weighing in at 3.1kB minified and gzipped, it's a bit large for the feature set that it offers. And it's not very extensible either, basically being a monolith.

`loglevel` does offer log levels. These names start to make sense now right? It's API is also simple, but it has a global logger which is a downside imho as it allows for 'anonymous' logging, making it less suitable for debug logging. Also, though it's API is modeled after that of the console (a good thing imho), it does not have the `console.log` method, so it's not quitte a drop-in replacement for the console. It's configurable via localStorage but not via environment variables and just like `debug` requires a restart before configuration changes take effect. By default, it leaves your call stack alone, making the filename/line number entries in the browser console that much more useful. It does not offer alternative log destinations or formatters out of the box. It can be extended via plugins and there are some good plugins out there, but it's base feature set is coded as a monolith, so you cannot easily remove features. You probably won't have to though as it weighs only 1.4kB.

Both these loggers lack the ability to configure the logger from the querystring, which I found to be a very desirable feature for web development as it allows you to create a URL that has the log config embedded, which you can then send to other developers or users etc. E.g: `https://example.com/page?log=debug`.

Finally, both these loggers couple your code to the logging library. What I mean by that is that when you install a library using one of these loggers, that logger gets pulled in to your codebase. The downside of this is that in a more complex application using many libraries, you often end up with **both** loggers included in your app. In fact you often end up with 3 or even 4 logging libraries... which is a bit wasteful!

What I want is a logging library that combines the best aspects of both these loggers and adds the features that I miss in both, without coupling the client code to it. Specifically here are the features that I want in my ultimate logging library:

* Simple API (nothing can beat `debug`'s single log function, but `ulog` gets close)
* Supports all `console` log methods
* No 'anonymous' logging
* Configurable at runtime (without requiring a restart)
* Accepts configuration from the querystring
* Leaves the call stack alone
* Formatted log messages
* Configurable log output and formatting options built in
* Extensible
* Decoupled from client code
* Compact

`ulog` is my attempt at building this library. It's base API is compatible with that of `debug` and `loglevel` and with the console, making it a drop-in replacement for all of these in many cases. It does not support 'anonymous' logging, so no hunting down where a log message came from and no log messages that cannot be suppressed. And it has a configuration mechanism that is compatible with that of `debug`, but that is more powerful and is monitored for changes at runtime. It accepts configuration from the querystring allowing you to craft URLs with log config embedded in it. And even though it uses a simple formatter by default, I found a way to do this without mangling the call stack, so the filename/line number entries in the browser console remain unharmed. You can specify where the log output should go and where it should drain. It's completely modular, so you can not only easily add features through 'mods', but you can actually even drop features you don't need by not loading the mods those features are in. It has native `anylogger` support, decoupling the client code from the logger. And even with `anylogger` included, it still weighs just 2.8kB. Smaller than `debug`, but offering way more features.


## API

`ulog` is very natural to use:

```js
var log = require('anylogger')('my-module') // same as with `debug`

log('A log message')                        // same as with `debug`
log('info', 'An info message')              // not possible with `debug`
log('warn', 'A warning message')            // not possible with `debug`
log.info('Starting...')                     // same as with `loglevel` or console
log.log('Yeah!')                            // same as with console
log.error('Something went wrong', new Error('Oh no!'))
if (log.enabledFor('warn')) {
  log.warn(expensiveArguments())
}
```
> Note that in the code above, we import `anylogger` and not `ulog`. This way the client code is decoupled from the logger.

`ulog` inherits it's API from `anylogger`. If you are able to restrict yourself to the [Anylogger API](https://www.npmjs.com/package/anylogger#anylogger-api), your code will be framework independent and will work with any supported logging library.

Note that any logging code written for either `debug`, `loglevel` or the console should be able to do it's logging just like it did before, but now using a `ulog` logger instead. This backward compatibility should make migrating from any of these to `ulog` very easy. And because this is just the `anylogger` API, you should even be able to migrate back to `debug` or `loglevel` without any changes at all, by just including the right adapter in your entry point. Of course once you get used to `ulog`, you will never want to go back! :p


## Configure

`ulog` features a simple, yet powerful and flexible configuration mechanism. On Node JS, we can configure `ulog` via program arguments, environment variables or a configuration file. On browsers, we use querystring arguments or localStorage. On both platforms, the configuration is monitored and changes to it are picked up by `ulog` at runtime without the need to restart the application.

`ulog`'s configuration mechanism is an extension to that of [`debug`](https://npmjs.com/package/debug) and is compatible with it. `debug` is one of the most popular logging packages in the NPM ecosystem, with tens of thousands of packages depending on it, so having `ulog`'s configuration mechanism be compatible with it makes for a very smooth migration path. If your app or library is currently using `debug`, you should be able to replace it with `ulog` with no or only minor changes.

We configure `ulog` by adjusting configuration options. Those options include (but are not limited to):
* [`log`](#config_option_log): The main setting to control logger's levels with
* [`debug`](#config_option_debug): For compatibility with `debug`
* [`log_config`](#config_option_log_config): To specify the configuration file (Node JS only)
* [`log_output`](#config_option_log_output): To configure where logging should go (defaults to `console`)
* [`log_drain`](#config_option_log_drain): To configure where logs should drain (defaults to `drain`)
* [`log_format`](#config_option_log_format): To configure the format for log messages

### Via program arguments
On Node JS we can pass log configuration options as program arguments:
```sh
node ./myapp log=debug
```
This should be helpful when making CLI applications. These strongly rely on console messages, but are also often used in scripted setups where we would actually want to suppress that logging. Don't go and build in all kinds of custom methods to configure the logging but just use `ulog` and rely on it's powerful configuration mechanism instead.

### Via environment variables
On Node JS we can pass log configuration options via environment variables:
```sh
log=debug node ./myapp
```

### Via a config file
On Node JS we can place our log configuration in a file that will be read at startup and monitored for changes at runtime:
*./log.config*
```
log=debug
```

### Via querystring parameters
In browsers, we can pass log configuration options as querystring parameters in the URL:
```
https://example.com/page?log=debug
```

### Via localStorage
In browsers, we can place our log configuration in localStorage and it will be read at startup and monitored for changes at runtime:
```js
localStorage.setItem('log', 'debug')
```

### Log configuration syntax
`debug` has a simple but powerful configuration mechanism. You set an environment variable or localStorage option named `DEBUG` and you assign it a value that expresses which loggers to enable. E.g.:

```sh
DEBUG=test,my:*,-my:lib
```
The format is basically a comma-separated list of logger names, using the asterisk as a wildcard character and optionally negating the expression by preceding it with a minus sign. So the expression above includes `test` and `my:*` loggers, except for `my:lib` which is excluded.

`ulog` extends this configuration mechanism. With `debug`, you can only turn loggers on and off, but `ulog` allows for a much more varied range of options. This is achieved by extending the configuration syntax so it also accepts the value applicable for the loggers matching the expression. Also we allow a semicolon-separated list of such expression=value pairs. For example, to set the logger `test` to debug and `my:*` loggers except for `my:lib` to info, we could write:

```sh
log=test=debug;my:*,-my:lib=info
```

If an option only contains a value, `ulog` implicitly adds `*` as the expression. So we can write:
```sh
log=info
```
and it's equivalent to
```sh
log=*=info
```
We can even combine this. So we could write:
```sh
log=info;my:*=debug
```
and it will set the level for all loggers to info, except for the ones starting with `my:`, which are set to debug.

A special case is the config option [debug](#config_option_debug), which is designed to be compatible with `debug` so code using `ulog` will react to that setting in the same way.


### Config option `log`
Configure the levels loggers should be filtered at.
```sh
log=test=debug;my:*,-my:lib=info
```

### Config option `debug`
Enables debug mode for the selected loggers.
```sh
debug=test,my:*,-my:lib
```
This option is compatible with that of `debug`.

### Config option `log_config`
Specify the path to the log configuration file, absolute or relative to the current working directory. Node JS only. Default to `./log.config`. This option does not support expressions.
```sh
log_config=./my.log.config
```

### Config option `log_output`
Specify the name of the output logs should be written to. Defaults to `'console'`.
```sh
log_output=my:*,-my:lib=console
```

### Config option `log_drain`
Specify the name of the output logs should be drained to. Defaults to `drain`.
When log messages are filtered out, they are sent to the drain instead of to the normal output. The default `drain` output is just a noop, but you could override this to send them to a separate file for example.
```sh
log_drain=my:*,-my:lib=console
```

### Config option `log_format`
Specify the named format to use, or a custom format string. Defaults to `simple`.
```sh
log_format=simple;some-lib=none;my:*,-my:lib={date}{time}{lvl}{name}{message}{perf}
```
This sets `simple` as the default format, while assigning `none` to `some-lib` and a custom format string to all loggers starting with `my:` except for `my:lib`.

For more details, refer to the [section on formatting](#formatting)


## Logging levels

`anylogger` defines 6 logging levels, which correspond with the natively available
logging functions on the console. `ulog` creates constants for these levels on all loggers:

```js
log.ERROR // 1
log.WARN  // 2
log.INFO  // 3
log.LOG   // 4
log.DEBUG // 5
log.TRACE // 6
```

In addition, `ulog` adds constants for pseudo-levels that enable or completely disable all logging:

```js
log.ALL   // 9007199254740991 (Number.MAX_SAFE_INTEGER)
log.NONE  // 0
```

### `log.enabledFor`
`anylogger` defines `log.enabledFor` and `ulog` implements it by checking the logger's current log level and whether it's in debug mode. Normally, you should not have to use this method, unless you are doing some expensive calculations only to write log output. In such a case you can write:

```js
import anylogger from 'anylogger'
const log = anylogger('my-app')
if (log.enabledFor('info')) {
  log.info(calculateResults())
}
```

### `log.level`
`ulog` adds a property `level` to each logger that is a numeric representation of the current log level.

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

> In general, code should not set the log level directly, but instead should rely on the host environment for the log level. See the section on [configuring ulog](#configure).

### Default log level
I've found that it makes sense to have different default log levels in the
browser and in Node. In Node, logging is often the only UI we have available
and we (the devs/admins) are the only ones that will see that logging.
In the browser, we have an alternative UI (the webpage itself), so
logging will be less useful for normal users.

#### In Node
In Node, the log level defaults to `info`. This allows you to use
`info`, `warn` and `error` when informing the user of stuff that happened.

#### In the browser
In the browser the log level defaults to `warn`. This means `info`
messages will be excluded, but for most users these messages won't be
relevant anyway.

> Attention! Chrome these days has it's own level filter and by default, debug messages are filtered away.


## Debug mode

Debug mode is a feature that `ulog` copied from `debug` and it responds to the
same [config option](#config_option_debug). Setting a logger to debug mode
effectively means forcing it's log level to be at least debug:

```sh
DEBUG=my:app
```

```js
import anylogger from 'anylogger'
const log = anylogger('my-app')
log('Hi!') // is output because logger is in debug mode
```

## Outputs

Outputs is a feature that separates `ulog` from `debug` and `loglevel`. This corresponds with what other libraries sometimes refer to as 'appenders'. In `ulog`, where messages are going is completely configurable at runtime. You can even configure where discarded messages are going!

By default, all log methods on a logger are associated with one of two outputs, `output` and `drain`. To configure these, two properties are added on each logger:

* `log.output`, defaults to `'console'`
* `log.drain`, defaults to `'drain'`

These correspond with config options [`log_output`](#config_option_log_output) and [`log_drain`](#config_option_log_drain) respectively.

By using a separate output for the drain, we can override the default behavior of using noops for all log levels that are outside of the active levels. We could for example send *all* logging to a database and only later filter it, when we display it for example.

When the logger is created, each log method is sent either to the `output`, or to the `drain`, based on the current log level for that logger and whether that logger is in debug mode.

To configure the output for a logger, we assign the name of the output to use
to the relevant logger:

```sh
log_output=console
```

By default, the following outputs are included:

### Output `console`
This actually is the native console object. Using the native console directly is what allows us to leave the call stack intact in the browser developer tools.

### Output `drain`
This is just an object with a noop `log` function

### Custom outputs
The default outputs are not very special, but the entire machinery is in place for you to easily add any custom outputs you could ever need. You can define additional outputs by making `ulog` use a mod with an `outputs` key:

*index.js*
```js
import ulog from 'ulog'
ulog.use({
  outputs: {
    custom: { log: function(){
      var args = [].slice.call(arguments)
      args.shift('Custom!!')
      console.log.apply(console, args)
    }}
  }
})
```

This way you can add outputs that send log messages to memory, a file, localStorage, a database etc etc.


## Formatting

Formatting is another feature that separates `ulog` from `debug` and `loglevel`. `debug` has formatting, but it is hardcoded and messes up the call stack and there is not much you can do about it. `loglevel` does not mess up the call stack, but it also has no formatting at all out of the box. If we are giving all loggers names, it would at least be good to see those names in the log output right? How else do we know which loggers to enable and disable?

Turns out you can have the cake and eat it to. We can have formatted messages that do not mess up the call stack. The way we do it is by `bind`ing the extra information into the log methods at logger creation/extension time. Granted, you cannot do this with dynamic info that changes on every call, but the logger name is static for each log method so we can add this without disrupting the call stack.

Below is a list of formats that come bundled with `ulog` and it is mentioned for each of them whether it leaves the call stack intact.

### Format `none`
This is a noop format that does not do anything. Leaves the call stack intact.

### Format `simple`
Adds the logger name (and level on Node JS) into the log methods. Leaves the call stack intact.

Output looks like this on Node JS:

```
i my:logger           This is an INFO message
```

and like this in browsers:

```
my:logger           This is an INFO message
```

> Most browsers already do an excellent job in showing the level a message was logged at, so here we don't add the level indicator.

### Format `json`
Logs messages as JSON strings. Messes up the call stack.

Sometimes we prefer that all data is logged in some structured format. `json` is an example of how to do that.

Output looks like this:

```
{"time":"2020-11-14T14:42:29.839Z","name":"my:logger","message":["This is a WARN message"],"level":2,"levelName":"warn","log_output":"console","log_drain":"drain","log_level":5,"log_format":"json"}
```

### Make your own custom format
You can easily add your own custom format to the list above. To do so, just `ulog.use` a mod with a `formats` property including your format, like so:

*index.js*
```js
import ulog from 'ulog'
import formats from 'ulog/mods/formats'

ulog.use({
  use: [ formats ],
  formats: {
    cool: function(logger) {
      // will be called on logger creation/extension
      // replace the default log methods with formatters
      // use bind so we leave the call stack intact.
      // only works for static info like our 'Cool!' message
      for (var level in this.levels) logger[level] = logger[level].bind(logger, 'Cool!')
      // don't forget to format the method to discard to the drain as well!
      logger.discard = logger.discard.bind(logger, 'Cool!')
    }
  }
})
```

### Custom format strings using kurly
To keep the base bundle size down, `ulog` only bundles the formats above in the default build. But you can very easily make `ulog` understand custom format strings. For example you could set:

```sh
log_format={date}{time}{lvl}{name}{message}{perf}
```
To get log output looking like this:

```
2020/10/14 15:46 i my:logger           This is an INFO message
```

To support this, we need to include the mod `kurly`, which uses the template engine [`kurly`](https://npmjs.com/package/kurly) behind the surface to parse the custom format string. In our entry point, change this:

*index.js*
```js
import ulog
```

to

*index.js*
```js
  import ulog from 'ulog'
  import kurly from 'ulog/mods/kurly'
  ulog.use(kurly)
```

or, use the `ulog/full` endpoint instead:

*index.js*
```js
import `ulog/full`
```

#### Kurly formatters
In the example above we were using tags like `{name}`, `{lvl}` etc.
The following is a list of such tags that are built in to the `kurly` mod:

##### Formatter `date`
Returns the date part of the time the message was logged as `yyyy/MM/dd`.

##### Formatter `time`
Returns the time part of the time the message was logged as `hh:mm`.

##### Formatter `lvl`
Returns the level of the message as a single character:
* `'x'` for error messages
* `'!'` for warning messages
* `'i'` for info messages
* `' '` (space) for log, debug and trace messages

##### Formatter `name`
Returns the name of the logger, right-padded with spaces for alignment.

##### Formatter `perf`
Returns the difference in ms between two invocations to the same logger, only if this difference is larger than 1ms. Produces output that looks like `+62ms`.

##### Fallback formatter
Any unrecognized tags are being interpreted by the fallback formatter. This just returns the field on the log record whose name matches. In the example above we were using `{message}`. This is an unrecognized tag so the wildcard formatter is used, which just returns the `message` field from the log record. To get an idea for what fields are available on the log record, use the [json](#format_json) format.


#### Custom kurly formatters

With custom kurly formatters we customize on a higher level of abstraction. Instead of replacing the entire format with a custom one, we write small functions that format just a part of the message, leaving the composition of the message as a whole to be configured with a custom format string. We can add custom `kurly` formatters in much the same way as we add custom formats:

*index.js*
```js
import ulog from 'ulog'
import kurly from 'ulog/mods/kurly'
ulog.use(kurly)
ulog.use({
  formatters: {
    custom: function(ctx) {
      return function(rec) {
        return 'Custom!'
      }
    }
  }
})
```

To read more about kurly and custom kurly tags, refer to the kurly documentation on [creating kurly tags](https://www.npmjs.com/package/kurly#creating-tags)



## Decoupling code from `debug`

As I said before, `debug` is excellent for debug logging and there are tens of thousands of packages using it. The downside of this is that you will more or less get `debug` shoved through your throat if you include any of these libraries because they are *tighly coupled* to it. But we can uncouple them with the magic of bundlers like Webpack.

To replace `debug` with `anylogger` everywhere, you can use this Webpack alias to make all modules that use `debug` switch to `anylogger` instead:

```js
{
    resolve: {
        alias: {
            'debug': 'anylogger'
        }
    }
}
```

This works because the anylogger API is backwards compatible with that of `debug`. And because `ulog` has native `anylogger` support, once you import `ulog` in your entry point, all those libraries that were using `debug` start to use `ulog` automagically!


## Performance considerations

By default, the logging methods on the `log` object that correspond to a log level
which is higher than the currently set level, are replaced by no-op methods. As such,
you generally don't have to worry about the performance overhead of leaving
the log statements in the production code. There is one exception to this rule
though. If preparing the message itself is a costly operation, you may want to
surround the log code with an `if (log.enabledFor(level))` statement:

```js
if (log.enabledFor('info')) {
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
* TJ Holowaychuk for creating [debug](https://npmjs.com/package/debug),
  which was a great inspiration for ulog.
* Tim Perry for creating [loglevel](https://npmjs.com/package/loglevel),
  which was another great inspiration for ulog.


## Copyright

Copyright 2020 by [Stijn de Witt](https://stijndewitt.com).


## License

Licensed under the [MIT](https://opensource.org/licenses/MIT) Open Source license.
