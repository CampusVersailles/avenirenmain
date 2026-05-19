import { getRessourcesPage } from "@/strapi/ressources"
import RessourcesPage from "@/views/RessourcesPage"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Ressources | L’Avenir en Main",
}

export const dynamic = "force-dynamic"

export default async function Ressources() {
  const ressource = await getRessourcesPage()
  if (!ressource) {
    notFound()
  }
  return <RessourcesPage ressource={ressource} />
}
