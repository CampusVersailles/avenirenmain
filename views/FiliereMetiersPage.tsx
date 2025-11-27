import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import FiliereMetiers from "@/components/FiliereMetier/FiliereMetiers"
import { FiliereAvecMetiers } from "@/strapi/filieres"

const FiliereMetiersPage = ({ filiere }: { filiere: FiliereAvecMetiers }) => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Filières", href: "/filieres" },
          { label: filiere.nom, href: `/filieres/${filiere.documentId}` },
        ]}
      />
      <Block>
        <FiliereMetiers filiere={filiere} />
      </Block>
    </>
  )
}

export default FiliereMetiersPage
