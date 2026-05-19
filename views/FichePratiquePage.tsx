import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import FichePratiqueDetail from "@/components/Ressources/FichePratiqueDetail"
import { FichePratiqueDetailStrapi } from "@/strapi/ressources"

const FichePratiquePage = ({ fiche }: { fiche: FichePratiqueDetailStrapi }) => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/ressources" },
          { label: "Fiches pratiques", href: "/fiches-pratiques" },
          { label: fiche.titre, href: `/fiches-pratiques/${fiche.documentId}` },
        ]}
      />
      <Block>
        <FichePratiqueDetail fiche={fiche} />
      </Block>
    </>
  )
}

export default FichePratiquePage
