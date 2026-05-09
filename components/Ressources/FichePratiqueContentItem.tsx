import { FichePratiqueContenuStrapi } from "@/strapi/ressources"
import Image from "next/image"
import StrapiRichText from "@/components/Strapi/StrapiRichText"
import styles from "./FichePratiqueContentItem.module.css"

export const FichePratiqueContentItem = ({ item }: { item: FichePratiqueContenuStrapi }) => {
  console.log("Rendering content item", item)
  return (
    <div className={styles.contentItem}>
      {item.texte?.texte && <StrapiRichText content={item.texte.texte} />}
      {item.cta && (
        <div className={styles.callout}>
          <p className={styles.calloutTitle}>{item.cta.cta}</p>
          <StrapiRichText content={item.cta.texte} />
        </div>
      )}
      {item.temoignage && (
        <blockquote className={styles.testimonial}>
          <p className={styles.testimonialTitle}>{item.temoignage.titre}</p>
          <StrapiRichText content={item.temoignage.citation} />
          <StrapiRichText content={item.temoignage.source} className={styles.source} />
        </blockquote>
      )}
      {item.chiffre && (
        <div className={styles.figures}>
          {item.chiffre.chiffres.map((chiffre) => (
            <div key={chiffre.id} className={styles.figure}>
              {chiffre.chiffre !== undefined && <p className={styles.figureValue}>{chiffre.chiffre}</p>}
              {chiffre.titre && <p className={styles.figureTitle}>{chiffre.titre}</p>}
            </div>
          ))}
        </div>
      )}
      {item.image && (
        <div className={styles.imageWrapper}>
          <Image src={item.image.image.url} alt='' width={920} height={520} className={styles.image} />
        </div>
      )}
    </div>
  )
}
