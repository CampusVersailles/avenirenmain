import { replaceNewlinesInBlocks } from "@/lib/text_utils"
import styles from "./MetierDescription.module.css"
import { Metier as MetierType } from "@/strapi/metiers"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import MetierTrouverFormation from "./MetierTrouverFormation"
import { FiliereAvecMetiers } from "@/strapi/filieres"

export default function MetierDescription({ filiere, metier }: { filiere: FiliereAvecMetiers; metier: MetierType }) {
  return (
    <div className={styles.descriptionBlock}>
      <div className={styles.descriptionTitleContainer}>
        <h2 className={styles.descriptionTitle}>Le métier en un clin d’œil</h2>
        <BlocksRenderer content={replaceNewlinesInBlocks(metier.description)} />
        <MetierTrouverFormation filiere={filiere} metier={metier} />
      </div>
      <img src={metier.mediaPrincipal} alt='' className={styles.descriptionImage} />
    </div>
  )
}
