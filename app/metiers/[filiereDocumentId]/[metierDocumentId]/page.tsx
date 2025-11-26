import { getFiliereById } from "@/strapi/filieres"
import { getMetier } from "@/strapi/metier"
import MetierPage from "@/views/MetierPage"

export default async function FiliereMetiers({
  params,
}: {
  params: Promise<{ filiereDocumentId: string; metierDocumentId: string }>
}) {
  const { filiereDocumentId, metierDocumentId } = await params
  const [filiere, metier] = await Promise.all([getFiliereById(filiereDocumentId), getMetier(metierDocumentId)])
  return <MetierPage filiere={filiere} metier={metier} />
}
