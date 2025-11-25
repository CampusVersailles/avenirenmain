import styles from "./MetierSection.module.css"
import { Metier as MetierType } from "@/strapi/metier"
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"

export function MetierQuotidien({ metier }: { metier: MetierType }) {
  return (
    <div className={styles.sectionBlock}>
      <h2 className={styles.sectionTitle}>Le métier au quotidien</h2>
      <div className={styles.tilesContainer}>
        {metier.tachesQuotidiennes.map((tache) => (
          <div className={styles.tile} key={tache.titre}>
            <h3 className={styles.tileTitle}>{tache.titre}</h3>
            <BlocksRenderer content={tache.description as BlocksContent} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function MetierCentresInterets({ metier }: { metier: MetierType }) {
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

export function MetierPerspectives({ metier }: { metier: MetierType }) {
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
