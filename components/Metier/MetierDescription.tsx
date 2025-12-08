import { replaceNewlinesInBlocks } from "@/lib/text_utils"
import styles from "./MetierDescription.module.css"
import { Metier as MetierType } from "@/strapi/metiers"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import MetierTrouverFormation from "./MetierTrouverFormation"

export default function MetierDescription({ metier }: { metier: MetierType }) {
  const getEmbedUrl = (url: string) => {
    // Convertir l'URL YouTube en URL embed
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
    const match = url.match(youtubeRegex)
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`
    }
    return url
  }

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
        <iframe
          title='Vidéo de présentation du métier'
          src={getEmbedUrl(metier.videoUrl)}
          className={styles.descriptionVideo}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      ) : metier.mediaPrincipal ? (
        <img src={metier.mediaPrincipal.url} alt='' className={styles.descriptionImage} width={500} height={500} />
      ) : null}
    </div>
  )
}
