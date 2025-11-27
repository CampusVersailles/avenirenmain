import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import Formations from "@/components/Formation/Formations"
import { type Option } from "@/strapi/formations"

const FormationsPage = ({ filieres, niveaux, durees }: { filieres: Option[]; niveaux: Option[]; durees: Option[] }) => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Formations", href: "/formations" },
        ]}
      />
      <Block>
        <h1>Les formations</h1>
        <Formations filieres={filieres} niveaux={niveaux} durees={durees} />
      </Block>
    </>
  )
}

export default FormationsPage
