import { BaseLevels, BaseLogger } from 'anylogger'

type ValueOf<T> = T[keyof T]

type LevelNames = BaseLevels & {
    assert: 0
    dir: 0
    table: 0
    time: 0
    timeEnd: 0
    verbose: 4
    silly: 6
}

interface LevelConstants {
    NONE: 0
    ERROR: 1
    WARN: 2
    INFO: 3
    LOG: 4
    DEBUG: 5
    TRACE: 6
}

export interface Logger extends BaseLogger<LevelNames>, LevelConstants {

    readonly ulog: { version: string }

    /**
     * The log level of this logger.
     */
    level: LogLevel

    assert(...args: any[]): void
    dir(...args: any[]): void
    table(...args: any[]): void
    time(...args: any[]): void
    timeEnd(...args: any[]): void
    verbose(message?: any, ...args: any[]): void
    silly(message?: any, ...args: any[]): void
}

export type LogLevel = ValueOf<LevelConstants>

export type LogFormatter = (logger: Logger, method: keyof LevelNames, args: any[]) => void

export type LoggerExtender = (logger: Logger, parent: Logger) => void

export interface ULog extends LevelConstants {
    /**
     * Returns a logger with the specified name. If it doesn't exist yet,
     * it will be created.
     */
    (name: string): Logger

    /**
     * The default log level.
     */
    level: LogLevel

    /**
     * Array of functions that will intercept calls to the logger functions to
     * apply some formatting.
     */
    formats: LogFormatter[]

    /**
     * Array of functions that will be called with each new logger.
     */
    extends: LoggerExtender[]

    /**
     * Enables debug mode for the loggers listed in `names`.
     */
    enable(names: string): void

    /**
     * Tests whether the named logger is currently in debug mode.
     */
    enabled(name: string): true | undefined

    /**
     * Disables debug mode for all loggers.
     */
    disable(): void
}

declare const ulog: ULog

export default ulog
