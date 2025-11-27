import JobIcon from "@/components/Icons/Job"
import styles from "./TabMetiersProches.module.css"
import { Metier as MetierType } from "@/strapi/metiers"

export default function TabMetiersProches({ metier }: { metier: MetierType }) {
  const metiersDisponibles = metier.metiersProches.length > 0
  return (
    <div className={styles.container}>
      {metiersDisponibles ? (
        metier.metiersProches.map((metier, index) => (
          <div className={styles.tile} key={metier.nom + index}>
            <p className={styles.nom}>{metier.nom}</p>
          </div>
        ))
      ) : (
        <div className={styles.unavailableContainer}>
          <JobIcon className={styles.unavailableIcon} />
          <div className={styles.unavailableVerticalSeparator} />
          <p className={styles.unavailableText}>Aucun métier proche disponible pour ce métier.</p>
        </div>
      )}
    </div>
  )
}
