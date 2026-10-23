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
          { label: "Savoir-faire et territoires", href: "/savoir-faire-et-territoires" },
          { label: "Dispositifs d'accompagnement", href: "/savoir-faire-et-territoires/accompagnement" },
        ]}
      />
      <FinancementPage dispositifs={dispositifs} meta={meta} />
    </>
  )
}
