import { getFiliereById } from "@/strapi/filieres"
import { getFormationsByRomeCode } from "@/strapi/formations"
import { getMetier } from "@/strapi/metiers"
import MetierPage from "@/views/MetierPage"

export default async function FiliereMetiers({
  params,
}: {
  params: Promise<{ filiereDocumentId: string; metierDocumentId: string }>
}) {
  const { filiereDocumentId, metierDocumentId } = await params
  const [filiere, metier] = await Promise.all([getFiliereById(filiereDocumentId), getMetier(metierDocumentId)])
  const formations = await getFormationsByRomeCode({ romeCode: metier.codeRomeMetier.code })
  return <MetierPage filiere={filiere} metier={metier} formations={formations} />
}
