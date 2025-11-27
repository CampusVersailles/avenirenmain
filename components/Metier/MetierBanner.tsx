import styles from "./MetierBanner.module.css"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import { Metier as MetierType } from "@/strapi/metiers"
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
