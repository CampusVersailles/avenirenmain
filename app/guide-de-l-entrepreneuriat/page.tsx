import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import { getGuidePage } from "@/strapi/guide"
import GuideDeLEntrepreneuriatPage from "@/views/GuideDeLEntrepreneuriatPage"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Guide de l’entrepreneuriat | L’Avenir en Main",
}

export const dynamic = "force-dynamic"

export default async function GuideDeLEntrepreneuriat() {
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
          { label: "Guide de l’entrepreneuriat", href: "/guide-de-l-entrepreneuriat" },
        ]}
      />
      <GuideDeLEntrepreneuriatPage guide={guide} />
    </>
  )
}
