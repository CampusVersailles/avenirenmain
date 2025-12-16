import styles from "./TabAppellations.module.css"
import { FiliereAvecMetiersComplets } from "@/strapi/filieres"
import Link from "next/link"
import JobIcon from "@/components/Icons/Job"
import Image from "next/image"

export default function TabAppellations({
  filiere,
  appellations,
  notFoundMessage,
}: {
  filiere: FiliereAvecMetiersComplets
  appellations: { nom: string; metier?: { documentId: string } }[]
  notFoundMessage: string
}) {
  return (
    <div className={styles.container}>
      {appellations.length > 0 ? (
        appellations
          .sort((a, b) => {
            if (a.metier && !b.metier) {
              return -1
            }
            if (!a.metier && b.metier) {
              return 1
            }
            return a.nom.localeCompare(b.nom)
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
          <p className={styles.unavailableText}>{notFoundMessage}</p>
        </div>
      )}
    </div>
  )
}
