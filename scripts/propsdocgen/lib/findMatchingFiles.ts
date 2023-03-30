import glob from 'glob'

export type Config = {
  /** 検索対象のファイル（glob） */
  include: string[]
  /** 除外するファイル（glob） */
  exclude?: string[]
}

export function findMatchingFiles(globs: string[], ignores: string[] = []): string[] {
  const paths = globs
    .map(pattern => glob.sync(pattern, { ignore: ignores }))
    .flat()

  return paths
}
