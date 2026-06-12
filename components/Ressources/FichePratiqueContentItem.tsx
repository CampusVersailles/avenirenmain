import { FichePratiqueContenuStrapi } from "@/strapi/ressources"
import StrapiRichText from "@/components/Strapi/StrapiRichText"
import styles from "./FichePratiqueContentItem.module.css"

export const FichePratiqueContentItem = ({ item }: { item: FichePratiqueContenuStrapi }) => {
  console.log(item.image)
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
          {item.image.titre && <p>{item.image.titre}</p>}
          <img src={item.image.image.url} alt={item.image.titre || ""} className={styles.image} />
          {item.image.source && <p>{item.image.source}</p>}
        </div>
      )}
    </div>
  )
}
