# Storybook Props Document Generator

Sample repository for generating a Props document for Storybook from a component's type alias (Type Alias).

コンポーネントの型エイリアス（Type Alias）からStorybook用のPropsドキュメントを生成するサンプルリポジトリです。


![生成したProps.jsonからStorybookのドキュメントを生成している](./assets/storybook.png)

## 使い方

1. コンポーネント内にPropsの型情報を追加する
    ```typescript
    // ./components/Button/Button.tsx
    /**
     * デザインツール上の設定
     */
    type Variants = {
      /**
       * ボタンの優先度を決める
       * @default 'primary'
       */
      priority?: 'primary' | 'secndary'
      /**
       * ボタンの大きさを決める
       * @default 'md'
       */
      size?: 'sm' | 'md' | 'lg'
    }
 
    /**
     * 技術的に必要なProps、または明示的に受け取るAttributes
     */
    type CustomProps = {
      /**
       * ボタン内部に表示する要素
       */
      children: ReactNode
      /**
       * ボタンをクリックしたときに実行するイベント
       */
      onClick: () => void
    }
    ```
2. propsdocgenの`propsdocgen.config.ts`を設定する
    ```typescript
    // ./scripts/propsdocgen/propsdocgen.config.ts
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
    ```
3. `npm run build:propsdocs`を実行し、`xxx.props.json`を生成する
    ```txt
    .
    |- components
        |- Button
            |- Button.props.json  // <- generated
            |- Button.tsx
            |- Button.stories.mdx
    ```
4. `xxx.stories.mdx`でProps用コンポーネント（`<PropsDocs>`）を使いドキュメントを書く
    ```mdx
    // ./components/Button/Button.stories.mdx
    import { PropsDocs } from '../../scripts/propsdocgen/PropsDocs'
    import ButtonPropsDoc from './Button.props.json'

    ...

    ## Props

    <PropsDocs json={ButtonPropsDoc}></PropsDocs>
    ```
 