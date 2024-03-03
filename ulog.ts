// ulog - the universal logger
// © 2024 by Stijn de Witt
// License: MIT
import ulog from './core/core.js'
export type * from './core/core.js'
import fmt from './mods/fmt/fmt.js'

ulog.use(fmt)

export default ulog
