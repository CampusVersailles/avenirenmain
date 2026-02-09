import styles from "./TabFormations.module.css"
import { Metier as MetierType } from "@/strapi/metiers"
import { getFormationsByRomeCode } from "@/strapi/formations"
import Formation from "@/components/Formation/Formation"
import Link from "next/link"

export default async function TabFormations({ metier }: { metier: MetierType }) {
  const formations = metier.codeRomeMetier
    ? await getFormationsByRomeCode({ romeCode: metier.codeRomeMetier.code })
    : []
  const hasFormations = formations.length > 0
  return (
    <div className={styles.container}>
      {hasFormations ? (
        <>
          <div className={styles.formations}>
            {formations.map((formation) => (
              <Formation formation={formation} key={formation.documentId} />
            ))}
          </div>
          <Link
            className={styles.button}
            href={`/formations?romeCode=${encodeURIComponent(metier.codeRomeMetier.code)}`}>
            <p>Voir toutes les formations pour ce métier</p>
          </Link>
        </>
      ) : (
        <>
          <p>Aucune formation trouvée pour ce métier</p>
          <Link className={styles.button} href={`/formations`}>
            <p>Chercher une autre formation</p>
          </Link>
        </>
      )}
    </div>
  )
}
