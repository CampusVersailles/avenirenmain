import { getFilieres } from "@/strapi/filieres"
import FilieresPage from "@/views/FilieresPage"

export default async function Home() {
  const filieres = await getFilieres()
  return <FilieresPage filieres={filieres} />
}
