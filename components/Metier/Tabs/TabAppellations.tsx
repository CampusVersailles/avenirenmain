import styles from "./TabAppellations.module.css"
import { Metier as MetierType } from "@/strapi/metier"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import Image from "next/image"

export default function TabAppellations({ filiere, metier }: { filiere: FiliereAvecMetiers; metier: MetierType }) {
  return (
    <div className={styles.container}>
      {metier.appellations.map((appellation, index) => (
        <div className={styles.tile} key={appellation.nom + index}>
          <div className={styles.iconContainer}>
            <Image className={styles.icon} src={filiere.icone} alt='' width={24} height={24} />
          </div>
          <p className={styles.nom}>{appellation.nom}</p>
        </div>
      ))}
    </div>
  )
}
