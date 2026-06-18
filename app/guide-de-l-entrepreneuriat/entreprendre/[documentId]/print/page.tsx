import FichePratiquePrintDocument from "@/components/Ressources/FichePratiquePrintDocument"
import { getFicheFormation } from "@/strapi/guide"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ documentId: string }>
}

export const dynamic = "force-dynamic"

export default async function FicheFormationPrintPage({ params }: Props) {
  const { documentId } = await params
  const fiche = await getFicheFormation(documentId)

  if (!fiche) {
    notFound()
  }

  return <FichePratiquePrintDocument fiche={fiche} />
}
