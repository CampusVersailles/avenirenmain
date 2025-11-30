import styles from "./MetierSection.module.css"
import { Metier as MetierType } from "@/strapi/metiers"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"

export default function MetierCentresInterets({ metier }: { metier: MetierType }) {
  return (
    <div className={styles.sectionBlock}>
      <h2 className={styles.sectionTitle}>
        Ce qu’il faut <span className={styles.highlight}>aimer</span>
      </h2>
      <div className={styles.tilesContainer}>
        <div className={styles.column}>
          {metier.centresInterets
            .filter((_, index) => index % 2 === 0)
            .map((centreInteret) => (
              <div className={styles.tile} key={centreInteret.titre}>
                <h3 className={styles.tileTitle}>{centreInteret.titre}</h3>
                <BlocksRenderer content={centreInteret.description} />
              </div>
            ))}
        </div>
        <div className={styles.columnBis}>
          {metier.centresInterets
            .filter((_, index) => index % 2 === 1)
            .map((centreInteret) => (
              <div className={styles.tile} key={centreInteret.titre}>
                <h3 className={styles.tileTitle}>{centreInteret.titre}</h3>
                <BlocksRenderer content={centreInteret.description} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
