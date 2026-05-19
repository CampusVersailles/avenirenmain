import axiosClient from "@/services/axios"
import { withStrapiFallback } from "./safe"
import { BlocksContent } from "@strapi/blocks-react-renderer"
import { getMediaUrl } from "@/lib/media_utils"

export type RessourcePageStrapi = {
  titre: string
  description: BlocksContent
}

export const getRessourcesPage = async () => {
  return withStrapiFallback("getRessourcesPage", null, async () => {
    const response = await axiosClient.get<{
      data: RessourcePageStrapi
    }>("ressource")

    return response.data.data
  })
}

export type MetaFichePratiqueStrapi = {
  titre: string
  description: BlocksContent
}

export type FichePratiqueStrapi = {
  id: number
  documentId: string
  titre: string
  intro: BlocksContent
  type: string
  temps: string
  image?: { url: string }
}

type FichePratiqueTexteStrapi = {
  id: number
  texte: BlocksContent
}

type FichePratiqueCtaStrapi = {
  id: number
  cta: string
  texte: BlocksContent
}

type FichePratiqueTemoignageStrapi = {
  id: number
  titre: string
  citation: BlocksContent
  source: BlocksContent
}

type FichePratiqueChiffreStrapi = {
  id: number
  titre?: string
  chiffre?: string
}

export type FichePratiqueContenuStrapi = {
  id: number
  texte?: FichePratiqueTexteStrapi | null
  cta?: FichePratiqueCtaStrapi | null
  temoignage?: FichePratiqueTemoignageStrapi | null
  chiffre?: { chiffres: FichePratiqueChiffreStrapi[] } | null
  image?: { image: { url: string } } | null
}

export type FichePratiqueSousPartieStrapi = {
  id: number
  titre: string
  contenu: FichePratiqueContenuStrapi[]
}

export type FichePratiquePartieStrapi = {
  id: number
  titre: string
  sousParties: FichePratiqueSousPartieStrapi[]
}

export type FichePratiqueDetailStrapi = FichePratiqueStrapi & {
  sousTitre?: string
  parties: FichePratiquePartieStrapi[]
}

export const getFichesPratiques = async () => {
  const [fiches, meta] = await Promise.all([
    withStrapiFallback("getFichesPratiques", [] as FichePratiqueStrapi[], async () => {
      const response = await axiosClient.get<{
        data: FichePratiqueStrapi[]
      }>("fiches?populate[image][fields]=url")
      return response.data.data.map((fiche) => ({
        ...fiche,
        image: fiche.image ? { url: getMediaUrl(fiche.image) } : undefined,
      }))
    }),

    withStrapiFallback("getFichesPratiquesMeta", null, async () => {
      const response = await axiosClient.get<{
        data: MetaFichePratiqueStrapi
      }>("fiche-pratique")
      return response.data.data
    }),
  ])

  return { fiches, meta }
}

export const getFichePratique = async (documentId: string) => {
  return withStrapiFallback("getFichePratique", null, async () => {
    const response = await axiosClient.get<{
      data: FichePratiqueDetailStrapi
    }>(
      `fiches/${documentId}?populate=parties&populate=parties.sousParties&populate=parties.sousParties.contenu&populate=parties.sousParties.contenu.texte&populate=parties.sousParties.contenu.image&populate=parties.sousParties.contenu.image.image&populate=parties.sousParties.contenu.chiffre&populate=parties.sousParties.contenu.chiffre.chiffres&populate=parties.sousParties.contenu.cta&populate=parties.sousParties.contenu.temoignage&populate=image`,
    )

    const fiche = response.data.data

    return {
      ...fiche,
      image: fiche.image ? { url: getMediaUrl(fiche.image) } : undefined,
      parties: (fiche.parties || []).map((partie) => ({
        ...partie,
        sousParties: (partie.sousParties || []).map((sousPartie) => ({
          ...sousPartie,
          contenu: (sousPartie.contenu || []).map((item) => ({
            ...item,
            image: item.image ? { image: { url: getMediaUrl(item.image.image) } } : null,
          })),
        })),
      })),
    }
  })
}
