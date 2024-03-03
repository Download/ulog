import anylogger, {
  type AnyLogger,
  type Logger,
} from 'anylogger'

import merge from '../merge/merge.js'

/**
 * Ulog is AnyLogger + mods.
 */
export type Ulog = AnyLogger & HasMods

/**
 * Has a property `mods`, which is a `Mod[]`, and a method `use` to add a mod
 * and its dependencies to the `mods` that are in use, if needed.
 */
export type HasMods = {

  /**
   * An array of mods
   */
  mods: Mod[]

  /**
   * Adds `mod` to the list of used `mods`, if needed.
   *
   * Checks whether `mod` has a key `use` containing mods `mod` depends on and
   * adds those first, guaranteeing the order in which mods are added.
   *
   * Returns the total number of mods added, including transitive dependencies.
   *
   * @param mod A single mod object or an array of mod objects.
   * @returns The number of mods that were added
   *
   * E.g.:
   * ```
   * var mod = {} // the simplest mod is just an empty object
   * var solo = {} // just a mod
   * var using = { // a mod that uses another
   *   // declare a dependency on other mods with `use`
   *   use: [
   *     // mods will be added in the order listed here
   *     mod
   *   ]
   * }
   *
   * ulog.use(solo)  // returns 1, because 'solo' was added
   * ulog.use(solo)  // returns 0, because mods are only added once
   * ulog.use(using) // returns 2, because `using` depends on `mod`
   * ulog.use(mod)   // returns 0, because `mod` was already added by `using`
   * ```
   *
   * The fact that `use` returns the number of mods added makes it
   * convenient to test whether the `use` call had any effects:
   *
   * ```js
   * if (ulog.use(mods)) {
   *   // this code only runs if mods were added
   * }
   * ```
   */
  use(mod: Mod | Mod[]): number

  /**
   * Grabs configuration values from mods.
   *
   * To grab all extender functions from all mods:
   *
   * ```js
   * const extenders = ulog.grab('ext', [])
   * // > [ ()=>{..}, ()=>{..}, .. ]
   * ```
   *
   * Lets look at an example:
   *
   * ```js
   * ulog.use([
   *   {
   *     name: 'Mod 1',
   *     example: {
   *       key1: 'mod1',
   *       key2: 'mod1'
   *     },
   *   },
   *   {
   *     name: 'Mod 2',
   *     example: {
   *       key1: 'mod2',
   *       key3: 'another',
   *     },
   *   },
   * ])
   *
   * ulog.grab('name', [])
   * // ['Mod 1', 'Mod 2']
   * ulog.grab('example', {})
   * // { key1: 'mod2', key2: 'mod1', key3: 'another' }
   * ```
   *
   * The second parameter determines how results are
   * collected. When an array is passed, all found values are
   * returned in the order of the mods they were found in.
   * When an object is passed, the found values are collected
   * as named keys in the object, but only the last found
   * value appears. This works as if the later mods overrides
   * the earlier mod.
   *
   * @param name
   * @param results
   */
  grab(name: string, results: any): any
}

/**
 * A mod is an object, optionally with a `use` key
 * declaring its dependency on other mods, and
 * possibly with an `ext` key, containing an Extender
 * to extend a logger in some specific way.
 */
export type Mod = {
  use?: Mod[]
  ext?: Extender
  [name: string]: any
}

/**
 * Extends the given `logger`
 */
export type Extender = (logger: Logger) => void

/**
 * Has a property `ext` that is an `Extender`
 */
export type HasExtender = {
  ext: Extender
}

// ulog is anylogger + mods
const ulog = anylogger as Ulog
ulog.mods = [];

ulog.use = (mod) => {
  // handle mod being an array of mods
  if (Array.isArray(mod)) {
    return mod.reduce((r,mod) => r + ulog.use(mod), 0)
  }
  // handle mod being a single mod
  // is it already in use?
  const inUse = ulog.mods.indexOf(mod) !== -1
  if (inUse) return 0; // done
  // not in use, we will install a least 1 mod
  let result = 1
  // install dependencies first if needed
  if (mod.use) result += ulog.use(mod.use)
  // then add mod
  ulog.mods.push(mod)
  return result
}

ulog.grab = function(name, results) {
  return ulog.mods.reduce(function(r,mod){
    if (Array.isArray(r) && (name in mod)) {
      r.push(mod[name])
    } else {
      merge(r, mod[name])
    }
    return r
  }, results);
}

// save the original no-op adapter
const noop = ulog.ext

// replace the adapter with one that uses mods
ulog.ext = (logfn) => {
  // create a no-op logger to start with
  const logger: Logger = noop(logfn)
  // allow all mods to extend the logger further
  for (const mod of ulog.mods) {
    if (mod.ext) {
      mod.ext(logger)
    }
  }
  return logger
}

export default ulog
