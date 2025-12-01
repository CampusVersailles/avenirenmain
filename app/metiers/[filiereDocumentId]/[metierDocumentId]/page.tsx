import { getDomainesPro, getFiliereById } from "@/strapi/filieres"
import { getMetier } from "@/strapi/metiers"
import MetierPage from "@/views/MetierPage"
import { notFound } from "next/navigation"

export default async function FiliereMetiers({
  params,
}: {
  params: Promise<{ filiereDocumentId: string; metierDocumentId: string }>
}) {
  const { filiereDocumentId, metierDocumentId } = await params
  const [filiere, metier, domainesPro] = await Promise.all([
    getFiliereById(filiereDocumentId).catch(() => null),
    getMetier(metierDocumentId).catch(() => null),
    getDomainesPro(),
  ])

  if (!filiere || !metier) {
    notFound()
  }

  return <MetierPage filiere={filiere} metier={metier} domainesPro={domainesPro} />
}
