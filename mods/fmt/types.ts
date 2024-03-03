import type { Logger, LogLevel, LogObject } from 'anylogger';

/**
 * The format context has information about the parsed format string the
 * format occurred in. For example `name` contains the tag name and
 * `text` contains the text contained in the tag.
 */
export type FormatContext = {
  name: string
  text: string,
}

export type FormatRecord = {
  logger: Logger
  level: LogLevel
  [key: string]: any
}

export type StaticFormatRecord = FormatRecord & {

}

export type DynamicFormatRecord = FormatRecord & {
  message: any[] | any
}

export type FormatProps = {
  padding?: number
  direction?: 0 | 1
  color?: string
}

export type FormatResult = string | string[]

export type StaticFormatFunction = () => FormatResult

export type DynamicFormatFunction = (rec: DynamicFormatRecord) => FormatResult

export type FormatFunction = StaticFormatFunction | DynamicFormatFunction

export const isStaticFunction = (fn: FormatFunction): fn is StaticFormatFunction => {
  return fn.length === 0
}

export const isDynamicFunction = (fn: FormatFunction): fn is StaticFormatFunction => {
  return fn.length === 1
}

export type StaticFormat = (ctx: FormatContext, rec: StaticFormatRecord) => FormatFunction

export type DynamicFormat = (ctx: FormatContext) => FormatFunction

export type Format = StaticFormat | DynamicFormat

export const isStaticFormat = (fn: Format): fn is StaticFormat => {
  return fn.length === 2
}

export const isDynamicFormat = (fn: Format): fn is DynamicFormat => {
  return fn.length === 1
}

export type NewFormatProps = {
  ctx: FormatContext
  rec?: FormatRecord
  props: FormatProps
}

export type NewFormat = (props: NewFormatProps, fn: FormatFunction) => FormatFunction

export type WithFmt = {
  format: string
  color: string
  align: string
}

export type Recorder = (rec: FormatRecord) => FormatRecord

export type WithRecorder = {
  recorder: Recorder
}
