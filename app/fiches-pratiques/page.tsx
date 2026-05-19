import { getFichesPratiques } from "@/strapi/ressources"
import FichesPratiquesPage from "@/views/FichesPratiquesPage"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Fiches pratiques | L’Avenir en Main",
}

export const dynamic = "force-dynamic"

export default async function FichesPratiques() {
  const { fiches, meta } = await getFichesPratiques()
  if (!fiches || !meta) {
    notFound()
  }
  return <FichesPratiquesPage fiches={fiches} meta={meta} />
}
