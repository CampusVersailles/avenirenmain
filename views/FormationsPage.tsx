import Block from "@/components/Block/Block"
import Formations from "@/components/Formation/Formations"
import { type Option } from "@/strapi/formations"

const FormationsPage = ({ filieres, niveaux, durees }: { filieres: Option[]; niveaux: Option[]; durees: Option[] }) => {
  return (
    <Block>
      <h1>Les formations</h1>
      <Formations filieres={filieres} niveaux={niveaux} durees={durees} />
    </Block>
  )
}

export default FormationsPage
