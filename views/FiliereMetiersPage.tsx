import Block from "@/components/Block/Block"
import FiliereMetiers from "@/components/FiliereMetier/FiliereMetiers"
import { FiliereAvecMetiers } from "@/strapi/filieres"

const FiliereMetiersPage = ({ filiere }: { filiere: FiliereAvecMetiers }) => {
  return (
    <Block>
      <FiliereMetiers filiere={filiere} />
    </Block>
  )
}

export default FiliereMetiersPage
