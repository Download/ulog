# ulog <sub><sup>v2.0.0-beta.20</sup></sub>
### The Universal Logger

[![npm](https://img.shields.io/npm/v/ulog.svg)](https://npmjs.com/package/ulog)
[![license](https://img.shields.io/npm/l/ulog.svg)](https://opensource.org/licenses/MIT)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

<sup><sub><sup><sub>.</sub></sup></sub></sup>

![logo](https://unpkg.com/ulog@2.0.0-beta.20/ulog.png)


## The logger for javascript applications

`ulog` is *the* logger for Javascript applications. It's universal, meaning it
runs everywhere. You can use `ulog` in your Express server application running
on Node JS just as well as in your React single page application running in the
browser. It just works.

![screenshot](https://unpkg.com/ulog@2.0.0-beta.20/screenshot.jpg)


## Features

Ulog marries the feature sets from [`debug`](https://npmjs.com/package/debug)
and [`loglevel`](https://npmjs.com/package/loglevel) and adds some of it's own!

| Feature                                     |  debug  | loglevel |   ulog  |
| ------------------------------------------- | ------- | -------- | ------- |
| [Footprint](#footprint)                     |  3.2 kB |  1.4 kB  |  2.7 kB |
| [Debug mode](#debug-mode)                   |   ✓     |   ✓ (1)  |    ✓    |
| [Levels](#levels)                           |         |   ✓      |    ✓    |
| [Configurable](#configure)                  |   ✓     |   ✓ (2)  |    ✓    |
| [Outputs](#outputs)                         |         |          |    ✓    |
| [Custom outputs](#custom-outputs)           |         |          |    ✓    |
| [Formatting](#formatting)                   |   ✓     |          |    ✓    |
| [Preserves callstack](#preserves-callstack) |         |   ✓      |    ✓    |
| [Configurable format](#configurable-format) |         |          |    ✓    |
| [Custom formats](#custom-formats)           |         |          |    ✓    |
| [Colors](#colors)                           |   ✓     |          |    ✓    |
| [Alignment](#alignment)                     |         |          |    ✓    |
| [Add-ons / Mods](#mods)                     |         |   ✓      |    ✓    |
| [Lazy loading](#lazy-loading)               |         |          |    ✓    |
| [Anylogger support](#anylogger-support)     |   ✓ (3) |   ✓ (3)  |    ✓    |

1. emulated with levels
2. in browser only
3. via an adapter

## Try it

Have a look at the interactive
<a href="https://ulog.js.org/tutorial/index.html">tutorial</a>. It's the
fastest way to get a quick taste of `ulog`.


## Install

In application projects, use:

```sh
npm i -S anylogger ulog
```

For libraries, see the instructions [for libraries](#the-logger-for-libraries).

### Add to entry point
In the entry point of your application import `anylogger` and `ulog` and use
the *adapter* to make sure anylogger is using `ulog`:

*index.js*
```js
import adapter from 'ulog/adapter'
import anylogger from 'anylogger'
import ulog from 'ulog'
adapter(anylogger, ulog)
```

> You only need to do this in the entry point of your application

## Use

In your code, import `anylogger` and use it to create loggers and do logging:

```js
import anylogger from 'anylogger'
const log = anylogger('my-app')
log('Logging is easy!')
```

This way, your code is decoupled from `ulog` and if you ever want to switch to
another logging library, you will be able to do so without having to change any
of that code.

##### Anylogger support
> [`anylogger`](https://npmjs.com/package/anylogger) is a logging facade that
> allows code to use logging without getting coupled to a specific logging
> system. You can use that code with any logging system out there. `ulog` has
> anylogger support built in. For other loggers, adapters are available.


## The logger for libraries

`ulog` is *the* logger for libraries!

If you are building a library to be published on NPM, you should use only the
`anylogger` API, making sure your library will work with the most popular
logging libraries out there.

You then install `ulog` as a development dependency so your library remains
*decoupled* from `ulog`. This way you get `ulog`s features, without forcing
the client of your library to use it.

### Install ulog as a dev dependency

Install `anylogger` and `ulog` as dev dependencies:

```sh
npm install --save-dev anylogger ulog
```

Add `anylogger` to `peerDependencies`:

```json
  "peerDependencies": {
    "anylogger": "1.x || >=1.1.0-beta || >=1.2.0-beta || >=1.3.0-beta || >=1.4.0-beta || >=1.5.0-beta || >=1.6.0-beta || >=1.7.0-beta || >=1.8.0-beta || >=1.9.0-beta"
  },
```

> Listing the betas makes your library compatible with any future beta releases
> of anylogger as well. This is a quirk in how NPM handles beta ranges. If you
> don't like the long list, you can just use `"1.x"`

By adding `anylogger` as a peer dependency, you ensure that it will be
installed in the client project and that your library will use the anylogger
that comes with the project in stead of bundling it with your library.

In our tests:

*test.js*
```js
import adapter from 'ulog/adapter'
import anylogger from 'anylogger'
import ulog from `ulog`
adapter(anylogger, ulog)
// ..
const log = anylogger('my:logger')
log.info('Ulog is easy!')
```

In our library code:

*my-lib.js*
```js
import anylogger
const log = anylogger('my-lib')
log('Logging is easy')
```

Note how in the library code we never import `ulog`, thus remaining decoupled.


## Script tag

If you want, you can import `ulog` with a script tag:

```html
<script src="https://unpkg.com/anylogger@1.1.0-beta.5/anylogger.min.js"></script>
<script src="https://unpkg.com/ulog@2.0.0-beta.20/ulog.min.js"></script>
<!-- any other scripts using anylogger will also start to use ulog :) -->
<script src="myscript.js"></script>
```
*myscript.js*
```js
var log = anylogger('my-module')
log('Logging is easy!')
```

## Download

If you want the minified file for the browser to include in your project
yourself, you can download it from here.

* [ulog.min.js](https://unpkg.com/ulog@2.0.0-beta.20/ulog.min.js)
  (~1.8kB minified and gzipped)
* [ulog.lazy.min.js](https://unpkg.com/ulog@2.0.0-beta.20/ulog.lazy.min.js)
  (~4.1kB minified and gzipped)

> `ulog.min.js` lazy loads `ulog.lazy.min.js` on demand, so make sure to
> include both files in your download

* [full.min.js](https://unpkg.com/ulog@2.0.0-beta.20/full.min.js)
  (~4.0kB minified and gzipped)

> Full bundle, no lazy loading

I recommend to use a bundler instead. Loading lots of script tags is
inefficient and hard to manage. Also see the section on
[lazy loading with webpack](#lazy-loading-with-webpack)


## Why `ulog`

The two most popular logging libraries on NPM at the moment are [`debug`](https://npmjs.com/package/debug) and [`loglevel`](https://npmjs.com/package/loglevel). They are both great loggers, but neither of them completely satisfied my requirements for a logging library.

`debug` allows for namespaced debug logging, where each logger has a name.
Whether these loggers output debug logging is configurable via an environment
variable. It's simplicity makes `debug` an excellent choice for debug logging
(as it's name implies), but it lacks support for log levels, so if you want to
log error messages for example, you end up needing another library for that. It
offers nicely formatted (and even colored!) log messages, but because of that
mangles the call stack, which is a huge downside in the browser imho. It's not
very extensible, basically being a monolith.

`loglevel` also supports namespaced logging and it does offer log levels. It's
configurable via localStorage but not via environment variables. By default, it
leaves your call stack alone, making the filename/line number entries in the
browser console that much more useful. It does not offer alternative log
destinations or formatters out of the box, but it can be extended via plugins
and there are some good plugins out there. It weighs only 1.4kB.

Both these loggers lack the ability to configure the logger from the
querystring, which I found to be a very desirable feature for web development
as it allows you to create a URL that has the log config embedded, which you
can then send to other developers or users etc.
E.g: `https://example.com/page?log=debug`.

What I want is a logging library that combines the best aspects of both these
loggers and adds the features that I miss in both. `ulog` is my attempt at
building this library. It's base API is compatible with that of `debug` and
`loglevel` and with the console, making it a drop-in replacement for all of
these in many cases. It has a configuration mechanism that is compatible with
that of `debug`, but that is more powerful and flexible. It accepts
configuration from the querystring allowing you to craft URLs with log config
embedded in it. It has powerful, configurable formatting included by default
and it does this without mangling the call stack, so the filename/line number
entries in the browser console remain unharmed. You can specify where the log
output should go and where it should drain. It's completely modular, so you can
not only easily add features through 'mods', but you can actually even drop
features you don't need by not loading the mods those features are in. It has
native `anylogger` support, decoupling the client code from the logger. And it
supports lazy loading so we can get all those great features without bloating
our bundle.

I hope you will give `ulog` a try. If you have feedback on it, or found
an issue, please let me know on the
[issue tracker](https://github.com/download/ulog/issues).


## API

`ulog` is very natural to use:

```js
import anylogger from 'anylogger'
const log = anylogger('my-module')
log('A log message')
log('info', 'An info message')
log('warn', 'A warning message')
log.info('Starting...')
log.log('Yeah!')
log.error('Something went wrong', new Error('Oh no!'))
if (log.enabledFor('warn')) {
  log.warn(expensiveArguments())
}
```
> Note that in the code above, we import `anylogger` and not `ulog`. This way
> the client code is decoupled from the logger.

`ulog` inherits it's API from `anylogger`. If you are able to restrict yourself
to the [Anylogger API](https://www.npmjs.com/package/anylogger#anylogger-api),
your code will work with any supported logging library.

Note that any logging code written for either `debug`, `loglevel` or the
console should be able to do it's logging just like it did before, but now
using a `ulog` logger instead. This backward compatibility should make
migrating from any of these to `ulog` very easy. And because this is just the
`anylogger` API, you should even be able to migrate back to `debug` or
`loglevel` without any changes at all, by just including the right adapter
in your entry point. Of course once you get used to `ulog`, you will never
want to go back! :p


## Levels

`anylogger` defines 6 logging levels, which correspond with the natively
available logging functions on the console:

```js
anylogger.levels = {
  error: 1,
  warn: 2,
  info: 3,
  log: 4,
  debug: 5,
  trace: 6,
}
```

### `log.enabledFor`

`anylogger` defines `log.enabledFor` and `ulog` implements it by checking the
logger's current log level and whether it's in debug mode. Normally, you should
not have to use this method, unless you are doing some expensive calculations
only to write log output. In such a case you can write:

```js
import anylogger from 'anylogger'
const log = anylogger('my-app')
if (log.enabledFor('info')) {
  log.info(calculateResults())
}
```

### `log.level`

`ulog` adds a property `level` to each logger that is a numeric representation
of the current log level.

```js
if (log.level >= anylogger.levels.info) {
	log.info('This message will be logged')
}
```

> To check the log level, `enabledFor` is preferred over the `level` property
> as it is within the `anylogger` API.

Also see the section on [configuring ulog](#configure).

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

> Attention! Chromium-based browsers have their own level filter and by
> default, debug messages are filtered away.


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

## Outputs

In `ulog`, where messages are going is completely configurable at runtime.
You can even configure where discarded messages are going.

All log methods on a logger are associated with one of two channels,
`output` and `drain`. To configure the outputs for these channels, two
config options are available:

* [config option `log_output`](#config-option-log_output), defaults to `'console'`
* [config option `log_drain`](#config-option-log_drain), defaults to `'noop'`

When the logger is created, each log method is sent either to the `output`
channel, or to the `drain` channel, based on the current log level for that
logger and whether that logger is in debug mode.

To configure the output channel, we assign the name of the output to use
to the relevant config:

```sh
log_output="console"
```

This setting can include expressions to target individual loggers, just like
the `debug` and `log` settings:

```sh
log_output="console; noisy-lib:*=noop"
```

By default, the following outputs are included:

### Output `console`

This actually is the native console object. Using the native console directly is
what allows us to leave the call stack intact in the browser developer tools.

### Output `noop`

This is just a log object that discards all calls

### Output `drain`

Like `noop`, but logs a debug message for every call

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
      error(...args) { /* custom code */ },
      warn(...args) { /* custom code */ },
      info(...args) { /* custom code */ },
      log(...args) { /* custom code */ },
      debug(...args) { /* custom code */ },
      trace(...args) { /* custom code */ },
    }
  }
})
```

This way you can add outputs that send log messages to memory, a file, localStorage, a database, over the network, etc etc.


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
lvl name message perf
```

This sacrifices the callstack for a colored and formatted `message` and having
the `perf` measurements after the message i.s.o before it. Node JS doesn't
output any file name / line number information anyway.

On browsers, we want to spare the call stack, so there the default is:

```sh
lvl name perf
```

We don't include the `message`, but it will be appended as the last argument
automatically. The result is nicely formatted messages with the file name /
line number entries in the browser debug console intact.

To override the default format, just set
[config option `log_format`](#config-option-log_format) to the format you want.

Formats available out of the box include:

* [Format `cr`](#format-cr)
* [Format `date`](#format-date)
* [Format `lvl`](#format-lvl)
* [Format `message`](#format-message)
* [Format `name`](#format-name)
* [Format `perf`](#format-perf)
* [Format `time`](#format-time)
* [Fallback format](#fallback-format)


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

Except for the `message` format, all included formats are static. Meaning they
don't mangle the call stack, but also don't have access to the message. The
`message` format must be dynamic, because it needs access to the message.

More about static vs dynamic formats later, in the
[Custom formats](#custom-formats) section.

#### Format `cr`
Prints a 'carriage return line feed'

This allows you to easily set a multi-line format:

```sh
log_format="lvl name perf cr"
```

This will print the message on the next line.

#### Format `date`
Prints the date the message was logged as `yyyy/MM/dd`.

Combined with `time`, this can give you the full date time.

#### Format `lvl`
Prints the level of the message as a single character:

* `'x'` for error messages
* `'!'` for warning messages
* `'i'` for info messages
* `'-'` for log messages
* `'>'` for debug messages
* `'}'` for trace messages

To get the full level name, you can use `level`, which will be
caught and handled correctly by the `wildcard` format.

#### Format `message`
Prints the message, formatted and colored.
Using this format breaks the callstack as it is dynamic.

#### Format `name`
Prints the logger name

#### Format `perf`
Prints the time difference between two invocations to the same logger, only if
this difference is larger than 1ms. Produces output that looks like `62ms`.
If the time difference becomes large, switches to larger units. E.g. `12.4s`.

#### Format `time`
Prints the time the message was logged as `hh:mm`.

#### Format `wildcard`
Any unrecognized tags are being interpreted by the wildcard format. This just
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
    random: (ctx, rec) => () => String(Math.random())
  }
})
```

These tags then become available in the format string.

> We used two different signatures here, because there are two types of formats.

### Types of formats

Formats come in two flavors:

#### Dynamic formats
Dynamic formats have full access to the message.
But they do mess up the call stack.

> The reason dynamic formats interfere with the call stack is that in order to
> get access to the message, we have to *wrap* the console log function with
> our own function. This wrapping results in the wrapping function being the
> caller from the console's perspective. And thus the filename and line number
> of this function are shown in the debug console.

A dynamic format has this signature:

```ts
  (ctx: FormatContext) => (rec: DynamicFormatRecord) => string || string[]
```

Here is how you would add a dynamic format:

```js
import ulog from 'ulog'

ulog.use({
  formats: {
    dynamicFormat(ctx) {
      // one-time init here
      return (rec) => {
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

```ts
  (ctx: FormatContext, rec: StaticFormatRecord) => () => string || string[]
```

```js
ulog.use({
  formats: {
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

![screenshot](https://unpkg.com/ulog@2.0.0-beta.20/screenshot-beta.11.jpg)

`ulog` now automatically adds some formatting that negates the extra indentation
the messages at these higher levels get, so all messages are nicely aligned:

![screenshot](https://unpkg.com/ulog@2.0.0-beta.20/screenshot.jpg)

You can control alignment with [config option `log_align`](#config-option-log_align).


## Configure

`ulog` features a simple, yet powerful and flexible configuration mechanism. On
Node JS, we can configure `ulog` via environment variables. On browsers, we use
localStorage or querystring arguments.

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
The format is basically a comma-separated list of logger names, using the
asterisk as a wildcard character and optionally negating the expression by
preceding it with a minus sign. So the expression above includes `test` and
`my:*` loggers, except for `my:lib` which is excluded.

`ulog` extends this configuration mechanism. With `debug`, you can only turn
loggers on and off, but `ulog` allows for a much more varied range of options.
This is achieved by extending the configuration syntax so it also accepts the
value applicable for the loggers matching the expression. Also we allow a
semicolon-separated list of such expression=value pairs. For example, to set
the logger `test` to debug and `my:*` loggers except for `my:lib` to info, we
could write:

```sh
log="test=debug; my:*,-my:lib=info"
```

If an option only contains a value, `ulog` implicitly adds `*` as the expression. So we can write:
```sh
log="info"
```
and it's equivalent to
```sh
log="*=info"
```
We can even combine this. So we could write:
```sh
log="info; my:*=debug"
```
and it will set the level for all loggers to info, except for the ones starting
with `my:`, which are set to debug.

Most of the config options support this syntax.

A special case is the config option [debug](#config_option_debug), which is
designed to be compatible with `debug` so code using `ulog` will react to that
setting in the same way.

### Via environment variables

On Node JS we can pass log configuration options via environment variables:

```sh
log="debug" node ./myapp
```

### Via querystring parameters

In browsers, we can pass log configuration options as querystring parameters in the URL:

```
https://example.com/page?log=debug
```

### Via localStorage

In browsers, we can place our log configuration in localStorage:

```js
localStorage.setItem('log', 'debug')
```

### Config option `log`

Configure the levels loggers should be filtered at.

```sh
log="test=debug; my:*,-my:lib=info"
```

### Config option `debug`

Enables debug mode for the selected loggers.

```sh
debug="test,my:*,-my:lib"
```
This option is compatible with that of `debug`.

### Config option `log_output`

Specify the name of the output logs should be written to. Defaults to `'console'`.

```sh
log_output="console; noisy-lib=noop"
```

### Config option `log_drain`

Specify the name of the output logs should be drained to. Defaults to `noop`.
When log messages are filtered out, they are sent to the drain instead of to
the normal output. The default `noop` output is just a noop, but you could
override this to send them to a separate file for example.

```sh
log_drain="noop"
```

### Config option `log_format`

Specify the format to use. Defaults to `lvl name message perf` on Node JS and
`lvl name perf` on browsers.

```sh
log_format="lvl name message; my:*=lvl name message perf"
```

This sets `lvl name message` as the default format, while assigning a different
format string to all loggers starting with `my:`.

For more details, refer to the [section on formatting](#formatting)


### Config option `log_color`

Specify whether colors should be enabled. Defaults to `on`.

```sh
log_color="off"
```

One neat trick is to colorize only a few loggers, to make them stand out:

```sh
log_color="off; my:*=on"
```

### Config option `log_align`

Specify whether messages should be aligned. Defaults to `on`.

```sh
log_align=off
```


## Mods

`ulog` is completely modular, consisting of a microscopically small core and a
bunch of mods. The mods are small pieces of functionality, designed to be
usable stand-alone or in combination with each other. All functionality that
`ulog` adds to `anylogger`, it adds in the form of mods. All, except for the
ability to add mods itself, in the form of method `ulog.use`, that is in core
and one helper function, `grab`, to grab config from mods.

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

* That it uses other mods
* That it adds config settings
* That it adds properties to loggers
* That it adds outputs
* That it adds formats
* Anything else you build

As an example, here is a mod that does most of these things:

```js
import ulog from 'ulog'
import cfg from 'ulog/mods/cfg'

ulog.use({
  use: [ cfg ],
  cfg: {
    // override the default of an existing config setting
    log_output: 'file',
    // add a new config setting with default value
    log_cool: 'on',
  },
  props: {
    // add a property `cool` to every logger
    cool: {
      // provide the getter.
      // get `log_cool` for the current logger and coerce to bool
      get: (logger) => cfg.get('log_cool', logger.name) == 'on'
    }
  },
  // add the `file` output that we made the default
  outputs: {
    // you can write any code that returns a LogObject and call it here
    file: myFileOutput('my/file/name')
  },
  // you can add custom formats just as easy
  formats: {
    // create a static format that prints a random number
    random(ctx, rec){
      return () => String(Math.random())
    }
    // you can later use the custom format in the format string
    // e.g. log_format="lvl name random"
  }
})
```

Interestingly, most of these features of mods are being added by mods. For
example the ability to add config settings is added by the `cfg` mod. Studying
the way `ulog`'s featureset is built from mods by reading the source code of
the included mods is the best way to learn about writing mods for now.


## Lazy loading

`ulog` being built with mods makes it easy to use lazy loading to reduce the
minimum [footprint](#footprint). If you use ulog from a [script tag](#script-tag)
(not recommended), you can get it for free. Otherwise, you have to configure
your bundler to code-split.

### Lazy-loading with Webpack

Have a look at
[ulog.bundle.ts](https://github.com/Download/ulog/blob/master/ulog.bundle.ts)
for an example of doing lazy loading with [Webpack](https://webpack.js.org/).

Basically it only loads `ulog/core` and then checks whether any of the
config options `debug` and `log` are set. Only if one of these is set
does it actually load the remaining mods on-demand.

It is using the standardized dynamic import construct so this code should work
with other bundlers as well. The only Webpack-specific thing in this code is
the comment that specifies the chunk name, used here to specify the filename
`ulog.lazy.min.js`.

```js
import ulog from 'ulog/core'
import env from 'ulog/mods/cfg/env'

// just making sure ulog is available as global in the script version
(window as any).ulog = ulog;

if (env.get('log') || env.get('debug')) {
  import(
    /* webpackChunkName: 'ulog.lazy' */
    'ulog/mods/fmt'
  )
  .then(({ default: fmt }) => {
    ulog.use(fmt)
    for (const logger in ulog.all) {
      ulog.ext(ulog(logger))
    }
  })
}
```

## Decoupling code from `debug`

As I said before, `debug` is excellent for debug logging and there are tens of
thousands of packages using it. The downside of this is that you will more or
less get `debug` shoved through your throat if you include any of these
libraries because they are *tighly coupled* to it. But we can uncouple them
with the magic of bundlers like Webpack.

To replace `debug` with `anylogger` everywhere, you can use this Webpack
alias to make all modules that use `debug` switch to `anylogger` instead:

```js
{
    resolve: {
        alias: {
            'debug': 'anylogger'
        }
    }
}
```

This works because the anylogger API is backwards compatible with that of
`debug`. And because `ulog` has native `anylogger` support, once you import
`ulog` in your entry point, all those libraries that were using `debug` start
to use `ulog` automagically!


## Performance considerations

By default, the logging methods on the `log` object that correspond to a log
level which is higher than the currently set level, are replaced by no-op
methods. As such, you generally don't have to worry about the performance
overhead of leaving the log statements in the production code. There is one
exception to this rule though. If preparing the message itself is a costly
operation, you may want to surround the log code with an
`if (log.enabledFor(level))` statement:

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

Copyright 2024 by [Stijn de Witt](https://stijndewitt.com).


## License

Licensed under the [MIT](https://opensource.org/licenses/MIT)
Open Source license.
