import type { GeneratedDocument } from "../scripts/propsdocgen"

declare module '*.css' {
  const styles: Record<string, string>
  export default styles
}
declare module '*.props.json' {
  const json: GeneratedDocument
  export default json
}
