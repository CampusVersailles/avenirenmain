import { RessourcePageStrapi } from "@/strapi/ressources"
import styles from "./GuideBanner.module.css"
import StrapiRichText from "../Strapi/StrapiRichText"
import Image from "next/image"

const GuideBanner = ({ guide }: { guide: RessourcePageStrapi }) => {
  return (
    <>
      <div>
        <h1 className={styles.title}>{guide.titre}</h1>
        <StrapiRichText content={guide.description} className={styles.description} />
      </div>
      <>
        <Image className={styles.image} src='/images/guide.png' alt='' width={1140} height={519} />
      </>
    </>
  )
}

export default GuideBanner
