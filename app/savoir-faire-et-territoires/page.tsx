import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import { getGuidePage } from "@/strapi/guide"
import GuideDeLEntrepreneuriatPage from "@/views/GuideDeLEntrepreneuriatPage"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Savoir-faire et territoires | L'Avenir en Main",
}

export const dynamic = "force-dynamic"

export default async function SavoirFaireEtTerritoires() {
  const guide = await getGuidePage()
  if (!guide) {
    notFound()
  }
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/ressources" },
          { label: "Savoir-faire et territoires", href: "/savoir-faire-et-territoires" },
        ]}
      />
      <GuideDeLEntrepreneuriatPage guide={guide} />
    </>
  )
}
