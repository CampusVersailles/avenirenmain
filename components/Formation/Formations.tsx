import Formation from "./Formation"
import { Formation as FormationType } from "@/strapi/formations"
import styles from "./Formations.module.css"
const Formations = ({ formations }: { formations: FormationType[] }) => {
  return (
    <div className={styles.formations}>
      {formations.map((formation) => (
        <Formation formation={formation} key={formation.id} />
      ))}
    </div>
  )
}
export default Formations
