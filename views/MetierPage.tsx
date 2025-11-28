import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import Metier from "@/components/Metier/Metier"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import { Formation } from "@/strapi/formations"
import { Metier as MetierType } from "@/strapi/metiers"

const MetierPage = ({
  filiere,
  metier,
  formations,
}: {
  filiere: FiliereAvecMetiers
  metier: MetierType
  formations: Formation[]
}) => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Filières", href: "/metiers" },
          { label: filiere.nom, href: `/metiers/${filiere.documentId}` },
          { label: metier.titre, href: `/metiers/${filiere.documentId}/${metier.documentId}` },
        ]}
      />
      <Block>
        <Metier filiere={filiere} metier={metier} formations={formations} />
      </Block>
    </>
  )
}

export default MetierPage
