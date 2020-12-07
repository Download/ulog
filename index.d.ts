import { BaseLevels, BaseLogger } from 'anylogger'

interface Logger extends BaseLogger<LevelNames>, LevelConstants {
	levels: Record<keyof BaseLevels, number>;
	/**
	* The log level of this logger.
	*/
	level: LogLevel;
	assert(...args: any[]): void
	dir(...args: any[]): void
	table(...args: any[]): void
	time(...args: any[]): void
	timeEnd(...args: any[]): void
	verbose(message?: any, ...args: any[]): void
	silly(message?: any, ...args: any[]): void
	discard(...args: any[]): void
}

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

export type LogLevel = ValueOf<LevelConstants>

export type LogFormatter = (logger: Logger, method: keyof LevelNames, args: unknown[]) => void

export type LoggerExtender = (logger: Logger, parent: Logger) => void

export interface Middleware {
	outputs: {
		custom: {
			log(...args: unknown[]): void;
		};
	};
	use: LogFormatter[];
	formats: Record<string, (this: Logger, logger: Logger, method: keyof LevelNames, args: unknown[]) => void>;
	formatters: {
		custom(ctx: unknown): LogFormatter;
	};
}

declare namespace Logger {
	function use(options: Partial<Middleware>): void;
}

export default Logger;
