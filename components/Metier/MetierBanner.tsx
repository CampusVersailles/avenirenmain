import styles from "./MetierBanner.module.css"
import { Metier as MetierType } from "@/strapi/metiers"
import LikeIcon from "../Icons/Like"
import ShareIcon from "../Icons/Share"
import Link from "next/link"

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
        <h1 className={styles.title}>{metier.titre}</h1>
        <div className={styles.actionsContainer}>
          <Link href='#' className={styles.actionButton} aria-label='Liker le métier'>
            <LikeIcon className={styles.icon} />
          </Link>
          <Link href='#' className={styles.actionButton} aria-label='Partager le métier'>
            <ShareIcon className={styles.icon} />
          </Link>
        </div>
      </div>
    </div>
  )
}
