import styles from "./FiliereMetier.module.css"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import Link from "next/link"
import Image from "next/image"
import { replaceNewlinesInBlocks } from "@/lib/text_utils"
import { memo } from "react"

const FiliereMetier = memo(
  ({
    metier,
    filiere,
    domainesPro,
  }: {
    metier: FiliereAvecMetiers["metiers"][number]
    filiere: FiliereAvecMetiers
    domainesPro: { code: string; description: string }[]
  }) => {
    return (
      <Link href={`/metiers/${filiere.documentId}/${metier.documentId}`} className={styles.tile}>
        <Image className={styles.image} src={metier.mediaPrincipal} alt='' width={250} height={145} />
        <p className={styles.domaine}>
          {domainesPro.find((domaine) => metier.codeRomeMetier.code.startsWith(domaine.code))?.description}
        </p>
        <div className={styles.content}>
          <p className={styles.title}>{metier.titre}</p>
          <div className={styles.description}>
            <BlocksRenderer content={replaceNewlinesInBlocks(metier.description)} />
          </div>
        </div>
      </Link>
    )
  },
)

FiliereMetier.displayName = "FiliereMetier"

export default FiliereMetier
