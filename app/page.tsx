import { countFormations } from "@/strapi/formations"
import { countMetiers } from "@/strapi/metiers"
import HomePage from "@/views/HomePage"

export default async function Home() {
  const [formationsCount, metiersCount] = await Promise.all([countFormations(), countMetiers()])
  return <HomePage formationsCount={formationsCount} metiersCount={metiersCount} />
}
