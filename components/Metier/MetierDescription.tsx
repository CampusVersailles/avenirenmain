import { replaceNewlinesInBlocks } from "@/lib/text_utils"
import styles from "./MetierDescription.module.css"
import { Metier as MetierType } from "@/strapi/metiers"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import MetierTrouverFormation from "./MetierTrouverFormation"
import Image from "next/image"
import VideoPlayer from "./VideoPlayer"

export default function MetierDescription({ metier }: { metier: MetierType }) {
  return (
    <div className={styles.descriptionBlock}>
      <div className={styles.descriptionTitleContainer}>
        <h2 className={styles.descriptionTitle}>
          Le métier en <span className={styles.highlight}>un clin d'œil</span>
        </h2>
        <BlocksRenderer content={replaceNewlinesInBlocks(metier.description)} />
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
