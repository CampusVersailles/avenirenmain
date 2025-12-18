"use server"

import { getMediaUrl } from "@/lib/media_utils"
import axiosClient from "@/services/axios"
import { type BlocksContent } from "@strapi/blocks-react-renderer"

export type OrientationStrapi = {
  id: number
  bienvenue_aem: BlocksContent
  bienvenue_aem_cartes: {
    titre?: string
    description?: BlocksContent
    media?: { url: string }
  }[]
  pourquoi_choisir_description: BlocksContent
  pourquoi_choisir_raisons: {
    description: string
  }[]
  a_qui_sert_aem: {
    titre?: string
    description?: BlocksContent
    media?: { url: string }
  }[]
  ce_que_permet_aem: {
    titre?: string
    description?: BlocksContent
    media?: { url: string }
  }[]
  voies_de_formation: {
    titre?: string
    description?: BlocksContent
  }[]
}

export const getOrientation = async () => {
  const response = await axiosClient.get<{
    data: OrientationStrapi
  }>("orientation?populate[bienvenue_aem_cartes][populate][media][fields]=url")

  return {
    ...response.data.data,
    bienvenue_aem_cartes: response.data.data.bienvenue_aem_cartes.map((carte) => ({
      ...carte,
      media: carte.media ? { url: getMediaUrl(carte.media) } : undefined,
    })),
  }
}

export type Orientation = Awaited<ReturnType<typeof getOrientation>>
