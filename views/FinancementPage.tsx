import Block from "@/components/Block/Block"
import FinancementBanner from "@/components/Ressources/FinancementBanner"
import FinancementTiles from "@/components/Ressources/FinancementTiles"
import { DispositifFinancementStrapi } from "@/strapi/financement"
import { MetaFichePratiqueStrapi } from "@/strapi/ressources"

const FinancementPage = ({
  dispositifs,
  meta,
}: {
  dispositifs: DispositifFinancementStrapi[]
  meta: MetaFichePratiqueStrapi
}) => {
  return (
    <>
      <Block>
        <FinancementBanner meta={meta} />
      </Block>
      <Block>
        <FinancementTiles dispositifs={dispositifs} />
      </Block>
    </>
  )
}

export default FinancementPage
