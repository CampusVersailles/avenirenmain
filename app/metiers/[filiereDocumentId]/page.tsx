import { getFiliereById, getFilieres } from "@/strapi/filieres"
import FiliereMetiersPage from "@/views/FiliereMetiersPage"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const filieres = await getFilieres()

  return filieres.map((filiere) => ({
    filiereDocumentId: filiere.documentId,
  }))
}

export default async function FiliereMetiers({ params }: { params: Promise<{ filiereDocumentId: string }> }) {
  const { filiereDocumentId } = await params
  const filiere = await getFiliereById(filiereDocumentId).catch(() => null)
  if (!filiere) {
    notFound()
  }
  return <FiliereMetiersPage filiere={filiere} />
}
