import { FichePratiqueDetailStrapi } from "@/strapi/ressources"
import Image from "next/image"
import StrapiRichText from "@/components/Strapi/StrapiRichText"
import styles from "./FichePratiqueIntro.module.css"

const FichePratiqueIntro = ({
  fiche,
  onStart,
}: {
  fiche: Pick<FichePratiqueDetailStrapi, "titre" | "sousTitre" | "intro" | "image">
  onStart: () => void
}) => (
  <header className={styles.introHeader}>
    <h1 className={styles.introTitle}>{fiche.titre}</h1>
    <div className={styles.introContent}>
      {fiche.sousTitre && <h2 className={styles.introSubtitle}>{fiche.sousTitre}</h2>}
      <div className={styles.introImage}>
        {fiche.image && <Image src={fiche.image.url} alt='' width={500} height={400} className={styles.introImg} />}
      </div>
      <div className={styles.introBox}>
        <StrapiRichText content={fiche.intro} />
      </div>
      <button onClick={onStart} className={styles.startButton}>
        Commencer
      </button>
    </div>
  </header>
)

export default FichePratiqueIntro
