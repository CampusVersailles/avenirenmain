import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import RessourceBanner from "@/components/Ressources/RessourceBanner"
import RessourcesTiles from "@/components/Ressources/RessourcesTiles"
import { RessourcePageStrapi } from "@/strapi/ressources"

const RessourcesPage = ({ ressource }: { ressource: RessourcePageStrapi }) => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/ressources" },
        ]}
      />
      <Block>
        <RessourceBanner ressource={ressource} />
      </Block>
      <Block>
        <RessourcesTiles />
      </Block>
    </>
  )
}

export default RessourcesPage
