import styles from "./FiliereMetier.module.css"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import Link from "next/link"
import { replaceNewlinesInBlocks } from "@/lib/text_utils"
import { memo } from "react"
import classNames from "classnames"
import LinkIcon from "../Icons/LinkIcon"
import Image from "next/image"

const FiliereMetier = memo(
  ({
    metier,
    filiere,
    domainesPro,
    className,
    ariaHidden,
  }: {
    metier: FiliereAvecMetiers["metiers"][number]
    filiere: FiliereAvecMetiers
    domainesPro: { code: string; description: string }[]
    className?: string
    ariaHidden?: boolean
  }) => {
    return (
      <div className={classNames(styles.tile, className)} aria-hidden={ariaHidden}>
        <Link href={`/metiers/${filiere.documentId}/${metier.documentId}`} className={styles.link}>
          <div className={styles.mainContainer}>
            {metier.mediaPrincipal && (
              <>
                <Image className={styles.image} src={metier.mediaPrincipal.url} alt='' width={250} height={145} />
                <p className={styles.domaine}>
                  {domainesPro.find((domaine) => metier.codeRomeMetier.code.startsWith(domaine.code))?.description}
                </p>
              </>
            )}
            <div className={styles.content}>
              <p className={styles.title}>{metier.titre}</p>
              <div className={styles.description}>
                <BlocksRenderer content={replaceNewlinesInBlocks(metier.description)} />
              </div>
            </div>
          </div>
          <div className={styles.linkIconContainer}>
            <span className={styles.linkIconText}>Voir le métier</span>
            <LinkIcon className={styles.linkIcon} />
          </div>
        </Link>
      </div>
    )
  },
)

FiliereMetier.displayName = "FiliereMetier"

export default FiliereMetier
