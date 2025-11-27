"use server"

import axiosClient from "@/services/axios"
import { type BlocksContent } from "@strapi/blocks-react-renderer"

export type MetierStrapi = {
  id: number
  titre: string
  codeRomeMetier: { code: string }
  mediaPrincipal: { url: string }
  description: BlocksContent
}

export const getMetier = async (metierDocumentId: string) => {
  const response = await axiosClient.get<{
    data: MetierStrapi
  }>(`metiers/${metierDocumentId}?populate=*`)
  return response.data.data
}

export type Metier = Awaited<ReturnType<typeof getMetier>>

export const countMetiers = async () => {
  const response = await axiosClient.get<{
    meta: {
      pagination: {
        total: number
      }
    }
  }>("metiers?pagination[pageSize]=1")

  return response.data.meta.pagination.total
}
