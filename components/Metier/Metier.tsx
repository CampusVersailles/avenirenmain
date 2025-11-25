import styles from "./Metier.module.css"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import { Metier as MetierType } from "@/strapi/metier"
import MetierBanner from "./MetierBanner"
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"

const MetierDescription = ({ filiere, metier }: { filiere: FiliereAvecMetiers; metier: MetierType }) => {
  return (
    <div className={styles.descriptionBlock}>
      <div className={styles.descriptionTitleContainer}>
        <h2 className={styles.descriptionTitle}>Le métier en un clin d’œil</h2>
        <BlocksRenderer content={metier.description as BlocksContent} />
      </div>
      <img src={metier.mediaPrincipal} alt='' className={styles.descriptionImage} />
    </div>
  )
}

const Metier = ({ filiere, metier }: { filiere: FiliereAvecMetiers; metier: MetierType }) => {
  return (
    <div className={styles.metier}>
      <MetierBanner filiere={filiere} metier={metier} />
      <MetierDescription filiere={filiere} metier={metier} />
    </div>
  )
}
export default Metier
