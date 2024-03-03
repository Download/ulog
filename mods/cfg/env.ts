
export default {
  get: (name: string): string | null | undefined => (
    (process as any).env[name] || process.env[name.toUpperCase()]
  )
}
