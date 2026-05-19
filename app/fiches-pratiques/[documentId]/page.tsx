import { getFichePratique } from "@/strapi/ressources"
import FichePratiquePage from "@/views/FichePratiquePage"
import { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ documentId: string }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { documentId } = await props.params
  const fiche = await getFichePratique(documentId).catch(() => null)

  if (fiche) {
    return {
      title: `${fiche.titre} | L'Avenir en Main`,
    }
  }

  return parent as Metadata
}

export const dynamic = "force-dynamic"

export default async function FichePratique({ params }: Props) {
  const { documentId } = await params
  const fiche = await getFichePratique(documentId)

  if (!fiche) {
    notFound()
  }

  return <FichePratiquePage fiche={fiche} />
}
