import Block from "@/components/Block/Block"
import Metier from "@/components/Metier/Metier"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import { Formation } from "@/strapi/formations"
import { Metier as MetierType } from "@/strapi/metier"

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
    <Block>
      <Metier filiere={filiere} metier={metier} formations={formations} />
    </Block>
  )
}

export default MetierPage
