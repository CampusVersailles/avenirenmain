import axiosClient from "@/services/axios"
import { type BlocksContent } from "@strapi/blocks-react-renderer"

export type MetierStrapi = {
  id: number
  titre: string
  codeRomeMetier: { code: string }
  mediaPrincipal: { url: string }
  description: BlocksContent
  documentId: string
  tachesQuotidiennes: {
    titre: string
    description: BlocksContent
  }[]
  centresInterets: {
    titre: string
    description: BlocksContent
  }[]
  pourquoi: {
    environnementTravail: BlocksContent
    notes: BlocksContent
    opportunites: BlocksContent
    statuts: BlocksContent
  }
}

export const getMetier = async (metierDocumentId: string) => {
  const response = await axiosClient.get<{
    data: MetierStrapi
  }>(`metiers/${metierDocumentId}?populate=*`)
  return {
    ...response.data.data,
    mediaPrincipal: `${process.env.STRAPI_URL}${response.data.data.mediaPrincipal.url}`,
  }
}

export type Metier = Awaited<ReturnType<typeof getMetier>>
