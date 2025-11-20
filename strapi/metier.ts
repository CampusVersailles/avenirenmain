import axiosClient from "@/services/axios"
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer"

export const getMetiers = async () => {
  const response = await axiosClient.get<{ data: { titre: string; description: BlocksContent }[] }>("metiers")
  return response.data.data
}
