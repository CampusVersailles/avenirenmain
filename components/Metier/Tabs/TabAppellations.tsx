import WorkIcon from "@/components/Icons/Work"
import styles from "./TabAppellations.module.css"
import { Metier as MetierType } from "@/strapi/metier"

export default function TabAppellations({ metier }: { metier: MetierType }) {
  return (
    <div className={styles.container}>
      {metier.appellations.map((appellation, index) => (
        <div className={styles.tile} key={appellation.nom + index}>
          <div className={styles.iconContainer}>
            <WorkIcon className={styles.icon} />
          </div>
          <p className={styles.nom}>{appellation.nom}</p>
        </div>
      ))}
    </div>
  )
}
