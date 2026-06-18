import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import FiliereMetiers from "@/components/FiliereMetier/FiliereMetiers"
import { FiliereAvecMetiersComplets } from "@/strapi/filieres"

const FiliereMetiersPage = ({
  filiere,
  domainesPro,
}: {
  filiere: FiliereAvecMetiersComplets
  domainesPro: ({ code: string; description: string } | undefined)[]
}) => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Filières", href: "/metiers" },
          { label: filiere.nom, href: `/metiers/${filiere.documentId}` },
        ]}
      />
      <Block>
        <FiliereMetiers filiere={filiere} domainesPro={domainesPro} />
      </Block>
    </>
  )
}

export default FiliereMetiersPage
