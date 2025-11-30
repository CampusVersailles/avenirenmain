import styles from "./MetierSection.module.css"
import { Metier as MetierType } from "@/strapi/metiers"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import classNames from "classnames"

export default function MetierQuotidien({ metier }: { metier: MetierType }) {
  return (
    <div className={styles.sectionBlock}>
      <h2 className={styles.sectionTitle}>
        Ce que tu fais <span className={styles.highlight}>au quotidien</span>
      </h2>
      <div className={styles.tilesContainer}>
        <div className={styles.column}>
          {metier.tachesQuotidiennes
            .filter((_, index) => index % 2 === 0)
            .map((tache) => (
              <div className={classNames(styles.tile, styles.alternateTile)} key={tache.titre}>
                <h3 className={styles.tileTitle}>{tache.titre}</h3>
                <BlocksRenderer content={tache.description} />
              </div>
            ))}
        </div>
        <div className={styles.columnBis}>
          {metier.tachesQuotidiennes
            .filter((_, index) => index % 2 === 1)
            .map((tache) => (
              <div className={classNames(styles.tile, styles.alternateTile)} key={tache.titre}>
                <h3 className={styles.tileTitle}>{tache.titre}</h3>
                <BlocksRenderer content={tache.description} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
