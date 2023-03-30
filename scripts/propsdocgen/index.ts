import fs from 'fs'
import path from 'path'
import { Config as ExtractPropsConfig, Props, createPropsExtractor } from './lib/extractProps'
import { Config as FindMatchingFilesConfig, findMatchingFiles } from './lib/findMatchingFiles'
import { config } from './propsdocgen.config'

export type Config =
  & ExtractPropsConfig
  & FindMatchingFilesConfig
  & {
    /** 出力するドキュメントのファイル名のサフィックス */
    filename: string
  }

export type GeneratedDocument = {
  Variants?: Props[]
  CustomProps?: Props[]
}

console.time('[propsdocs]')

const files = findMatchingFiles(config.include, config.exclude)
const extractProps = createPropsExtractor(files)

const writers = files.map(async file => {
  const filename = path.parse(file).name + config.filename
  const exportPath = path.join(path.dirname(file), filename)
  const docs = extractProps(file, config)

  return fs.promises
    .writeFile(exportPath, JSON.stringify(docs, null, 2))
    .then(() => console.info(exportPath, '(generated)'))
})

await Promise.all(writers)

console.timeEnd('[propsdocs]')
