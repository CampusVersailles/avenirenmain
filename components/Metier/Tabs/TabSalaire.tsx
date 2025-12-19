import SalaryIcon from "@/components/Icons/Salary"
import styles from "./TabSalaire.module.css"
import { Metier as MetierType } from "@/strapi/metiers"

function roundToTen(value: number) {
  return Math.round(value / 10) * 10
}

export default function TabSalaire({ metier }: { metier: MetierType }) {
  return (
    <div className={styles.container}>
      <SalaryIcon className={styles.icon} />
      <div className={styles.verticalSeparator} />
      <p className={styles.text}>
        Le salaire moyen brut mensuel est compris entre {roundToTen(metier.salaire.valeur_basse)} € et{" "}
        {roundToTen(metier.salaire.valeur_haute)} € (source : France Travail)
      </p>
    </div>
  )
}
