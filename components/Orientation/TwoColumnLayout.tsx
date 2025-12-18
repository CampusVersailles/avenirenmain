import styles from "./Orientation.module.css"

interface TwoColumnLayoutProps {
  items: any[]
  renderItem: (item: any, index: number) => React.ReactNode
}

const TwoColumnLayout = ({ items, renderItem }: TwoColumnLayoutProps) => {
  const leftColumnItems = items.filter((_, index) => index % 2 === 0)
  const rightColumnItems = items.filter((_, index) => index % 2 === 1)

  return (
    <div className={styles.tilesContainer}>
      <div className={styles.column}>
        {leftColumnItems.map((item, index) => renderItem(item, index * 2))}
      </div>
      <div className={styles.column}>
        {rightColumnItems.map((item, index) => renderItem(item, index * 2 + 1))}
      </div>
    </div>
  )
}

export default TwoColumnLayout
