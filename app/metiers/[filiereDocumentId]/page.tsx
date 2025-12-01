import { getDomainesPro, getFiliereById } from "@/strapi/filieres"
import FiliereMetiersPage from "@/views/FiliereMetiersPage"
import { notFound } from "next/navigation"

export default async function FiliereMetiers({ params }: { params: Promise<{ filiereDocumentId: string }> }) {
  const { filiereDocumentId } = await params
  const [filiere, domainesPro] = await Promise.all([
    getFiliereById(filiereDocumentId).catch(() => null),
    getDomainesPro(),
  ])

  if (!filiere) {
    notFound()
  }
  return <FiliereMetiersPage filiere={filiere} domainesPro={domainesPro} />
}
