import { RessourcePageStrapi } from "@/strapi/ressources"
import styles from "./GuideBanner.module.css"
import StrapiRichText from "../Strapi/StrapiRichText"
import Image from "next/image"
import LinkAsButton from "../Button/LinkAsButton"

const GuideBanner = ({ guide }: { guide: RessourcePageStrapi }) => {
  return (
    <>
      <div>
        <h1 className={styles.title}>{guide.titre}</h1>
        <StrapiRichText content={guide.description} className={styles.description} />
      </div>
      <Image className={styles.image} src='/images/cameo.jpg' alt='' width={1140} height={519} />
      <LinkAsButton href='#' priority='tertiary' className={styles.downloadButton}>
        Télécharger
      </LinkAsButton>
    </>
  )
}

export default GuideBanner
