import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import FichesPratiques from "@/components/Ressources/FichesPratiques"
import { FichePratiqueStrapi, MetaFichePratiqueStrapi } from "@/strapi/ressources"

const FichesPratiquesPage = ({ fiches, meta }: { fiches: FichePratiqueStrapi[]; meta: MetaFichePratiqueStrapi }) => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/ressources" },
          { label: "Fiches pratiques", href: "/fiches-pratiques" },
        ]}
      />
      <FichesPratiques fiches={fiches} meta={meta} />
    </>
  )
}

export default FichesPratiquesPage
