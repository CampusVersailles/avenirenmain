import { getFiliereById, getFilieres } from "@/strapi/filieres"
import { getFormationsByRomeCode } from "@/strapi/formations"
import { getMetier } from "@/strapi/metiers"
import MetierPage from "@/views/MetierPage"

export const dynamicParams = false

export async function generateStaticParams() {
  const filieres = await getFilieres()
  const filieresWithMetiers = await Promise.all(filieres.map((filiere) => getFiliereById(filiere.documentId)))

  const results = filieresWithMetiers.flatMap((filiere) =>
    filiere.metiers.map((metier) => ({
      filiereDocumentId: filiere.documentId,
      metierDocumentId: metier.documentId,
    })),
  )

  return results
}

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
