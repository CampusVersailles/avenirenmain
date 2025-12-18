import { Orientation as OrientationType } from "@/strapi/orientation"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import styles from "./Orientation.module.css"
import Image from "next/image"

const Orientation = ({ orientation }: { orientation: OrientationType }) => {
  console.log(orientation)
  console.log(orientation.bienvenue_aem_cartes)
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Bienvenue sur l'<span className={styles.highlight}>Avenir en main !</span>
        </h1>
        <div className={styles.bienvenueAemDescription}>
          <BlocksRenderer content={orientation.bienvenue_aem} />
        </div>

        <div className={styles.bienvenueAemTileContainer}>
          {orientation.bienvenue_aem_cartes.map((carte, index) => (
            <div className={styles.bienvenueAemTile} key={`bienvenueAemTile-${index}`}>
              <div className={styles.bienvenueAemTileImageContainer}>
                {carte.media?.url && <Image src={carte.media.url} alt={carte.titre || ""} width={125} height={125} />}
              </div>
              {carte.description && <BlocksRenderer content={carte.description} />}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Orientation
