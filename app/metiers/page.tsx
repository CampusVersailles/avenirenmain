import { getAllFilieresAvecMetiers } from "@/strapi/filieres"
import FilieresPage from "@/views/FilieresPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Filières | L’Avenir en Main",
}

export const dynamic = "force-dynamic"

export default async function Home() {
  const filieres = await getAllFilieresAvecMetiers()
  return <FilieresPage filieres={filieres} />
}
