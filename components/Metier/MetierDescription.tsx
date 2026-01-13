import styles from "./MetierDescription.module.css"
import { Metier as MetierType } from "@/strapi/metiers"
import MetierTrouverFormation from "./MetierTrouverFormation"
import Image from "next/image"
import VideoPlayer from "./VideoPlayer"
import StrapiRichText from "@/components/Strapi/StrapiRichText"

export default function MetierDescription({ metier }: { metier: MetierType }) {
  return (
    <div className={styles.descriptionBlock}>
      <div className={styles.descriptionTitleContainer}>
        <h2 className={styles.descriptionTitle}>
          Le métier en <span className={styles.highlight}>un clin d'œil</span>
        </h2>
        <StrapiRichText content={metier.description} />
        <MetierTrouverFormation metier={metier} />
      </div>
      {metier.videoUrl ? (
        <VideoPlayer videoUrl={metier.videoUrl} metierTitle={metier.titre} />
      ) : metier.mediaPrincipal ? (
        <Image src={metier.mediaPrincipal.url} alt='' className={styles.descriptionImage} width={500} height={500} />
      ) : null}
    </div>
  )
}
