"use server"

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
  appellations: {
    nom: string
    metierDisponible: boolean
    metier: {
      documentId: string
    }
  }[]
  salaire: {
    valeur_basse: number
    valeur_haute: number
  }
  metiersProches: {
    nom: string
  }[]
  filieres: {
    documentId: string
    nom: string
  }[]
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

export const getMetierByRomeCode = async (romeCode: string) => {
  const response = await axiosClient.get<{
    data: MetierStrapi[]
  }>(`metiers?filters[codeRomeMetier][code][$eq]=${romeCode}&populate=*`)
  return {
    ...response.data.data[0],
    mediaPrincipal: `${process.env.STRAPI_URL}${response.data.data[0].mediaPrincipal.url}`,
  }
}
