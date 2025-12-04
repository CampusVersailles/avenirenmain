import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import Referencer from "@/components/Referencer/Referencer"
import { type Option } from "@/strapi/formations"

const ReferencerPage = ({ filieres, niveaux, durees }: { filieres: Option[]; niveaux: Option[]; durees: Option[] }) => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Formations", href: "/formations" },
          { label: "Référencer", href: "/formations/referencer" },
        ]}
      />
      <Block>
        <Referencer filieres={filieres} niveaux={niveaux} durees={durees} />
      </Block>
    </>
  )
}

export default ReferencerPage
