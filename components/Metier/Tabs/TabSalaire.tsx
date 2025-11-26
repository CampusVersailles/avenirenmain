import styles from "./TabSalaire.module.css"
import { Metier as MetierType } from "@/strapi/metier"

export default function TabSalaire({ metier }: { metier: MetierType }) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Salaire estimé</p>
    </div>
  )
}
