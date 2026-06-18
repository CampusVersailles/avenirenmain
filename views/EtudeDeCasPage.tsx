import CasPratiques from "@/components/Ressources/CasPratiques"
import { FichePratiqueStrapi, MetaFichePratiqueStrapi } from "@/strapi/ressources"

const EtudeDeCasPage = ({ cas, meta }: { cas: FichePratiqueStrapi[]; meta: MetaFichePratiqueStrapi }) => {
  return <CasPratiques cas={cas} meta={meta} />
}

export default EtudeDeCasPage
