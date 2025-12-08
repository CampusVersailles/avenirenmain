import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import ConfirmationReferencement from "@/components/Referencer/confirmation/ConfirmationReferencement"

const ConfirmationPage = () => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Formations", href: "/formations" },
          { label: "Référencer", href: "/formations/referencer" },
          { label: "Confirmation", href: "/formations/referencer/confirmation" },
        ]}
      />
      <Block>
        <ConfirmationReferencement />
      </Block>
    </>
  )
}

export default ConfirmationPage
