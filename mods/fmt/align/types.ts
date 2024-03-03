import type { LogObject } from "anylogger";

export type HasAlign = (output: LogObject) => boolean

export type Align = {
  hasAlign: HasAlign,
  specifiers?: Specifiers,
  arguments?: Arguments,
}

export type Specifiers = {
  [level: string]: string,
}

export type Arguments = {
  [level: string]: string[]
}
