import { getAllFilieresAvecMetiers } from "@/strapi/filieres"
import { countFormations } from "@/strapi/formations"
import { countMetiers } from "@/strapi/metiers"
import HomePage from "@/views/HomePage"

export const revalidate = 3600

export default async function Home() {
  const [formationsCount, metiersCount, filieres] = await Promise.all([
    countFormations(),
    countMetiers(),
    getAllFilieresAvecMetiers(),
  ])
  return <HomePage formationsCount={formationsCount} metiersCount={metiersCount} filieres={filieres} />
}
