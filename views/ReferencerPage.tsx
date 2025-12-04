import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import Referencer from "@/components/Referencer/Referencer"

const ReferencerPage = () => {
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
        <Referencer />
      </Block>
    </>
  )
}

export default ReferencerPage
