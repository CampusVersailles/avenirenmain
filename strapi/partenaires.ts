"use server"

import axiosClient from "@/services/axios"
import { getMediaUrl } from "@/lib/media_utils"
import { BlocksContent } from "@strapi/blocks-react-renderer"
import { withStrapiFallback } from "./safe"

export type PartenaireStrapi = {
  id: number
  documentId: string
  nom: string
  type: string
  logo?: { url: string }
  description?: BlocksContent
  site: string
}

export const getPartenaires = async () => {
  return withStrapiFallback("getPartenaires", [], async () => {
    const response = await axiosClient.get<{
      data: PartenaireStrapi[]
    }>("partenaires?populate[logo][fields]=url&pagination[pageSize]=1000")

    return response.data.data.map((partenaire) => ({
      ...partenaire,
      logo: partenaire.logo ? getMediaUrl(partenaire.logo) : null,
    }))
  })
}
export type Partenaire = Awaited<ReturnType<typeof getPartenaires>>[number]
