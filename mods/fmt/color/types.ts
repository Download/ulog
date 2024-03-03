import type { LogObject } from 'anylogger'

export type Color = {
  r: number,
  g: number,
  b: number,
}

export type Palette = Color[]

export type HasColor = (output: LogObject) => boolean

export type Specifier = (color: Color) => string

export type Argument = (color: Color) => string[]

export type Colors = {
  [level: string]: Color
}
