import { RessourcePageStrapi } from "@/strapi/ressources"
import Video from "../Video/Video"
import styles from "../Home/Banner.module.css"
import StrapiRichText from "../Strapi/StrapiRichText"

const RessourceBanner = ({ ressource }: { ressource: RessourcePageStrapi }) => {
  return (
    <div className={styles.banner}>
      <div>
        <h1 className={styles.title}>{ressource.titre}</h1>
        <StrapiRichText content={ressource.description} className={styles.description} />
      </div>
      <Video className={styles.video} src='/videos/main.mp4' />
    </div>
  )
}

export default RessourceBanner
