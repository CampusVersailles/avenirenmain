import Block from "@/components/Block/Block"
import Formations from "@/components/Formation/Formations"
import { Formation } from "@/strapi/formations"

const FormationsPage = ({ formations }: { formations: Formation[] }) => {
  return (
    <Block>
      <h1>Les formations</h1>
      <Formations formations={formations} />
    </Block>
  )
}

export default FormationsPage
