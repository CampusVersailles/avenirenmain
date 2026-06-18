import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import { getEtudesDeCas } from "@/strapi/guide"
import EtudeDeCasPage from "@/views/EtudeDeCasPage"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Études de cas | L’Avenir en Main",
}

export const dynamic = "force-dynamic"

export default async function EtudesDeCas() {
  const { fiches, meta } = await getEtudesDeCas()
  if (!fiches || !meta) {
    notFound()
  }
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/ressources" },
          { label: "Guide de l'entrepreneuriat", href: "/guide-de-l-entrepreneuriat" },
          { label: "Études de cas", href: "/guide-de-l-entrepreneuriat/etudes-de-cas" },
        ]}
      />
      <EtudeDeCasPage cas={fiches} meta={meta} />
    </>
  )
}
