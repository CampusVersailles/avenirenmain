import styles from "./Metier.module.css"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import { Metier as MetierType } from "@/strapi/metier"
import LeftChevronIcon from "../Icons/LeftChevron"
import Link from "next/link"
import LikeIcon from "../Icons/Like"
import ShareIcon from "../Icons/Share"

const MetierBanner = ({ filiere, metier }: { filiere: FiliereAvecMetiers; metier: MetierType }) => {
  const domaine = filiere.domainesPro.find((domaine) => metier.codeRomeMetier.code.startsWith(domaine.code))

  return (
    <div className={styles.banner}>
      <div className={styles.badgeContainer}>
        <span className={styles.badge}>{filiere.nom}</span>
        {domaine && <span className={styles.badgeGhost}>{domaine.description}</span>}
      </div>
      <div className={styles.titleAndActionsContainer}>
        <div className={styles.titleContainer}>
          <Link href={`/metiers/${filiere.documentId}`}>
            <LeftChevronIcon className={styles.iconTitle} />
          </Link>
          <h1 className={styles.title}>{metier.titre}</h1>
        </div>
        <div className={styles.actionsContainer}>
          <button className={styles.actionButton}>
            <LikeIcon className={styles.icon} />
          </button>
          <button className={styles.actionButton}>
            <ShareIcon className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  )
}

const Metier = ({ filiere, metier }: { filiere: FiliereAvecMetiers; metier: MetierType }) => {
  return (
    <div>
      <MetierBanner filiere={filiere} metier={metier} />
      {/* <FiliereBanner filiere={filiere} />

      <div>
        {(selectedFilters.length > 0
          ? filiere.metiers.filter((metier) =>
              selectedFilters.some((filter) => metier.codeRomeMetier.code.startsWith(filter)),
            )
          : filiere.metiers
        ).map((metier) => (
          <FiliereMetier metier={metier} filiere={filiere} key={metier.id} />
        ))}
      </div> */}
    </div>
  )
}
export default Metier
