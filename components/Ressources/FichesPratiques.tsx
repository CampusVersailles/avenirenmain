import { FichePratiqueStrapi, MetaFichePratiqueStrapi } from "@/strapi/ressources"
import Block from "../Block/Block"
import styles from "./FichesPratiques.module.css"
import StrapiRichText from "../Strapi/StrapiRichText"
import FichesPratiquesList from "./FichesPratiquesList"

const FichesPratiques = ({ fiches, meta }: { fiches: FichePratiqueStrapi[]; meta: MetaFichePratiqueStrapi }) => {
  return (
    <>
      <Block>
        <div className={styles.intro}>
          <p className={styles.introTitle}>{meta.titre}</p>
          <StrapiRichText content={meta.description} />
        </div>
      </Block>
      <Block>
        <FichesPratiquesList fiches={fiches} />
      </Block>
    </>
  )
}

export default FichesPratiques
