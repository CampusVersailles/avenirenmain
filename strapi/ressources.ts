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
  sousTitre: string
  intro: BlocksContent
  type: string
  temps: string
  image?: { url: string }
}

type FichePratiqueTexteStrapi = {
  id: number
  texte: BlocksContent
  image?: { url: string }
  titre?: string
}

type FichePratiqueCtaStrapi = {
  id: number
  cta: string
  texte: BlocksContent
  sideTexte: BlocksContent
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
  unite?: string
}

export type FichePratiqueContenuStrapi = {
  id: number
  texte?: FichePratiqueTexteStrapi | null
  cta?: FichePratiqueCtaStrapi | null
  temoignage?: FichePratiqueTemoignageStrapi | null
  chiffre?: { chiffres: FichePratiqueChiffreStrapi[] } | null
  image?: { image: { url: string }; titre?: string | null; source?: string | null } | null
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

const FICHE_DETAIL_POPULATE_QUERY =
  "?populate=parties&populate=parties.sousParties&populate=parties.sousParties.contenu&populate=parties.sousParties.contenu.texte&populate=parties.sousParties.contenu.texte.image&populate=parties.sousParties.contenu.image&populate=parties.sousParties.contenu.image.image&populate=parties.sousParties.contenu.chiffre&populate=parties.sousParties.contenu.chiffre.chiffres&populate=parties.sousParties.contenu.cta&populate=parties.sousParties.contenu.temoignage&populate=image"

const transformFichePratiqueDetail = (fiche: FichePratiqueDetailStrapi): FichePratiqueDetailStrapi => ({
  ...fiche,
  image: fiche.image ? { url: getMediaUrl(fiche.image) } : undefined,
  parties: (fiche.parties || []).map((partie) => ({
    ...partie,
    sousParties: (partie.sousParties || []).map((sousPartie) => ({
      ...sousPartie,
      contenu: (sousPartie.contenu || []).map((item) => ({
        ...item,
        texte: item.texte
          ? {
              ...item.texte,
              image: item.texte.image ? { url: getMediaUrl(item.texte.image) } : undefined,
            }
          : null,
        image: item.image
          ? { image: { url: getMediaUrl(item.image.image) }, titre: item.image.titre, source: item.image.source }
          : null,
      })),
    })),
  })),
})

export const getFichePratiqueDetail = async (endpoint: string, documentId: string, fallbackName: string) => {
  return withStrapiFallback(fallbackName, null, async () => {
    const response = await axiosClient.get<{
      data: FichePratiqueDetailStrapi
    }>(`${endpoint}/${documentId}${FICHE_DETAIL_POPULATE_QUERY}`)

    return transformFichePratiqueDetail(response.data.data)
  })
}

export const getFichePratique = async (documentId: string) => {
  return getFichePratiqueDetail("fiches", documentId, "getFichePratique")
}
