import { FichePratiqueStrapi, MetaFichePratiqueStrapi } from "@/strapi/ressources"
import Block from "../Block/Block"
import StrapiRichText from "../Strapi/StrapiRichText"
import styles from "./CasPratiques.module.css"
import Image from "next/image"
import LinkAsButton from "../Button/LinkAsButton"
import FiliereCard from "../Filiere/FiliereCard"

const CasPratiques = ({ cas, meta }: { cas: FichePratiqueStrapi[]; meta: MetaFichePratiqueStrapi }) => {
  return (
    <>
      <Block>
        <h1 className={styles.title}>{meta.titre}</h1>
        <StrapiRichText content={meta.description} />
        <Image src='/images/map.png' alt='' width={800} height={400} className={styles.map} />
      </Block>
      <Block>
        <div className={styles.guide}>
          <h2>Le guide</h2>
          <LinkAsButton href='#' className={styles.guideLink} secondary>
            Télécharger le guide
          </LinkAsButton>
        </div>
        <div className={styles.cas}>
          {cas.map((item) => (
            <FiliereCard
              secondary
              key={item.id}
              link={`/guide-de-l-entrepreneuriat/etudes-de-cas/${item.documentId}`}
              filiere={{
                id: item.id,
                documentId: item.documentId,
                titre: item.titre,
                nom: item.type,
                description: item.sousTitre,
                photo: item.image ? { url: item.image.url } : undefined,
                icone: undefined,
              }}
            />
          ))}
        </div>
      </Block>
    </>
  )
}

export default CasPratiques
