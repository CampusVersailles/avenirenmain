import { BlocksContent } from "@strapi/blocks-react-renderer"
import styles from "./Orientation.module.css"

const TwoColumnLayout = ({
  items,
  renderItem,
}: {
  items: {
    titre?: string
    description?: BlocksContent
    media?: { url: string }
  }[]
  renderItem: (
    item: { titre?: string; description?: BlocksContent; media?: { url: string } },
    index: number,
  ) => React.ReactNode
}) => {
  const leftColumnItems = items.filter((_, index) => index % 2 === 0)
  const rightColumnItems = items.filter((_, index) => index % 2 === 1)

  return (
    <div className={styles.tilesContainer}>
      <div className={styles.column}>{leftColumnItems.map((item, index) => renderItem(item, index * 2))}</div>
      <div className={styles.column}>{rightColumnItems.map((item, index) => renderItem(item, index * 2 + 1))}</div>
    </div>
  )
}

export default TwoColumnLayout
