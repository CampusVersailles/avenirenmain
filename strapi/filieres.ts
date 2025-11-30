"use server"

import axiosClient from "@/services/axios"
import { MetierStrapi } from "./metiers"

type FiliereStrapi = {
  id: number
  documentId: string
  titre: string
  nom: string
  video: { url: string }
  icone: { url: string }
  description: string
  metiers: MetierStrapi[]
  domainesPro: {
    code: string
    description: string
  }[]
}

export const getFilieresAndMetiersDocumentIdsOnly = async () => {
  const response = await axiosClient.get<{
    data: {
      documentId: string
      metiers: {
        documentId: string
      }[]
    }[]
  }>("filieres?fields[0]=documentId&populate[metiers][fields][0]=documentId")
  return response.data.data
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
  }>(
    `filieres/${filiereDocumentId}?populate[icone][fields]=url&populate[metiers][populate]=mediaPrincipal&populate=domainesPro&populate[metiers][populate]=codeRomeMetier`,
  )

  return {
    ...response.data.data,
    metiers: response.data.data.metiers
      .filter((metier) => !metier.appellation)
      .sort((a, b) => a.titre.localeCompare(b.titre))
      .map((metier) => ({
        ...metier,
        mediaPrincipal: metier.mediaPrincipal
          ? { url: `${process.env.STRAPI_URL}${metier.mediaPrincipal.url}` }
          : undefined,
      })),
    icone: `${process.env.STRAPI_URL}${response.data.data.icone.url}`,
  }
}

export type FiliereAvecMetiers = Awaited<ReturnType<typeof getFiliereById>>

export const getDomainesPro = async () => {
  const response = await axiosClient.get<{
    data: FiliereStrapi[]
  }>("filieres?populate=domainesPro")
  return response.data.data.flatMap((filiere) => filiere.domainesPro)
}
