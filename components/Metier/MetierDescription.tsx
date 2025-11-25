import { replaceNewlinesInBlocks } from "@/lib/text_utils"
import styles from "./MetierDescription.module.css"
import { Metier as MetierType } from "@/strapi/metier"
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"

export default function MetierDescription({ metier }: { metier: MetierType }) {
  return (
    <div className={styles.descriptionBlock}>
      <div className={styles.descriptionTitleContainer}>
        <h2 className={styles.descriptionTitle}>Le métier en un clin d’œil</h2>
        <BlocksRenderer content={replaceNewlinesInBlocks(metier.description as BlocksContent)} />
      </div>
      <img src={metier.mediaPrincipal} alt='' className={styles.descriptionImage} />
    </div>
  )
}
