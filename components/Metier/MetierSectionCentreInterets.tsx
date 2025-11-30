import styles from "./MetierSection.module.css"
import { Metier as MetierType } from "@/strapi/metiers"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import Image from "next/image"

export default function MetierCentresInterets({ metier }: { metier: MetierType }) {
  const secondaryImage = metier.videoUrl ? metier.mediaPrincipal : metier.mediaSecondaire

  return (
    <div className={styles.sectionBlock}>
      <h2 className={styles.sectionTitle}>
        Ce qu’il faut <span className={styles.highlight}>aimer</span>
      </h2>
      <div className={styles.tilesContainer}>
        <div className={styles.column}>
          {secondaryImage ? (
            <Image src={secondaryImage.url} alt='' width={500} height={500} className={styles.image} />
          ) : (
            metier.centresInterets
              .filter((_, index) => index % 2 === 0)
              .map((centreInteret) => (
                <div className={styles.tile} key={centreInteret.titre}>
                  <h3 className={styles.tileTitle}>{centreInteret.titre}</h3>
                  <BlocksRenderer content={centreInteret.description} />
                </div>
              ))
          )}
        </div>
        <div className={styles.columnBis}>
          {(secondaryImage ? metier.centresInterets : metier.centresInterets.filter((_, index) => index % 2 === 0)).map(
            (centreInteret) => (
              <div className={styles.tile} key={centreInteret.titre}>
                <h3 className={styles.tileTitle}>{centreInteret.titre}</h3>
                <BlocksRenderer content={centreInteret.description} />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
