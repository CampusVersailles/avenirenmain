import Block from "@/components/Block/Block"
import Banner from "@/components/Home/Banner"
import Tiles from "@/components/Home/Tiles"

const HomePage = ({ formationsCount, metiersCount }: { formationsCount: number; metiersCount: number }) => {
  return (
    <>
      <Block>
        <Banner />
      </Block>
      <Block>
        <Tiles formationsCount={formationsCount} metiersCount={metiersCount} />
      </Block>
    </>
  )
}

export default HomePage
