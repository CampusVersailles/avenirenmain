import { Formation as FormationType } from "@/strapi/formations"
import styles from "./Formation.module.css"
import Link from "next/link"

const Formation = ({ formation }: { formation: FormationType }) => {
  return (
    <div className={styles.formation}>
      {formation.alternance && (
        <div className={styles.header}>
          <span className={styles.badge}>Formation en alternance</span>
        </div>
      )}
      <h2 className={styles.title}>{formation.titre}</h2>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <span className={styles.icon}>📍</span>
          <span>{formation.adresse?.ville || "Non renseignée"}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.icon}>🕑</span>
          <span>{formation.formationDuree || "1 an"}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.icon}>🎓</span>
          <span>{formation.formationNiveaux?.join(", ") || "Niveau : BAC, BAC +1"}</span>
        </div>
      </div>
      <div className={styles.footer}>
        <p>Nom de l'établissement : {formation.nomEtablissement}</p>
        <p>Contact : {formation.contact}</p>
        <p className={styles.website}>
          {formation.siteWeb && (
            <Link href={formation.siteWeb} target='_blank' rel='noopener noreferrer'>
              {formation.siteWeb}
            </Link>
          )}
        </p>
      </div>
    </div>
  )
}

export default Formation
