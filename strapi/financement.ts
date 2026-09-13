import { withStrapiFallback } from "./safe"
import axiosClient from "@/services/axios"
import { MetaFichePratiqueStrapi } from "./ressources"
import { BlocksContent } from "@strapi/blocks-react-renderer"

export type DispositifFinancementStrapi = {
  id: number
  titre: string
  sousTitre: string
  type: string
  echelle: string
  objectifs: { objectif: string }[]
  besoins: { besoin: string }[]
  acteurs: { acteur: string }[]
  lien: string
  description: BlocksContent
}

export const getDispositifsFinancement = async () => {
  const [dispositifs, meta] = await Promise.all([
    withStrapiFallback("getDispositifs", [] as DispositifFinancementStrapi[], async () => {
      const response = await axiosClient.get<{
        data: DispositifFinancementStrapi[]
      }>("dispositifs?populate=*")
      return response.data.data
    }),

    withStrapiFallback("getDispositifsMeta", null, async () => {
      const response = await axiosClient.get<{
        data: MetaFichePratiqueStrapi
      }>("dispositif-intro")
      return response.data.data
    }),
  ])

  return { dispositifs, meta }
}
