import Link from "next/link"
import styles from "./Tiles.module.css"
import ArrowRightIcon from "../Icons/ArrowRightIcon"
const Tiles = () => {
  return (
    <div className={styles.tiles}>
      <Link href='/metiers' className={styles.tile}>
        <div>
          <h2>Découvrir les métiers</h2>
          <p>
            Que tu aimes les grands espaces ou les petits ateliers, travailler seul ou en groupe, bricoler ou animer,
            esquisse ton futur en explorant les familles de métiers qui te plaisent.
          </p>
        </div>
        <div className={styles.count}>
          <p className={styles.number}>143</p>
          <p>Métiers</p>
        </div>
        <ArrowRightIcon />
      </Link>
      <Link href='/formations' className={styles.tile}>
        <div>
          <h2>Trouver ma formation</h2>
          <p>
            Prépare ton avenir dans les métiers de l'artisanat en trouvant une formation qui te correspond partout en
            France.
          </p>
        </div>
        <div className={styles.count}>
          <p className={styles.number}>26 913</p>
          <p>Formations</p>
        </div>
        <ArrowRightIcon />
      </Link>
    </div>
  )
}

export default Tiles
