import Block from "@/components/Block/Block"
import FichePratiqueDetail from "@/components/Ressources/FichePratiqueDetail"
import { FichePratiqueDetailStrapi } from "@/strapi/ressources"

const FichePratiquePage = ({ fiche, noDownload }: { fiche: FichePratiqueDetailStrapi; noDownload?: boolean }) => {
  return (
    <Block>
      <FichePratiqueDetail fiche={fiche} noDownload={noDownload} />
    </Block>
  )
}

export default FichePratiquePage
