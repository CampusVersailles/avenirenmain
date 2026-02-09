import styles from "./FiliereMetier.module.css"
import { FiliereAvecMetiersComplets } from "@/strapi/filieres"
import Link from "next/link"
import { memo } from "react"
import classNames from "classnames"
import LinkIcon from "../Icons/LinkIcon"
import Image from "next/image"
import StrapiRichText from "@/components/Strapi/StrapiRichText"

const FiliereMetier = memo(
  ({
    metier,
    filiere,
    domainesPro,
    className,
    ariaHidden,
  }: {
    metier: FiliereAvecMetiersComplets["metiers"][number]
    filiere: FiliereAvecMetiersComplets
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
                {metier.codeRomeMetier && (
                  <p className={styles.domaine}>
                    {domainesPro.find((domaine) => metier.codeRomeMetier.code.startsWith(domaine.code))?.description}
                  </p>
                )}
              </>
            )}
            <div className={styles.content}>
              <p className={styles.title}>{metier.titre}</p>
              <StrapiRichText content={metier.description} className={styles.description} />
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
