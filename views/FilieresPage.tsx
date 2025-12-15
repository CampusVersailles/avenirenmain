import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import Filieres from "@/components/Filiere/Filieres"
import FormationsBanner from "@/components/Filiere/FormationsBanner"
import { FiliereAvecMetiers } from "@/strapi/filieres"

const FilieresPage = ({ filieres }: { filieres: FiliereAvecMetiers[] }) => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Filières", href: "/metiers" },
        ]}
      />
      <Block>
        <Filieres filieres={filieres} />
      </Block>
      <Block>
        <FormationsBanner />
      </Block>
    </>
  )
}

export default FilieresPage
