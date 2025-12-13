import { FiliereAvecMetiersSansMedia } from "@/strapi/filieres"
import Tiles from "./Tiles"
import Search from "../Search/Search"
import styles from "./Home.module.css"

const Home = ({
  formationsCount,
  metiersCount,
  filieres,
}: {
  formationsCount: number
  metiersCount: number
  filieres: FiliereAvecMetiersSansMedia[]
}) => {
  return (
    <div className={styles.container}>
      <Search filieres={filieres} />
      <Tiles formationsCount={formationsCount} metiersCount={metiersCount} />
    </div>
  )
}

export default Home
