import type { HTMLAttributes, ReactElement, ReactNode } from 'react'

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

type ButtonAttributes = Omit<HTMLAttributes<HTMLButtonElement>, keyof CustomProps>

export type Props =
  & Variants
  & CustomProps
  & ButtonAttributes


export function Button(props: Props): ReactElement {
  const {
    priority = 'primary',
    size = 'md',
    onClick,
    children,
    ...attrs
  } = props

  return (
    <button
      onClick={onClick}
      {...attrs}
    >{children}</button>
  )
}
