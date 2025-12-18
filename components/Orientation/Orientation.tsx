import { Orientation as OrientationType } from "@/strapi/orientation"
import strapiStyles from "./StrapiComponents.module.css"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import styles from "./Orientation.module.css"
import Image from "next/image"
import classNames from "classnames"
import Link from "next/link"

const Orientation = ({ orientation }: { orientation: OrientationType }) => {
  console.log(orientation)
  console.log(orientation.pourquoi_choisir_raisons)
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Bienvenue sur l'<span className={styles.highlight}>Avenir en main !</span>
        </h1>
        <div className={styles.bienvenueAemDescription}>
          <div className={classNames(strapiStyles.strapiRichText, styles.bienvenueAemDescriptionText)}>
            <BlocksRenderer content={orientation.bienvenue_aem} />
          </div>
        </div>

        <div className={styles.bienvenueAemTileContainer}>
          {orientation.bienvenue_aem_cartes.map((carte, index) => (
            <div className={styles.bienvenueAemTile} key={`bienvenueAemTile-${index}`}>
              <div className={styles.tileImageContainer}>
                {carte.media?.url && <Image src={carte.media.url} alt={carte.titre || ""} width={125} height={125} />}
              </div>
              {carte.description && (
                <div className={strapiStyles.strapiRichText}>
                  <BlocksRenderer content={carte.description} />
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 className={styles.sectionTitle}>
          Pourquoi choisir <span className={styles.highlight}>un métier de savoir-faire ?</span>
        </h2>
        <div className={strapiStyles.strapiRichText}>
          <BlocksRenderer content={orientation.pourquoi_choisir_description} />
        </div>
        <div className={styles.pourquoiChoisirRaisonsContainer}>
          {orientation.pourquoi_choisir_raisons.map((raison, index) => (
            <div className={styles.pourquoiChoisirRaisonsTile} key={`pourquoiChoisirRaisonsTile-${index}`}>
              <p className={styles.pourquoiChoisirRaisonsTileDescription}>{raison.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.ctaContainer}>
          <p className={styles.ctaText}>Tu souhaites en savoir plus ?</p>
          <Link href='/metiers' className={styles.cta}>
            <span>Explore les métiers</span>
          </Link>
        </div>

        <h2 className={styles.sectionTitle}>
          <span className={styles.highlight}>À qui sert</span> l'Avenir en main ?
        </h2>
        <div className={styles.tilesContainer}>
          {orientation.a_qui_sert_aem.map((carte, index) => (
            <div className={styles.tile} key={`aQuiSertAemTile-${index}`}>
              <div className={styles.tileImageContainer}>
                {carte.media?.url && <Image src={carte.media.url} alt={carte.titre || ""} width={125} height={125} />}
              </div>
              {carte.titre && <p className={styles.tileTitle}>{carte.titre}</p>}
              {carte.description && (
                <div className={classNames(strapiStyles.strapiRichText, styles.tileDescription)}>
                  <BlocksRenderer content={carte.description} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Orientation
