# ulog <sub><sup>v2.0.0-beta.14</sup></sub>
### The Universal Logger

[![npm](https://img.shields.io/npm/v/ulog.svg)](https://npmjs.com/package/ulog)
[![license](https://img.shields.io/npm/l/ulog.svg)](https://opensource.org/licenses/MIT)
[![travis](https://img.shields.io/travis/Download/ulog.svg)](https://travis-ci.org/Download/ulog)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

<sup><sub><sup><sub>.</sub></sup></sub></sup>

![logo](https://unpkg.com/ulog@2.0.0-beta.14/ulog.png)


## The logger for javascript applications

`ulog` is *the* logger for Javascript applications. It's universal, meaning it runs everywhere. You can use `ulog` in your Express server application running on Node JS just as well as in your React single page application running in the browser. It just works.

![screenshot](https://unpkg.com/ulog@2.0.0-beta.14/screenshot.jpg)


## Features

Ulog marries the feature sets from [`debug`](https://npmjs.com/package/debug) and [`loglevel`](https://npmjs.com/package/loglevel) and adds some of it's own!

| Feature                                     | &nbsp; debug &nbsp; |      loglevel       | &nbsp; ulog &nbsp; |
| ------------------------------------------- | ------------------- | ------------------- | ------------------ |
| [Footprint](#footprint)                     |        3.2kB        |        1.4kB        |        2.8kB       |
| [Debug mode](#debug-mode)                   |         ✓           |          ✓ (1)      |          ✓         |
| [Levels](#levels)                           |                     |          ✓          |          ✓         |
| [Configurable](#configure)                  |         ✓           |          ✓ (2)      |          ✓         |
| [Dynamic config](#dynamic-config)           |                     |                     |           ✓        |
| [Channels](#channels)                       |                     |                     |           ✓        |
| [Outputs](#outputs)                         |                     |                     |           ✓        |
| [Custom outputs](#custom-outputs)           |                     |                     |           ✓        |
| [Formatting](#formatting)                   |         ✓           |                     |           ✓        |
| [Preserves callstack](#preserves-callstack) |                     |          ✓          |           ✓        |
| [Configurable format](#configurable-format) |                     |                     |           ✓        |
| [Custom formats](#custom-formats)           |                     |                     |           ✓        |
| [Colors](#colors)                           |         ✓           |                     |           ✓        |
| [Alignment](#alignment)                     |                     |                     |           ✓        |
| [Add-ons / Mods](#mods)                     |                     |          ✓          |           ✓        |
| [Lazy loading](#lazy-loading)               |                     |                     |           ✓        |
| [Anylogger support](#anylogger-support)     |         ✓ (3)       |          ✓ (3)      |           ✓        |

(1) emulated with levels
(2) in browser only
(3) via an adapter



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

##### Anylogger support
> [`anylogger`](https://npmjs.com/package/anylogger) is a logging facade that
> allows code to use logging without getting coupled to a specific logging
> system. You can use that code with any logging system out there. `ulog` has
> anylogger support built in. For other loggers, adapters are available.


## The logger for libraries

When we write a library, we install `ulog` as a development dependency so the library remains decoupled from `ulog`.

### Install ulog as a dev dependency

Install `anylogger` as a regular dependency and `ulog` as a dev dependency:

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
<script src="https://unpkg.com/ulog@2.0.0-beta.14/ulog.min.js"></script>
<!-- publishes to `self.anylogger` and `self.ulog`. -->
<!-- lazy loads ulog.lazy.min.js on demand. -->
<script src="myscript.js"></script>
```
*myscript.js*
```js
var log = anylogger('my-module')
log('Logging is easy!')
```

## Download

If you want the file for the browser to include in your project yourself, you
can download it from here.

* [ulog.min.js](https://unpkg.com/ulog@2.0.0-beta.14/ulog.min.js) (~2.8kB minified and gzipped)
* [ulog.lazy.min.js](https://unpkg.com/ulog@2.0.0-beta.14/ulog.lazy.min.js) (~4.3kB minified and gzipped)

> `ulog.min.js` lazy loads `ulog.lazy.min.js` on demand, so make sure to include both files in your download

* [full.min.js](https://unpkg.com/ulog@2.0.0-beta.14/full.min.js) (~5.7kB minified and gzipped)

> Full bundle, no lazy loading

I recommend to use a bundler instead. Loading lots of script tags is
inefficient and hard to manage. Also see the section on
[lazy loading with webpack](#lazy-loading-with-webpack)


## Why `ulog`

The two most popular logging libraries on NPM at the moment are [`debug`](https://npmjs.com/package/debug) and [`loglevel`](https://npmjs.com/package/loglevel). They are both great loggers, but neither of them completely satisfied my requirements for a logging library.

`debug` allows for namespaced debug logging, where each logger has a name. Whether these loggers output debug logging is configurable, though not dynamic, requiring a restart before changes take effect. It's simplicity makes `debug` an excellent choice for debug logging (as it's name implies), but it lacks support for log levels, so if you want to log error messages for example, you end up needing another library for that. It offers nicely formatted (and even colored!) log messages, but because of that mangles the call stack, which is a huge downside in the browser imho. It's not very extensible, basically being a monolith.

`loglevel` also supports namespaced logging and it does offer log levels. It's configurable via localStorage but not via environment variables and just like `debug` requires a restart before configuration changes take effect. By default, it leaves your call stack alone, making the filename/line number entries in the browser console that much more useful. It does not offer alternative log destinations or formatters out of the box. It can be extended via plugins and there are some good plugins out there, but it's base feature set is coded as a monolith, so you cannot easily remove features. You probably won't have to though as it weighs only 1.4kB.

Both these loggers lack the ability to configure the logger from the querystring, which I found to be a very desirable feature for web development as it allows you to create a URL that has the log config embedded, which you can then send to other developers or users etc. E.g: `https://example.com/page?log=debug`.

What I want is a logging library that combines the best aspects of both these loggers and adds the features that I miss in both.
`ulog` is my attempt at building this library. It's base API is compatible with that of `debug` and `loglevel` and with the console, making it a drop-in replacement for all of these in many cases. It has a configuration mechanism that is compatible with that of `debug`, but that is more powerful and is monitored for changes at runtime. It accepts configuration from the querystring allowing you to craft URLs with log config embedded in it. It has powerful, configurable formatting included by default and it does this without mangling the call stack, so the filename/line number entries in the browser console remain unharmed. You can specify where the log output should go and where it should drain. It's completely modular, so you can not only easily add features through 'mods', but you can actually even drop features you don't need by not loading the mods those features are in. It has native `anylogger` support, decoupling the client code from the logger. And it supports lazy loading so we can get all those great features without bloating our bundle.

I hope you will give `ulog` a try. If you have feedback on it, or found an issue, please let me know on the [issue tracker](https://github.com/download/ulog/issues).


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


## Levels

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
log.ALL   // 7
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

> To check the log level, `enabledFor` is preferred over the `level` property as it is within the `anylogger` API.


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

> Attention! Chromium-based browsers have their own level filter and by default, debug messages are filtered away.


## Footprint

When we support logging with some logging library, we add code to our
application that many users don't actually need. There are techniques to remove
this code from our production builds, but they sacrifice logging with it. In
many scenarios we actually do want logging in the production builds. To assist
support personel in diagnosing user problems for example. So it's beneficial if
the minimum amount of code we need to load to support logging is small. This
minimum amount of code we call the *footprint*. `ulog` keeps its footprint
small by utilizing [lazy loading](#lazy-loading).


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

## Channels

In `ulog`, logging is always sent to exactly one channel. By default,
two channels exist: `output`, for messages of loggers that are in
debug mode, or that are at an enabled level, and `drain`, for those
messages that are filtered away.

By using a separate channel for the drain, we can override the default behavior
of using noops for all log levels that are outside of the active levels. We
could for example send *all* logging to a database and only later filter it,
when we display it for example.

A channel has one or more configurable [outputs](#outputs) that can optionally
apply [formatting](#formatting) to the message.


## Outputs

In `ulog`, where messages are going is completely configurable at runtime.
You can even configure where discarded messages are going.

By default all log methods on a logger are associated with one of two channels,
`output` and `drain`. To configure the outputs for these channels, two
config options are available:

* [config option `log_output`](#config-option-log_output), defaults to `'console'`
* [config option `log_drain`](#config-option-log_drain), defaults to `'drain'`

When the logger is created, each log method is sent either to the `output`
channel, or to the `drain` channel, based on the current log level for that
logger and whether that logger is in debug mode.

To configure the output for a logger, we assign the name of the output to use
to the relevant logger:

```sh
log_output=console
```

This setting can include expressions to target individual loggers, just like
the `debug` and `log` settings:

```sh
log_output=console;noisy-lib:*=noop
```

The value part is actually a kurly format string. The same syntax can be used
here as for [configuring formatting](#configuring-formatting). If more than
one output is specified, a multiplex function will be inserted that dispatches
the logging to all specified outputs.

By default, the following outputs are included:

### Output `console`
This actually is the native console object. Using the native console directly is
what allows us to leave the call stack intact in the browser developer tools.

### Output `noop`
This is just an object with a noop `log` function

### Custom outputs
The default outputs are not very special, but the entire machinery is in place for
you to easily add any custom outputs you could ever need. You can define additional
outputs by making `ulog` use a mod with an `outputs` key:

*index.js*
```js
import ulog from 'ulog'
ulog.use({
  outputs: {
    custom: {
      log: function(){
        var args = [].slice.call(arguments)
        args.shift('Custom!!')
        console.log.apply(console, args)
      },
      info: function(){
        var args = [].slice.call(arguments)
        args.shift('Custom!!')
        console.info.apply(console, args)
      }
    }
  }
})
```

An output can either be an object with `log`, `info`, `warn` etc methods as shown
above, or a [kurly](https://npmjs.com/package/kurly) tag:

*index.js*
```js
import ulog from 'ulog'
ulog.use({
  outputs: {
    custom: function(ctx){
      return function(rec) {
        rec.message.shift('Custom!!')
        console[rec.level].apply(console, rec.message)
      }
    }}
  }
})
```

This way you can add outputs that send log messages to memory, a file, localStorage, a database etc etc.


## Formatting

Formatting is another feature that separates `ulog` from `debug` and
`loglevel`. `debug` has formatting, but it is hardcoded and messes up the
callstack and there is not much you can do about it. `loglevel` does not mess
up the callstack, but it also has no formatting at all out of the box.

Ulog uses [kurly](https://npmjs.com/package/kurly) to support advanced,
configurable and customizable formatting, [without mangling the callstack](#preserves-callstack).

### Configurable format

The actual format used is configurable easily via `ulog`'s powerful
configuration mechanism.

The default format string on Node is:

```sh
lvl name:22 message perf
```

This makes the output closely match that of debug. It sacrifices the callstack
for a colored and formatted `message` and having the `perf` measurements after
the message i.s.o before it.

On browsers, we want to spare the call stack, so there the default is:

```sh
lvl name perf
```

We don't include the `message`, but it will be appended as the last argument
automatically. The result is nicely formatted messages with the filename/line
number entries in the browser debug console intact.

To override the default format, just set
[config option `log_format`](#config-option-log_format) to the format you want.

Formats available out of the box include:

* [x] [Format `date`](#format-date)
* [x] [Format `lvl`](#format-lvl)
* [x] [Format `message`](#format-message)
* [x] [Format `name`](#format-name)
* [x] [Format `perf`](#format-perf)
* [x] [Format `time`](#format-time)
* [x] [Fallback format](#fallback-format)


### Format syntax

`ulog` uses the new [options](https://www.npmjs.com/package/kurly/v/2.0.0-beta.2#options)
in `kurly` v2 to make tag open/close markers optional and enable nicer looking format
strings. This means that `lvl name perf` and `{lvl} {name} {perf}` are
equivalent. When using no open/close markers, any non-identifier symbols
following the tag name are considered nested text. For example for the format
string `name:22`, the `name` format will receive `':22'` as `ctx.text`. This
allows for parameterized formats, as `ulog` has done to support
[padding options](#padding-options).

### Preserves callstack

`ulog`'s formatting system has the unique <sup>(1)</sup> ability to do
formatting while [preserving the callstack](#preserves-callstack). As long as
only [static kurly tags](https://www.npmjs.com/package/kurly/v/2.0.0-beta.2#static-tags)
are used as formats, the call stack can remain unharmed.

> <sup>(1)</sup> I do not know of any other logger out there that has this feature, but if
> you do know one, please let me know in the
> [issue tracker](https://github.com/download/ulog/issues)

### Included formats

Except for the `message` format, all included formats are static.

#### Format `date`
Returns the date part of the time the message was logged as `yyyy/MM/dd`.
Prints the date the message was logged

#### Format `lvl`
Returns the level of the message as a single character:
* `'x'` for error messages
* `'!'` for warning messages
* `'i'` for info messages
* `'-'` for log messages
* `'>'` for debug messages
* `'}'` for trace messages

#### Format `message`
Prints the message, formatted and colored.
Using this format breaks the callstack as it is dynamic.

#### Format `name`
Prints the current logger name

#### Format `perf`
Prints the time difference between two invocations to the same logger, only if this difference is larger than 1ms. Produces output that looks like `+62ms`.

#### Format `time`
Returns the time part of the time the message was logged as `hh:mm`.
Prints the time the message was logged

#### Fallback format
Any unrecognized tags are being interpreted by the fallback format. This just
returns the field on the log record whose name matches. For example suppose
we'd write `level`. This is an unrecognized tag so the wildcard formatter is
used, which just returns the `level` field from the log record. If no field
on the log record matches, it returns the original text unchanged, making
`'Hello World!'` a valid format string.

#### Padding options
All included formats support some padding options. For example, to pad out the
logger names to 16 characters and align the text on the left, use `name<16` or
`name:16`. To align the text on the right, use `name>16`.

### Custom formats

`ulog`'s formatting system is easily extendable by adding
[kurly tags](https://www.npmjs.com/package/kurly#tags) to a key `formats`
under a mod:

```js
import ulog from 'ulog'
import formats from 'ulog/mods/formats'
ulog.use({
  use: [ formats ],
  formats: {
    custom: (ctx) => (rec) => (['custom'].concat(rec.message)),
    random: (ctx, rec) => () => Math.random()
  }
})
```

These tags then become available in the format string.

> We used two different signatures here, because there are two types of formats.

### Types of formats

Formats come in two flavors:

#### Dynamic formats

Dynamic formats have full access to the message. But they do mess up the call stack. A dynamic format has this signature:

```js
ulog.use({
  use: [ require('ulog/mods/formats') ],
  format: {
    dynamicFormat: function(ctx) {
      // one-time init here
      return function(rec) {
        // rec.message contains full message
        return /* ... */
      }
    }
  }
})
```

#### Static formats

Static formats do not have access to the message. But they do not break the call stack! So prefer static formats if possible.

Static formats have this signature:

```js
ulog.use({
  use: [ require('ulog/mods/formats') ],
  format: {
    staticFormat: function(ctx, rec) {
      // one-time init here
      return function(){
        // rec.message is undefined
        // rec.name, rec.level etc is populated
        return /* ... */
      }
    }
  }
})
```

To read more about kurly and custom kurly tags, refer to the kurly documentation on [creating kurly tags](https://www.npmjs.com/package/kurly#creating-tags)

## Colors
Who doesn't like some colors?! Apart from making things prettier, when used
correctly they can actually also make our logs *easier* to read. Now I don't
know about you, but I find reading logs hard, so I'll take all the help I can
get!

If you don't want colors, you can suppress them using
[config option `log_color`](#config-option-log_color).


## Alignment
Browsers have great debug consoles these days. They even include stacktrace
info for higher-level messages. But they did mess one thing up imho; the
messages at these higher levels are indented a bit more than the other
messages, making the logging harder to read. This can be clearly seen in the
screenshot from `ulog` v2.0.0-beta-11, which did not yet have alignment:

![screenshot](https://unpkg.com/ulog@2.0.0-beta.14/screenshot-beta.11.jpg)

`ulog` now automatically adds some formatting that negates the extra indentation
the messages at these higher levels get, so all messages are nicely aligned:

![screenshot](https://unpkg.com/ulog@2.0.0-beta.14/screenshot.jpg)

You can control alignment with [config option `log_align`](#config-option-log_align).


## Configure

`ulog` features a simple, yet powerful and flexible configuration mechanism. On
Node JS, we can configure `ulog` via program arguments, environment variables
or a configuration file. On browsers, we use querystring arguments or
localStorage. On both platforms, the configuration is monitored and changes to
it are picked up by `ulog` at runtime without the need to restart the
application.

`ulog`'s configuration mechanism is an extension to that of
[`debug`](https://npmjs.com/package/debug) and is compatible with it. `debug`
is one of the most popular logging packages in the NPM ecosystem, with tens of
thousands of packages depending on it, so having `ulog`'s configuration
mechanism be compatible with it makes for a very smooth migration path. If your
app or library is currently using `debug`, you should be able to replace it
with `ulog` with no or only minor changes.

We configure `ulog` by adjusting configuration options.

* [`log`](#config_option_log): The main setting to control logger's levels with
* [`debug`](#config_option_debug): For compatibility with `debug`
* [`log_config`](#config_option_log_config): To specify the configuration file (Node JS only)
* [`log_output`](#config_option_log_output): To configure where logging should go
* [`log_drain`](#config_option_log_drain): To configure where logs should drain
* [`log_format`](#config_option_log_format): To configure the format for log messages
* [`log_color`](#config_option_log_color): To enable or disable colors
* [`log_align`](#config_option_log_align): To enable or disable alignment

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

Most of the config options support this syntax.


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

### Dynamic config
`ulog`'s configuration mechanism watches the configuration for changes while
the program is running and reacts to them in real-time. No more restarting your
application just to change some log level! On Node JS, `ulog` watches a
configuration file. Use
[Config option `log_format`](#config-option-log_format) to specify the
location. In browsers, `ulog` monitors `localStorage` for changes.


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

Specify the name of the output logs should be drained to. Defaults to `noop`.
When log messages are filtered out, they are sent to the drain instead of to the normal output. The default `noop` output is just a noop, but you could override this to send them to a separate file for example.

```sh
log_drain=my:*,-my:lib=noop
```

### Config option `log_format`

Specify the format to use. Defaults to `lvl name:22 message perf` on Node JS and `lvl name perf` on browsers.

```sh
log_format=lvl name perf message;my:*=lvl name perf
```
This sets `lvl name perf message` as the default format, while assigning a different format string to all loggers starting with `my:`.

For more details, refer to the [section on formatting](#formatting)


### Config option `log_color`

Specify whether colors should be enabled. Defaults to `on`.

```sh
log_color=off
```

### Config option `log_align`

Specify whether messages should be aligned. Defaults to `on`.

```sh
log_align=off
```

## Mods

`ulog` is completely modular, consisting of a microscopically small core and a
whole bunch of mods. The mods are small pieces of functionality, designed to
be usable stand-alone or in combination with each other. All functionality that
`ulog` adds to `anylogger`, it adds in the form of mods. All, except for the
ability to add mods itself, in the form of method `ulog.use`, that is in core.

To add a mod, call `ulog.use` with either an individual mod

```js
ulog.use({
  // an empty mod
})
```

or with an array of mods:

```js
ulog.use([
  { /* a mod */ },
  { /* another mod */ },
])
```

A mod is an object that can define many things declaratively:

* That it extends some core functionality
* That it uses other mods
* That it adds settings
* That it adds properties to loggers
* That it adds outputs / formats / other components
* That it watches some config option

As an example, here is a mod that does most of these things:

```js
var boolean = require('ulog/mods/props/boolean')

ulog.use({
  use: [ require('./some/mod/we/use') ],
  extend: { someProp: 'addedToUlog' },
  settings: {
    cool: {
      config: 'log_cool'
      prop: boolean(),
    }
  },
  outputs: {
    file: {
      log: function(){
        console.info.apply(console, ['file'].concat([].slice.call(arguments)))
      }
    }
  },
  formats: {
    random: function(ctx, rec){
      return function(){
        return Math.random()
      }
    }
  },
  watch: {
    'debug': function(){
      console.info('debug setting changed')
    }
  }
})
```

Interestingly, most of these features of mods are being added by mods. For
example the ability to add settings is added by the `settings` mod. Studying
the way `ulog`'s featureset is built from mods by reading the source code of
the included mods is the best way to learn about writing mods for now.


## Lazy loading

`ulog` being built with mods makes it easy to use lazy loading to reduce the
minimum [footprint](#footprint). If you use ulog from a [script tag](#script-tag)
(not recommended), you can get it for free. Otherwise, you have to configure
your bundler to code-split.

### Lazy-loading with Webpack

Have a look at [ulog.bundle.js](https://github.com/Download/ulog/blob/master/ulog.bundle.js)
for an example of doing lazy loading with [Webpack](https://webpack.js.org/).

Basically it only loads `ulog/base` and then configures a watch that loads the
remaining mods on-demand. It's using Webpack-specific API `require.ensure` for
this. Other bundlers support it in similar ways.

```js
var ulog = require('ulog/base')

// add a mod to ulog to load logging on-demand
ulog.use({

  watch: {
    // watch for changes in these config keys
    'debug,log,log_output,log_format,log_color,log_align':

    // when changes happen, load the other mods if needed
    function(){
      var ulog = this
      // webpack specific API to lazy load modules
      require.ensure(
        // ensure these modules are loaded
        [
          'ulog/mods/debug',
          'ulog/mods/levels',
          'ulog/mods/outputs',
          'ulog/mods/formats',
          'ulog/mods/colors',
          'ulog/mods/align',
        ],
        // then execute this function, notice require being overridden
        function(require){
          // add the mods to ulog
          if (ulog.use([
            // use the overridden require to lazy load the modules
            require('ulog/mods/debug'),
            require('ulog/mods/levels'),
            require('ulog/mods/outputs'),
            require('ulog/mods/formats'),
            require('ulog/mods/colors'),
            require('ulog/mods/align'),
          ])) {
            // re-initialize the loggers if mods were added
            ulog.ext()
          }
        },
        // chunkname webpack will use for these lazy modules: ulog.lazy.min.js
        'ulog.lazy'
      )
    },
  }
})
```

If you have successfully lazy-loaded `ulog` with other bundlers, please drop a
comment in the [issue tracker](https://github.com/ulog/issues), or create a
PR to add a section about it here in the README.


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
* Community members [Jakub Jirutka](https://github.com/jirutka) and
  [Alex Kesling](https://github.com/akesling) for making code contributions.


## Copyright

Copyright 2021 by [Stijn de Witt](https://stijndewitt.com).


## License

Licensed under the [MIT](https://opensource.org/licenses/MIT) Open Source license.
