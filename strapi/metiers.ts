"use server"

import axiosClient from "@/services/axios"
import { type BlocksContent } from "@strapi/blocks-react-renderer"

export type MetierStrapi = {
  id: number
  titre: string
  appellation: boolean
  codeRomeMetier: { code: string }
  mediaPrincipal?: { url: string }
  mediaSecondaire?: { url: string }
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
    environnementTravail?: BlocksContent
    notes?: BlocksContent
    opportunites?: BlocksContent
    statuts?: BlocksContent
  }
  appellations: {
    nom: string
    metier?: {
      documentId: string
    }
  }[]
  salaire: {
    valeur_basse: number
    valeur_haute: number
  }
  metiersProches: {
    nom: string
    metier?: {
      documentId: string
    }
  }[]
  filieres: {
    documentId: string
    nom: string
  }[]
  videoUrl?: string
}

export const getMetier = async (metierDocumentId: string) => {
  const response = await axiosClient.get<{
    data: MetierStrapi
  }>(
    `metiers/${metierDocumentId}?populate[mediaPrincipal][fields]=url&populate[mediaSecondaire][fields]=url&populate[appellations][populate][metier][fields]=documentId&populate[codeRomeMetier][fields]=code&populate[filieres][fields]=documentId,nom&populate[centresInterets][fields]=titre,description&populate[tachesQuotidiennes][fields]=titre,description&populate[pourquoi][fields]=environnementTravail,notes,opportunites,statuts&populate[salaire][fields]=valeur_basse,valeur_haute&populate[metiersProches][fields]=nom&populate[metiersProches][populate][metier][fields]=documentId`,
  )

  return {
    ...response.data.data,
    mediaPrincipal: response.data.data.mediaPrincipal ? { url: `${response.data.data.mediaPrincipal.url}` } : undefined,
    mediaSecondaire: response.data.data.mediaSecondaire
      ? { url: `${response.data.data.mediaSecondaire.url}` }
      : undefined,
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
  }>("metiers?pagination[pageSize]=1&filters[appellation][$eq]=false")

  return response.data.meta.pagination.total
}

export const getMetierByRomeCode = async (romeCode: string) => {
  const response = await axiosClient.get<{
    data: MetierStrapi[]
  }>(`metiers?filters[codeRomeMetier][code][$eq]=${romeCode}&populate=*`)

  return {
    ...response.data.data[0],
    mediaPrincipal: response.data.data[0].mediaPrincipal
      ? { url: `${response.data.data[0].mediaPrincipal.url}` }
      : undefined,
    mediaSecondaire: undefined,
  }
}
