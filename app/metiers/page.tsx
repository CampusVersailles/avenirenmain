import { getAllFilieresAvecMetiers, getFilieres } from "@/strapi/filieres"
import FilieresPage from "@/views/FilieresPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Filières | L’Avenir en Main",
}

export default async function Home() {
  const filieres = await getAllFilieresAvecMetiers()
  return <FilieresPage filieres={filieres} />
}
