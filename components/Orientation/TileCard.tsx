import Image from "next/image"
import classNames from "classnames"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import strapiStyles from "./StrapiComponents.module.css"
import styles from "./Orientation.module.css"

interface TileCardProps {
  media?: { url: string } | null
  titre?: string | null
  description?: any
  className?: string
  showTitle?: boolean
}

const TileCard = ({ media, titre, description, className, showTitle = true }: TileCardProps) => {
  return (
    <div className={classNames(styles.tile, className)}>
      {media?.url && (
        <div className={styles.tileImageContainer}>
          <Image src={media.url} alt={titre || ""} width={125} height={125} />
        </div>
      )}
      {showTitle && titre && <p className={styles.tileTitle}>{titre}</p>}
      {description && (
        <div className={classNames(strapiStyles.strapiRichText, styles.tileDescription)}>
          <BlocksRenderer content={description} />
        </div>
      )}
    </div>
  )
}

export default TileCard
