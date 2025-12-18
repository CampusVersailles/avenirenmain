import Image from "next/image"
import classNames from "classnames"
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"
import strapiStyles from "./StrapiComponents.module.css"
import styles from "./Orientation.module.css"

const TileCard = ({
  media,
  titre,
  description,
  className,
  showTitle = true,
}: {
  media?: { url: string } | null
  titre?: string | null
  description?: BlocksContent
  className?: string
  showTitle?: boolean
}) => {
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
