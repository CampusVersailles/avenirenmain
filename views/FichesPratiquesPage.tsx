import FichesPratiques from "@/components/Ressources/FichesPratiques"
import { FichePratiqueStrapi, MetaFichePratiqueStrapi } from "@/strapi/ressources"

const FichesPratiquesPage = ({
  fiches,
  meta,
  placeholder,
}: {
  fiches: FichePratiqueStrapi[]
  meta: MetaFichePratiqueStrapi
  placeholder: string
}) => {
  return <FichesPratiques fiches={fiches} meta={meta} placeholder={placeholder} />
}

export default FichesPratiquesPage
