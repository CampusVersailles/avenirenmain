import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import { getDispositifsFinancement } from "@/strapi/financement"
import FinancementPage from "@/views/FinancementPage"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Dispositifs d'accompagnement | L'Avenir en Main",
}

export const dynamic = "force-dynamic"

export default async function Financement() {
  const { dispositifs, meta } = await getDispositifsFinancement()
  if (!dispositifs || !meta) {
    notFound()
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/ressources" },
          { label: "Guide de l'entrepreneuriat", href: "/guide-de-l-entrepreneuriat" },
          { label: "Dispositifs d'accompagnement", href: "/guide-de-l-entrepreneuriat/accompagnement" },
        ]}
      />
      <FinancementPage dispositifs={dispositifs} meta={meta} />
    </>
  )
}
