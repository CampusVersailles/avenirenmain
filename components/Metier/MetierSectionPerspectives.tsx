import styles from "./MetierSection.module.css"
import { Metier as MetierType } from "@/strapi/metier"
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"

export default function MetierPerspectives({ metier }: { metier: MetierType }) {
  console.log(metier.pourquoi)
  return (
    <div className={styles.sectionBlock}>
      <h2 className={styles.sectionTitle}>Perspectives</h2>
      <div className={styles.tilesContainer}>
        <div className={styles.tile} key='environnementTravail'>
          <h3 className={styles.tileTitle}>Environnement de travail</h3>
          <BlocksRenderer content={metier.pourquoi.environnementTravail as BlocksContent} />
        </div>
        <div className={styles.tile} key='statuts'>
          <h3 className={styles.tileTitle}>Statuts</h3>
          <BlocksRenderer content={metier.pourquoi.statuts as BlocksContent} />
        </div>
        <div className={styles.tile} key='opportunites'>
          <h3 className={styles.tileTitle}>Opportunités</h3>
          <BlocksRenderer content={metier.pourquoi.opportunites as BlocksContent} />
        </div>
        <div className={styles.tile} key='notes'>
          <h3 className={styles.tileTitle}>Bon à savoir</h3>
          <BlocksRenderer content={metier.pourquoi.notes as BlocksContent} />
        </div>
      </div>
    </div>
  )
}
