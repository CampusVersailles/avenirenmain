import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import Filieres from "@/components/Filiere/Filieres"
import FormationsBanner from "@/components/Filiere/FormationsBanner"
import { Filiere } from "@/strapi/filieres"

const FilieresPage = ({ filieres }: { filieres: Filiere[] }) => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Filières", href: "/filieres" },
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
