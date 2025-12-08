import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import Referencer from "@/components/Referencer/Referencer"
import { FilieresAvecMetiersRomeCodes } from "@/strapi/filieres"
import { type Option } from "@/strapi/formations"

const ReferencerPage = ({
  filieresAvecMetiersRomeCodes,
  filieres,
  niveaux,
  durees,
}: {
  filieresAvecMetiersRomeCodes: FilieresAvecMetiersRomeCodes[]
  filieres: Option[]
  niveaux: Option[]
  durees: Option[]
}) => {
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
        <h1>Référencer ma formation</h1>
        <Referencer
          filieresAvecMetiersRomeCodes={filieresAvecMetiersRomeCodes}
          filieres={filieres}
          niveaux={niveaux}
          durees={durees}
        />
      </Block>
    </>
  )
}

export default ReferencerPage
