import axiosClient from "@/services/axios"
import { FichePratiqueStrapi, MetaFichePratiqueStrapi, RessourcePageStrapi, getFichePratiqueDetail } from "./ressources"
import { withStrapiFallback } from "./safe"
import { getMediaUrl } from "@/lib/media_utils"

export const getGuidePage = async () => {
  return withStrapiFallback("getGuidePage", null, async () => {
    const response = await axiosClient.get<{
      data: RessourcePageStrapi
    }>("guide")

    return response.data.data
  })
}

export const getFicheFormations = async () => {
  const [fiches, meta] = await Promise.all([
    withStrapiFallback("getFicheFormations", [] as FichePratiqueStrapi[], async () => {
      const response = await axiosClient.get<{
        data: FichePratiqueStrapi[]
      }>("fiche-formations?populate[image][fields]=url")
      return response.data.data.map((fiche) => ({
        ...fiche,
        image: fiche.image ? { url: getMediaUrl(fiche.image) } : undefined,
      }))
    }),

    withStrapiFallback("getFicheFormationsMeta", null, async () => {
      const response = await axiosClient.get<{
        data: MetaFichePratiqueStrapi
      }>("fiche-formation-intro")
      return response.data.data
    }),
  ])

  return { fiches, meta }
}

export const getEtudesDeCas = async () => {
  const [fiches, meta] = await Promise.all([
    withStrapiFallback("getEtudesDeCas", [] as FichePratiqueStrapi[], async () => {
      const response = await axiosClient.get<{
        data: FichePratiqueStrapi[]
      }>("cas-pratiques?populate[image][fields]=url")
      return response.data.data.map((fiche) => ({
        ...fiche,
        image: fiche.image ? { url: getMediaUrl(fiche.image) } : undefined,
      }))
    }),

    withStrapiFallback("getEtudesDeCasMeta", null, async () => {
      const response = await axiosClient.get<{
        data: MetaFichePratiqueStrapi
      }>("etude-de-cas")
      return response.data.data
    }),
  ])

  return { fiches, meta }
}

export const getFicheFormation = async (documentId: string) => {
  return getFichePratiqueDetail("fiche-formations", documentId, "getFicheFormation")
}

export const getCasPratique = async (documentId: string) => {
  return getFichePratiqueDetail("cas-pratiques", documentId, "getCasPratique")
}
