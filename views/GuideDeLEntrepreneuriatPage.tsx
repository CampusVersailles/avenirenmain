import Block from "@/components/Block/Block"
import GuideBanner from "@/components/Ressources/GuideBanner"
import GuideTiles from "@/components/Ressources/GuideTiles"
import { RessourcePageStrapi } from "@/strapi/ressources"

const GuideDeLEntrepreneuriatPage = ({ guide }: { guide: RessourcePageStrapi }) => {
  return (
    <>
      <Block>
        <GuideBanner guide={guide} />
      </Block>
      <Block>
        <GuideTiles />
      </Block>
    </>
  )
}

export default GuideDeLEntrepreneuriatPage
