import styles from "./TabAppellations.module.css"
import { Metier as MetierType } from "@/strapi/metiers"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import Image from "next/image"
import Link from "next/link"
import JobIcon from "@/components/Icons/Job"

export default function TabAppellations({ filiere, metier }: { filiere: FiliereAvecMetiers; metier: MetierType }) {
  return (
    <div className={styles.container}>
      {metier.appellations.length > 0 ? (
        metier.appellations
          .sort((a, b) => {
            if (a.metier === b.metier) {
              return a.nom.localeCompare(b.nom)
            }
            return a.metier ? -1 : 1
          })
          .map((appellation) => {
            return appellation.metier ? (
              <Link
                href={`/metiers/${filiere.documentId}/${appellation.metier.documentId}`}
                className={styles.linkTile}
                key={appellation.nom}>
                <div className={styles.iconContainer}>
                  <Image className={styles.icon} src={filiere.icone} alt='' width={24} height={24} />
                </div>
                <p className={styles.nom}>{appellation.nom}</p>
              </Link>
            ) : (
              <div className={styles.tile} key={appellation.nom}>
                <div className={styles.iconContainer}>
                  <Image className={styles.icon} src={filiere.icone} alt='' width={24} height={24} />
                </div>
                <p className={styles.nom}>{appellation.nom}</p>
              </div>
            )
          })
      ) : (
        <div className={styles.unavailableContainer}>
          <JobIcon className={styles.unavailableIcon} />
          <div className={styles.unavailableVerticalSeparator} />
          <p className={styles.unavailableText}>Aucune spécialisation disponible pour ce métier.</p>
        </div>
      )}
    </div>
  )
}
