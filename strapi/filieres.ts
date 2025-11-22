import axiosClient from "@/services/axios"
import { type BlocksContent } from "@strapi/blocks-react-renderer"

export const getFilieres = async () => {
  const response = await axiosClient.get<{
    data: { id: number; titre: string; nom: string; video: { url: string }; description: BlocksContent }[]
  }>("filieres?populate=*")

  return response.data.data.map((filiere) => ({
    ...filiere,
    video: `${process.env.STRAPI_URL}${filiere.video.url}`,
  }))
}

export type Filiere = Awaited<ReturnType<typeof getFilieres>>[number]
