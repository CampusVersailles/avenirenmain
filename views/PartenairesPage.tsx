import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import PartenairesCarousel from "@/components/Partenaires/PartenairesCarousel"
import { Partenaire } from "@/strapi/partenaires"

const PartenairesPage = async ({ partenaires }: { partenaires: Partenaire[] }) => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Qui sommes-nous ?", href: "/qui-sommes-nous" },
        ]}
      />
      <Block>
        <PartenairesCarousel partenaires={partenaires} />
      </Block>
    </>
  )
}

export default PartenairesPage
