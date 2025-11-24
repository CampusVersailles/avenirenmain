import { Metier } from "@/strapi/metier"
import styles from "./FiliereMetier.module.css"
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"

const FiliereMetier = ({ metier }: { metier: Metier }) => {
  return (
    <div className={styles.metier}>
      <h2 className={styles.title}>{metier.titre}</h2>
      <div className={styles.description}>
        <BlocksRenderer content={metier.description as BlocksContent} />
      </div>
    </div>
  )
}

export default FiliereMetier
