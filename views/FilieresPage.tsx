import Block from "@/components/Block/Block"
import Filieres from "@/components/Filiere/Filieres"
import FormationsBanner from "@/components/Filiere/FormationsBanner"
import { Filiere } from "@/strapi/filieres"

const FilieresPage = ({ filieres }: { filieres: Filiere[] }) => {
  return (
    <>
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
