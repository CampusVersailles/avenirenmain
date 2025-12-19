import { Orientation as OrientationType } from "@/strapi/orientation"
import strapiStyles from "./StrapiComponents.module.css"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import styles from "./Orientation.module.css"
import classNames from "classnames"
import Link from "next/link"
import TileCard from "./TileCard"
import TwoColumnLayout from "./TwoColumnLayout"

const Orientation = ({ orientation }: { orientation: OrientationType }) => {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Bienvenue sur <span className={styles.highlight}>l'Avenir en main !</span>
        </h1>
        <div className={styles.bienvenueAemDescription}>
          <div className={classNames(strapiStyles.strapiRichText, styles.bienvenueAemDescriptionText)}>
            <BlocksRenderer content={orientation.bienvenue_aem} />
          </div>
        </div>

        <div className={classNames(styles.tileGrid, styles.tileGridThreeColumns)}>
          {orientation.bienvenue_aem_cartes.map((carte, index) => (
            <TileCard
              key={`bienvenueAemTile-${index}`}
              media={carte.media}
              titre={carte.titre}
              description={carte.description}
              showTitle={false}
            />
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
          <span className={styles.highlight}>À qui sert</span> L'Avenir en main ?
        </h2>
        <TwoColumnLayout
          items={orientation.a_qui_sert_aem}
          renderItem={(carte, index) => (
            <TileCard
              key={`aQuiSertAemTile-${index}`}
              media={carte.media}
              titre={carte.titre}
              description={carte.description}
            />
          )}
        />

        <h2 className={styles.sectionTitle}>
          Ce que permet <span className={styles.highlight}>« L'Avenir en main »</span>
        </h2>
        <TwoColumnLayout
          items={orientation.ce_que_permet_aem}
          renderItem={(carte, index) => (
            <TileCard
              key={`ceQuePermetAemTile-${index}`}
              media={carte.media}
              titre={carte.titre}
              description={carte.description}
            />
          )}
        />

        <h2 className={styles.sectionTitle}>
          Les voies de la formation dans <span className={styles.highlight}>nos filières</span>
        </h2>
        <div className={styles.voiesDeFormationContainer}>
          {orientation.voies_de_formation.map((voie, index) => (
            <div className={styles.voieDeFormationTile} key={`voieDeFormationTile-${index}`}>
              {voie.titre && <p className={styles.voieDeFormationTileTitle}>{voie.titre}</p>}
              {voie.description && (
                <div className={classNames(strapiStyles.strapiRichText, styles.voieDeFormationDescription)}>
                  <BlocksRenderer content={voie.description} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.ctaContainer}>
          <p className={styles.ctaText}>Tu te poses plein de questions ?</p>
          <Link href='/quiz' className={styles.cta}>
            <span>Passe le test</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Orientation
