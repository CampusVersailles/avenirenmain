import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import { getFicheFormations } from "@/strapi/guide"
import FichesPratiquesPage from "@/views/FichesPratiquesPage"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Entreprendre | L'Avenir en Main",
}

export const dynamic = "force-dynamic"

export default async function FichesFormations() {
  const { fiches, meta } = await getFicheFormations()
  if (!fiches || !meta) {
    notFound()
  }
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/ressources" },
          { label: "Savoir-faire et territoires", href: "/savoir-faire-et-territoires" },
          { label: "Entreprendre", href: "/savoir-faire-et-territoires/entreprendre" },
        ]}
      />
      <FichesPratiquesPage fiches={fiches} meta={meta} placeholder='Rechercher une fiche de pré-formation' />
    </>
  )
}
