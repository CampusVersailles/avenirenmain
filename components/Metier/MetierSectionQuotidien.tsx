import styles from "./MetierSection.module.css"
import { Metier as MetierType } from "@/strapi/metier"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"

export default function MetierQuotidien({ metier }: { metier: MetierType }) {
  return (
    <div className={styles.sectionBlock}>
      <h2 className={styles.sectionTitle}>Le métier au quotidien</h2>
      <div className={styles.tilesContainer}>
        {metier.tachesQuotidiennes.map((tache) => (
          <div className={styles.tile} key={tache.titre}>
            <h3 className={styles.tileTitle}>{tache.titre}</h3>
            <BlocksRenderer content={tache.description} />
          </div>
        ))}
      </div>
    </div>
  )
}
