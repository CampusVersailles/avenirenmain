import SalaryIcon from "@/components/Icons/Salary"
import styles from "./TabSalaire.module.css"
import { Metier as MetierType } from "@/strapi/metier"

export default function TabSalaire({ metier }: { metier: MetierType }) {
  const salaireDisponible = metier.salaire && metier.salaire.valeur_basse && metier.salaire.valeur_haute
  return (
    <div className={styles.container}>
      <SalaryIcon className={styles.icon} />
      <div className={styles.verticalSeparator} />
      {salaireDisponible ? (
        <p className={styles.text}>
          Après plusieurs années d'expérience, vous pouvez espérer un salaire compris entre{" "}
          {metier.salaire.valeur_basse} € et {metier.salaire.valeur_haute} €.
        </p>
      ) : (
        <p className={styles.text}>Salaire non renseigné pour ce métier.</p>
      )}
    </div>
  )
}
