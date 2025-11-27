import Tile from "../Tile/Tile"
import styles from "./Tiles.module.css"
import ArrowRightIcon from "../Icons/ArrowRightIcon"

const Tiles = ({ formationsCount, metiersCount }: { formationsCount: number; metiersCount: number }) => {
  return (
    <div className={styles.tiles}>
      <Tile className={styles.tile} href='/metiers'>
        <div>
          <div className={styles.count}>
            <p className={styles.number}>{metiersCount.toLocaleString()}</p>
            <p>Métiers</p>
          </div>
          <h2 className={styles.title}>Découvrir les métiers</h2>
          <p className={styles.text}>
            Que tu aimes les grands espaces ou les petits ateliers, travailler seul ou en groupe, bricoler ou animer,
            esquisse ton futur en explorant les familles de métiers qui te plaisent.
          </p>
        </div>
        <ArrowRightIcon />
      </Tile>
      <Tile className={styles.tile} href='/formations'>
        <div>
          <div className={styles.count}>
            <p className={styles.number}>{formationsCount.toLocaleString()}</p>
            <p>Formations</p>
          </div>
          <h2 className={styles.title}>Trouver ma formation</h2>
          <p className={styles.text}>
            Prépare ton avenir dans les métiers de l'artisanat en trouvant une formation qui te correspond partout en
            France.
          </p>
        </div>
        <ArrowRightIcon />
      </Tile>
    </div>
  )
}

export default Tiles
