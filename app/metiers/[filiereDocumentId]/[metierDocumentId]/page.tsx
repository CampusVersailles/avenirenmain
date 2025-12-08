import { getDomainesPro, getFiliereById } from "@/strapi/filieres"
import { getMetier } from "@/strapi/metiers"
import MetierPage from "@/views/MetierPage"
import { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ filiereDocumentId: string; metierDocumentId: string }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { metierDocumentId } = await props.params
  const metier = await getMetier(metierDocumentId).catch(() => null)
  if (metier) {
    const description = metier.description
      .map((block) => block.children.map((child) => ("text" in child && child.text) || "").join(""))
      .join("\n")

    const image = metier.mediaPrincipal?.url
    return {
      title: `${metier.titre} | L’Avenir en Main`,
      description: description || undefined,
      openGraph: {
        title: `${metier.titre} | L’Avenir en Main`,
        description: description || undefined,
        images: image ? [{ url: image }] : undefined,
      },
    }
  }
  return parent as Metadata
}

export default async function FiliereMetiers({ params }: Props) {
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
