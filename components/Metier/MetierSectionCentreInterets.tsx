import styles from "./MetierSection.module.css"
import { Metier as MetierType } from "@/strapi/metier"
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"

export default function MetierCentresInterets({ metier }: { metier: MetierType }) {
  return (
    <div className={styles.sectionBlock}>
      <h2 className={styles.sectionTitle}>Centres d'intérêts</h2>
      <div className={styles.tilesContainer}>
        {metier.centresInterets.map((centreInteret) => (
          <div className={styles.tile} key={centreInteret.titre}>
            <h3 className={styles.tileTitle}>{centreInteret.titre}</h3>
            <BlocksRenderer content={centreInteret.description as BlocksContent} />
          </div>
        ))}
      </div>
    </div>
  )
}
