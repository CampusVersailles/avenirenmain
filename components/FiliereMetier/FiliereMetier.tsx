import styles from "./FiliereMetier.module.css"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import Link from "next/link"

const FiliereMetier = ({
  metier,
  filiere,
}: {
  metier: FiliereAvecMetiers["metiers"][number]
  filiere: FiliereAvecMetiers
}) => {
  return (
    <Link href={`/metiers/${filiere.documentId}/${metier.documentId}`} className={styles.tile}>
      <img className={styles.image} src={metier.mediaPrincipal} alt='' />

      <div className={styles.content}>
        <p className={styles.title}>{metier.titre}</p>
        <p className={styles.domaine}>
          {filiere.domainesPro.find((domaine) => metier.codeRomeMetier.code.startsWith(domaine.code))?.description}
        </p>
        <div className={styles.description}>
          <BlocksRenderer content={metier.description} />
        </div>
      </div>
    </Link>
  )
}

export default FiliereMetier
