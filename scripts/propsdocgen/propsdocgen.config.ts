import type { Config } from '.'

export const config: Config = {
  targets: ['Variants', 'CustomProps'],
  jsDoc: ['default'],
  include: ['components/**/*.tsx'],
  exclude: [
    'components/**/index.tsx',
    'components/**/_*',
    'components/**/*spec*',
    'components/**/*stories*',
    'components/**/use*',
  ],
  filename: '.props.json'
}
