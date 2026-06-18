import { FichePratiqueStrapi, MetaFichePratiqueStrapi } from "@/strapi/ressources"
import Block from "../Block/Block"
import styles from "./FichesPratiques.module.css"
import StrapiRichText from "../Strapi/StrapiRichText"
import FichesPratiquesList from "./FichesPratiquesList"

const FichesPratiques = ({
  fiches,
  meta,
  placeholder,
}: {
  fiches: FichePratiqueStrapi[]
  meta: MetaFichePratiqueStrapi
  placeholder: string
}) => {
  return (
    <>
      <Block>
        <div className={styles.intro}>
          <h1 className={styles.introTitle}>{meta.titre}</h1>
          <StrapiRichText content={meta.description} />
        </div>
      </Block>
      <Block>
        <FichesPratiquesList fiches={fiches} placeholder={placeholder} />
      </Block>
    </>
  )
}

export default FichesPratiques
