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
  voies_de_formation_diagramme: { url: string }
}

export const getOrientation = async () => {
  const response = await axiosClient.get<{
    data: OrientationStrapi
  }>(
    "orientation?populate[bienvenue_aem_cartes][populate][media][fields]=url&populate[pourquoi_choisir_raisons][populate]=*&populate[a_qui_sert_aem][populate][media][fields]=url&populate[ce_que_permet_aem][populate][media][fields]=url&populate[voies_de_formation][populate]=*&populate[voies_de_formation_diagramme][populate]",
  )

  return {
    ...response.data.data,
    bienvenue_aem_cartes: response.data.data.bienvenue_aem_cartes.map((carte) => ({
      ...carte,
      media: carte.media ? { url: getMediaUrl(carte.media) } : undefined,
    })),
    a_qui_sert_aem: response.data.data.a_qui_sert_aem.map((carte) => ({
      ...carte,
      media: carte.media ? { url: getMediaUrl(carte.media) } : undefined,
    })),
    ce_que_permet_aem: response.data.data.ce_que_permet_aem.map((carte) => ({
      ...carte,
      media: carte.media ? { url: getMediaUrl(carte.media) } : undefined,
    })),
    voies_de_formation_diagramme: response.data.data.voies_de_formation_diagramme.url
      ? { url: getMediaUrl(response.data.data.voies_de_formation_diagramme) }
      : undefined,
  }
}

export type Orientation = Awaited<ReturnType<typeof getOrientation>>
