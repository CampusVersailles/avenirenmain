import { getFiliereById } from "@/strapi/filieres"
import FiliereMetiersPage from "@/views/FiliereMetiersPage"

export default async function FiliereMetiers({ params }: { params: Promise<{ filiereDocumentId: string }> }) {
  const { filiereDocumentId } = await params
  const filiere = await getFiliereById(filiereDocumentId)
  return <FiliereMetiersPage filiere={filiere} />
}
