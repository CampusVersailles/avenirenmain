import styles from "./MetierBanner.module.css"
import { Metier as MetierType } from "@/strapi/metiers"
import LikeButton from "./LikeButton"
import ShareButton from "./ShareButton"

import BackButton from "../BackButton/BackButton"

export default function MetierBanner({
  metier,
  domainesPro,
}: {
  metier: MetierType
  domainesPro: { code: string; description: string }[]
}) {
  const domaine = domainesPro.find((domaine) => metier.codeRomeMetier.code.startsWith(domaine.code))

  return (
    <div className={styles.banner}>
      <div className={styles.badgeContainer}>
        {metier.filieres.map((filiere) => (
          <span key={filiere.documentId} className={styles.badge}>
            {filiere.nom}
          </span>
        ))}
        {domaine && <span className={styles.badgeGhost}>{domaine.description}</span>}
      </div>
      <div className={styles.titleAndActionsContainer}>
        <div className={styles.titleContainer}>
          <BackButton fallbackHref={`/metiers/${metier.filieres[0].documentId}`} />
          <h1 className={styles.title}>{metier.titre}</h1>
        </div>
        <div className={styles.actionsContainer}>
          <LikeButton metierId={metier.documentId} tracking={metier.titre} ariaLabel='Liker le métier' />
          <ShareButton ariaLabel='Partager le métier' tracking={metier.titre} />
        </div>
      </div>
    </div>
  )
}
