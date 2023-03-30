import type { GeneratedDocument } from '../index'
import styles from './PropsDocs.module.css'

type Props = {
  json: GeneratedDocument
}

export function PropsDocs({ json }: Props): JSX.Element {

  const hasVariants = Array.isArray(json.Variants) && json.Variants.length > 0
  const hasCustomProps = Array.isArray(json.CustomProps) && json.CustomProps.length > 0
  const hasNoProps = hasVariants === false && hasCustomProps === false

  if (hasNoProps) {
    return <p>Propsなし</p>
  }

  return (
    <>
      { hasVariants && <Table title='Variants' docs={json.Variants} /> }
      { hasCustomProps && <Table title='CustomProps' docs={json.CustomProps} /> }
    </>
  )
}

type TableProps = {
  title: string
  docs: GeneratedDocument[keyof GeneratedDocument]
}

function Table(props: TableProps) {
  return (
    <>
      <h3>{props.title}</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Props</th>
            <th>Type</th>
            <th>Optional</th>
            <th>Default</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {props.docs!.map(doc => (
            <tr key={doc.name}>
              <td><code>{doc.name}</code></td>
              <td><code>{doc.type}</code></td>
              <td>{doc.optional ? 'YES' : ''}</td>
              <td>{doc.default ? (<code>{doc.default}</code>) : ''}</td>
              <td>{doc.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
