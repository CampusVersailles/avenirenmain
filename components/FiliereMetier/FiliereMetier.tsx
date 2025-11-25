import styles from "./FiliereMetier.module.css"
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"
import Image from "next/image"
import { FiliereAvecMetiers } from "@/strapi/filieres"

const FiliereMetier = ({
  metier,
  filiere,
}: {
  metier: FiliereAvecMetiers["metiers"][number]
  filiere: FiliereAvecMetiers
}) => {
  return (
    <div className={styles.tile}>
      <img className={styles.image} src={metier.mediaPrincipal} alt='' />

      <div className={styles.content}>
        <p className={styles.title}>{metier.titre}</p>
        <p className={styles.domaine}>
          {filiere.domainesPro.find((domaine) => metier.codeRomeMetier.code.startsWith(domaine.code))?.description}
        </p>
        <div className={styles.description}>
          <BlocksRenderer content={metier.description as BlocksContent} />
        </div>
      </div>
    </div>
  )
}

export default FiliereMetier
