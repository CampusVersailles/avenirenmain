import axiosClient from "@/services/axios"
import { type BlocksContent } from "@strapi/blocks-react-renderer"
import { MetierStrapi } from "./metier"

type FiliereStrapi = {
  id: number
  documentId: string
  titre: string
  nom: string
  video: { url: string }
  icone: { url: string }
  description: BlocksContent
  metiers: MetierStrapi[]
  domainesPro: {
    code: string
    description: string
  }[]
}

export const getFilieres = async () => {
  const response = await axiosClient.get<{
    data: Omit<FiliereStrapi, "metiers">[]
  }>("filieres?populate=video&populate=icone")

  return response.data.data.map((filiere) => ({
    ...filiere,
    video: `${process.env.STRAPI_URL}${filiere.video.url}`,
    icone: `${process.env.STRAPI_URL}${filiere.icone.url}`,
  }))
}

export type Filiere = Awaited<ReturnType<typeof getFilieres>>[number]

export const getFiliereById = async (filiereDocumentId: string) => {
  const response = await axiosClient.get<{
    data: FiliereStrapi
  }>(`filieres/${filiereDocumentId}?populate=*`)
  return response.data.data
}

export type FiliereAvecMetiers = Awaited<ReturnType<typeof getFiliereById>>
