import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import Orientation from "@/components/Orientation/Orientation"
import { Orientation as OrientationType } from "@/strapi/orientation"

const OrientationPage = ({ orientation }: { orientation: OrientationType }) => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "À propos", href: "/a-propos" },
        ]}
      />
      <Block>
        <Orientation orientation={orientation} />
      </Block>
    </>
  )
}

export default OrientationPage
