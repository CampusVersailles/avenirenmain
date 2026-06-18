import ArrowRightIcon from "../Icons/ArrowRightIcon"
import Tile from "../Tile/Tile"
import tilesStyles from "../Home/Tiles.module.css"
import styles from "./RessourcesTiles.module.css"
import classNames from "classnames"

const GuideTiles = () => {
  return (
    <>
      <h2 className={styles.title}>
        Accéder aux <b>ressources</b>
      </h2>
      <div className={tilesStyles.tiles}>
        <Tile className={tilesStyles.tile} href='/guide-de-l-entrepreneuriat/etudes-de-cas'>
          <div>
            <div className={classNames(styles.icon, styles.blue)}>
              <img src='/images/fiches-pratiques.svg' alt='' width={40} height={40} />
            </div>
            <h3 className={tilesStyles.smallTitle}>Études de cas</h3>
          </div>
          <ArrowRightIcon />
        </Tile>
        <Tile className={tilesStyles.tile} href='/guide-de-l-entrepreneuriat/entreprendre'>
          <div>
            <div className={classNames(styles.icon, styles.yellow)}>
              <img src='/images/guide.svg' alt='' width={40} height={40} />
            </div>
            <h3 className={tilesStyles.smallTitle}>Fiches pratiques pour entreprendre</h3>
          </div>
          <ArrowRightIcon />
        </Tile>
        <Tile className={tilesStyles.tile} href='/' disabled>
          <div>
            <p className={styles.tag}>Arrive bientôt</p>
            <div className={classNames(styles.icon, styles.green)}>
              <img src='/images/financement.svg' alt='' width={40} height={40} />
            </div>
            <h3 className={tilesStyles.smallTitle}>Dispositifs de financement</h3>
          </div>
          <ArrowRightIcon />
        </Tile>
      </div>
    </>
  )
}

export default GuideTiles
