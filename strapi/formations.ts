import axiosClient from "@/services/axios"

export const getFormations = async () => {
  const response = await axiosClient.get<{
    data: {
      id: number
      documentId: string
      titre: string
      nomEtablissement: string
      alternance: boolean
      siteWeb: string | null
      contact: string
      certificat: string | null
      createdAt: string
      updatedAt: string
      publishedAt: string
      filieres: string[]
      formationDuree: string | null
      formationNiveaux: string[]
      adresse: {
        id: number
        adresseComplete: string
        numeroRue: string | null
        rue: string | null
        complement: string | null
        codePostal: string
        ville: string
        pays: string
        latitude: number
        longitude: number
      }
      romeCodeMetiers: string[]
      origine: string | null
    }[]
  }>("formations?populate=*")

  return response.data.data
}

export type Formation = Awaited<ReturnType<typeof getFormations>>[number]
