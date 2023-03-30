import ts from 'typescript'

export type Docs = Record<string, Props[]>

export type Props = {
  name: string
  type: string | undefined
  optional: boolean
  default: string | undefined
  comments: string
}

export type Config = {
  /** 抽出する対象の型名（Type名） */
  targets: string[]
  /** 抽出する対象のJSDocタグ */
  jsDoc: string[]
}

type PropsExtractor = (path: string, config: Config) => Docs

export function createPropsExtractor(files: string[]): PropsExtractor {
  const program = ts.createProgram(files, {})
  const checker = program.getTypeChecker()

  return function extract(path, config) {
    const source = program.getSourceFile(path)!
    const docs: Docs = {}

    source.forEachChild(node => {
      if (
        ts.isTypeAliasDeclaration(node) &&
        config.targets?.includes(node.name.text) &&
        ts.isTypeLiteralNode(node.type)
      ) {
        const props = node.type.members.reduce<Props[]>((result, member) => {
          if (ts.isPropertySignature(member)) {
            const symbol = checker.getSymbolAtLocation(member.name)
            const comments = ts.displayPartsToString(symbol?.getDocumentationComment(checker))

            const jsDoc = symbol?.getJsDocTags()
            const def = jsDoc?.find(a => a.name === 'default')?.text?.find(a => a.kind === 'text')?.text

            result.push({
              name: member.name.getText(source),
              type: member.type?.getText(source),
              optional: member.questionToken !== undefined,
              default: def,
              comments
            })
          }

          return result
        }, [])

        docs[node.name.text] = props
      }
    })

    return docs
  }
}
