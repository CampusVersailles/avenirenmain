import { getDomainesPro, getFiliereById } from "@/strapi/filieres"
import FiliereMetiersPage from "@/views/FiliereMetiersPage"
import { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ filiereDocumentId: string }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { filiereDocumentId } = await props.params
  const filiere = await getFiliereById(filiereDocumentId).catch(() => null)
  if (filiere) {
    return {
      title: `${filiere.nom} | L’Avenir en Main`,
    }
  }
  return parent as Metadata
}

export default async function FiliereMetiers({ params }: Props) {
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
