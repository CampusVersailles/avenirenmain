import styles from "./Metier.module.css"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import { Metier as MetierType } from "@/strapi/metier"
import MetierBanner from "./MetierBanner"
import MetierDescription from "./MetierDescription"

const Metier = ({ filiere, metier }: { filiere: FiliereAvecMetiers; metier: MetierType }) => {
  return (
    <div className={styles.metier}>
      <MetierBanner filiere={filiere} metier={metier} />
      <MetierDescription filiere={filiere} metier={metier} />
    </div>
  )
}
export default Metier
