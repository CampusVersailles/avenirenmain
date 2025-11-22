import styles from "./FormationsBanner.module.css"
import Tile from "../Tile/Tile"
import ArrowRightIcon from "../Icons/ArrowRightIcon"

const FormationsBanner = () => {
  return (
    <Tile href='/formations'>
      <div className={styles.content}>
        <h2 className={styles.title}>Découvre des métiers d'avenir</h2>
        <p>
          Que tu aimes les grands espaces ou les petits ateliers, travailler seul ou en groupe, bricoler ou animer,
          esquisse ton futur en explorant les familles de métiers qui te plaisent.
        </p>
      </div>
      <div className={styles.cta}>
        <span>Je trouve ma formation</span>
        <ArrowRightIcon />
      </div>
    </Tile>
  )
}

export default FormationsBanner
