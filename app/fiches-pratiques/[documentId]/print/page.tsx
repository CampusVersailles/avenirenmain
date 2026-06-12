import FichePratiquePrintDocument from "@/components/Ressources/FichePratiquePrintDocument"
import { getFichePratique } from "@/strapi/ressources"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ documentId: string }>
}

export const dynamic = "force-dynamic"

export default async function FichePratiquePrintPage({ params }: Props) {
  const { documentId } = await params
  const fiche = await getFichePratique(documentId)

  if (!fiche) {
    notFound()
  }

  return <FichePratiquePrintDocument fiche={fiche} />
}
