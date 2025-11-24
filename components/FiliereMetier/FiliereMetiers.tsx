import styles from "./FiliereMetier.module.css"
import FiliereMetier from "./FiliereMetier"
import { FiliereAvecMetiers } from "@/strapi/filieres"

const FiliereMetiers = ({ filiere }: { filiere: FiliereAvecMetiers }) => {
  return (
    <div>
      <div className={styles.filiere}>
        {filiere.domainesPro.map((domaine: { code: string; description: string }) => (
          <div key={domaine.code}>
            <h2>{domaine.code}</h2>
            <p>{domaine.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.metiers}>
        {filiere.metiers.map((metier) => (
          <FiliereMetier metier={metier} key={metier.id} />
        ))}
      </div>
    </div>
  )
}
export default FiliereMetiers
