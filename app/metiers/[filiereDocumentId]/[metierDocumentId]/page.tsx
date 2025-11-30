import { getDomainesPro, getFiliereById, getFilieresAndMetiersDocumentIdsOnly } from "@/strapi/filieres"
import { getFormationsByRomeCode } from "@/strapi/formations"
import { getMetier } from "@/strapi/metiers"
import MetierPage from "@/views/MetierPage"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const filieresWithMetiers = await getFilieresAndMetiersDocumentIdsOnly()

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
  const [filiere, metier, domainesPro] = await Promise.all([
    getFiliereById(filiereDocumentId),
    getMetier(metierDocumentId),
    getDomainesPro(),
  ])

  if (!filiere || !metier) {
    notFound()
  }

  const formations = await getFormationsByRomeCode({ romeCode: metier.codeRomeMetier.code })
  return <MetierPage filiere={filiere} metier={metier} formations={formations} domainesPro={domainesPro} />
}
