import styles from "./MetierBanner.module.css"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import { Metier as MetierType } from "@/strapi/metier"
import LikeIcon from "../Icons/Like"
import ShareIcon from "../Icons/Share"
import Link from "next/link"

export default function MetierBanner({ filiere, metier }: { filiere: FiliereAvecMetiers; metier: MetierType }) {
  const domaine = filiere.domainesPro.find((domaine) => metier.codeRomeMetier.code.startsWith(domaine.code))

  return (
    <div className={styles.banner}>
      <div className={styles.badgeContainer}>
        <span className={styles.badge}>{filiere.nom}</span>
        {domaine && <span className={styles.badgeGhost}>{domaine.description}</span>}
      </div>
      <div className={styles.titleAndActionsContainer}>
        <h1 className={styles.title}>{metier.titre}</h1>
        <div className={styles.actionsContainer}>
          <Link href='#' className={styles.actionButton}>
            <LikeIcon className={styles.icon} aria-label='Liker le métier' />
          </Link>
          <Link href='#' className={styles.actionButton}>
            <ShareIcon className={styles.icon} aria-label='Partager le métier' />
          </Link>
        </div>
      </div>
    </div>
  )
}
