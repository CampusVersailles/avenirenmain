import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import { getCasPratique } from "@/strapi/guide"
import FichePratiquePage from "@/views/FichePratiquePage"
import { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ documentId: string }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { documentId } = await props.params
  const fiche = await getCasPratique(documentId).catch(() => null)

  if (fiche) {
    return {
      title: `${fiche.titre} | L'Avenir en Main`,
    }
  }

  return parent as Metadata
}

export const dynamic = "force-dynamic"

export default async function CasPratique({ params }: Props) {
  const { documentId } = await params
  const fiche = await getCasPratique(documentId)

  if (!fiche) {
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
          { label: fiche.titre, href: `/guide-de-l-entrepreneuriat/etudes-de-cas/${fiche.documentId}` },
        ]}
      />
      <FichePratiquePage fiche={fiche} noDownload />
    </>
  )
}
