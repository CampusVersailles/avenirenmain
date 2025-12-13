import Block from "@/components/Block/Block"
import Banner from "@/components/Home/Banner"
import Home from "@/components/Home/Home"
import { FiliereAvecMetiersSansMedia } from "@/strapi/filieres"

const HomePage = ({
  formationsCount,
  metiersCount,
  filieres,
}: {
  formationsCount: number
  metiersCount: number
  filieres: FiliereAvecMetiersSansMedia[]
}) => {
  return (
    <>
      <Block>
        <Banner />
      </Block>
      <Block>
        <Home formationsCount={formationsCount} metiersCount={metiersCount} filieres={filieres} />
      </Block>
    </>
  )
}

export default HomePage
