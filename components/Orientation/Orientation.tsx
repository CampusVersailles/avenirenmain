import { Orientation as OrientationType } from "@/strapi/orientation"
import styles from "./Orientation.module.css"
import Link from "next/link"
import TileCard from "./TileCard"
import TwoColumnLayout from "./TwoColumnLayout"
import StrapiRichText from "@/components/Strapi/StrapiRichText"
import classNames from "classnames"

const Orientation = ({ orientation }: { orientation: OrientationType }) => {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.highlight}>L'Avenir en main</span>, mode d'emploi
        </h1>
        <div className={styles.bienvenueAemDescription}>
          <StrapiRichText content={orientation.bienvenue_aem} className={styles.bienvenueAemDescriptionText} />
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
        <StrapiRichText
          content={orientation.pourquoi_choisir_description}
          className={styles.pourquoiChoisirRaisonsDescription}
        />
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
          Ce que permet <span className={styles.highlight}>« l'Avenir en main »</span>
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

        <h2 className={styles.sectionTitle}>Les voies de la formation</h2>
        <div className={styles.voiesDeFormationContainer}>
          {orientation.voies_de_formation.map((voie, index) => (
            <div className={styles.voieDeFormationTile} key={`voieDeFormationTile-${index}`}>
              {voie.titre && <p className={styles.voieDeFormationTileTitle}>{voie.titre}</p>}
              {voie.description && (
                <StrapiRichText content={voie.description} className={styles.voieDeFormationDescription} />
              )}
            </div>
          ))}
        </div>

        <div className={styles.ctaContainer}>
          <p className={styles.ctaText}>Tu te poses plein de questions ?</p>
          <div className={styles.ctaButtons}>
            <Link href='/quiz' className={styles.cta}>
              Passe le test
            </Link>
            <Link href='mailto:contact@campusversailles.fr' className={styles.ctaSecondary}>
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Orientation
