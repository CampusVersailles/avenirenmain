import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import Metier from "@/components/Metier/Metier"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import { Metier as MetierType } from "@/strapi/metiers"

const MetierPage = ({ filiere, metier }: { filiere: FiliereAvecMetiers; metier: MetierType }) => {
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
        <Metier filiere={filiere} metier={metier} />
      </Block>
    </>
  )
}

export default MetierPage
