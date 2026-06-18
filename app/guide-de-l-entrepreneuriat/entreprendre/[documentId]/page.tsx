import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import { getFicheFormation } from "@/strapi/guide"
import FichePratiquePage from "@/views/FichePratiquePage"
import { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ documentId: string }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { documentId } = await props.params
  const fiche = await getFicheFormation(documentId).catch(() => null)

  if (fiche) {
    return {
      title: `${fiche.titre} | L'Avenir en Main`,
    }
  }

  return parent as Metadata
}

export const dynamic = "force-dynamic"

export default async function FicheFormation({ params }: Props) {
  const { documentId } = await params
  const fiche = await getFicheFormation(documentId)

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
          { label: "Entreprendre", href: "/guide-de-l-entrepreneuriat/entreprendre" },
          { label: fiche.titre, href: `/guide-de-l-entrepreneuriat/entreprendre/${fiche.documentId}` },
        ]}
      />
      <FichePratiquePage fiche={fiche} />
    </>
  )
}
