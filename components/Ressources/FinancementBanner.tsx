import { MetaFichePratiqueStrapi } from "@/strapi/ressources"
import styles from "./GuideBanner.module.css"
import StrapiRichText from "../Strapi/StrapiRichText"
import Image from "next/image"

const FinancementBanner = ({ meta }: { meta: MetaFichePratiqueStrapi }) => {
  return (
    <>
      <div>
        <h1 className={styles.title}>{meta.titre}</h1>
        <StrapiRichText content={meta.description} className={styles.description} />
      </div>
      <>
        <Image className={styles.image} src='/images/cameo.png' alt='' width={1140} height={519} />
      </>
    </>
  )
}

export default FinancementBanner
