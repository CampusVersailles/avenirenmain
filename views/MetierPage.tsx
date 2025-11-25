import Block from "@/components/Block/Block"
import Metier from "@/components/Metier/Metier"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import { Metier as MetierType } from "@/strapi/metier"

const MetierPage = ({ filiere, metier }: { filiere: FiliereAvecMetiers; metier: MetierType }) => {
  return (
    <Block>
      <Metier filiere={filiere} metier={metier} />
    </Block>
  )
}

export default MetierPage
