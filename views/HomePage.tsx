import Block from "@/components/Block/Block"
import Banner from "@/components/Home/Banner"
import Tiles from "@/components/Home/Tiles"

const HomePage = () => {
  return (
    <>
      <Block>
        <Banner />
      </Block>
      <Block>
        <Tiles />
      </Block>
    </>
  )
}

export default HomePage
