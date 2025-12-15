import { FiliereAvecMetiersComplets } from "@/strapi/filieres"
import styles from "./FiliereBanner.module.css"

const mappingNomFiliereTitle: Record<string, string> = {
  "Artisanat d'art & design": "Découvrez les métiers de l'Artisanat d'art & design",
  "Horticulture & Paysage": "Découvrez les métiers de l'Horticulture & Paysage",
  "Accueil & Tourisme": "Découvrez les métiers de l'Accueil & Tourisme",
  "Patrimoine bâti": "Découvrez les métiers du Patrimoine bâti",
  Gastronomie: "Découvrez les métiers de la Gastronomie",
}

export default function FiliereBanner({ filiere }: { filiere: FiliereAvecMetiersComplets }) {
  return (
    <div className={styles.banner}>
      <h1 className={styles.title}>
        <img className={styles.icone} src={filiere.icone} alt='' width={24} height={24} />{" "}
        {mappingNomFiliereTitle[filiere.nom]}
      </h1>
      <p className={styles.description}>{filiere.description}</p>
    </div>
  )
}
