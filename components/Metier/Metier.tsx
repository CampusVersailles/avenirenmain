import styles from "./Metier.module.css"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import { Metier as MetierType } from "@/strapi/metier"
import MetierBanner from "./MetierBanner"
import MetierDescription from "./MetierDescription"
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"

function MetierQuotidien({ filiere, metier }: { filiere: FiliereAvecMetiers; metier: MetierType }) {
  return (
    <div className={styles.quotidienBlock}>
      <h2 className={styles.quotidienTitle}>Le métier au quotidien</h2>
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

const Metier = ({ filiere, metier }: { filiere: FiliereAvecMetiers; metier: MetierType }) => {
  return (
    <div className={styles.metier}>
      <MetierBanner filiere={filiere} metier={metier} />
      <MetierDescription metier={metier} />
      <MetierQuotidien filiere={filiere} metier={metier} />
    </div>
  )
}
export default Metier
