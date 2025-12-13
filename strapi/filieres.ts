"use server"

import axiosClient from "@/services/axios"
import { MetierStrapi } from "./metiers"
import { getMediaUrl } from "@/lib/media_utils"

type FiliereStrapi = {
  id: number
  documentId: string
  titre: string
  nom: string
  photo: { url: string }
  icone: { url: string }
  description: string
  metiers: MetierStrapi[]
  domainesPro: {
    code: string
    description: string
  }[]
}

export const getFilieres = async () => {
  const response = await axiosClient.get<{
    data: Omit<FiliereStrapi, "metiers">[]
  }>("filieres?populate=photo&populate=icone")

  return response.data.data.map((filiere) => ({
    ...filiere,
    photo: getMediaUrl(filiere.photo),
    icone: getMediaUrl(filiere.icone),
  }))
}

export type Filiere = Awaited<ReturnType<typeof getFilieres>>[number]

export const getFilieresAvecMetiersRomeCodes = async () => {
  const response = await axiosClient.get<{ data: FiliereStrapi[] }>(
    "filieres?populate[metiers][fields][0]=id&populate[metiers][fields][1]=titre&populate[metiers][populate][codeRomeMetier][fields][0]=*",
  )

  return response.data.data
}
export type FilieresAvecMetiersRomeCodes = Awaited<ReturnType<typeof getFilieresAvecMetiersRomeCodes>>[number]

export const getFiliereById = async (filiereDocumentId: string) => {
  const response = await axiosClient.get<{
    data: FiliereStrapi
  }>(
    `filieres/${filiereDocumentId}?populate[icone][fields]=url&populate[metiers][populate][mediaPrincipal][fields]=url&populate=domainesPro&populate[metiers][populate]=codeRomeMetier&populate[metiers][populate][appellations][populate][metier][fields]=documentId`,
  )

  return {
    ...response.data.data,
    metiers: response.data.data.metiers
      .sort((a, b) => a.titre.localeCompare(b.titre))
      .map((metier) => ({
        ...metier,
        mediaPrincipal: metier.mediaPrincipal ? { url: getMediaUrl(metier.mediaPrincipal) } : undefined,
      })),
    icone: getMediaUrl(response.data.data.icone),
  }
}

export type FiliereAvecMetiers = Awaited<ReturnType<typeof getFiliereById>>

export const getAllFilieresAvecMetiers = async () => {
  const response = await axiosClient.get<{ data: FiliereStrapi[] }>(
    "filieres?populate[icone][fields]=url&populate[metiers][populate][appellations][populate][metier][fields]=documentId",
  )
  return response.data.data.map((filiere) => ({
    ...filiere,
    icone: getMediaUrl(filiere.icone),
  }))
}

export type FiliereAvecMetiersSansMedia = Awaited<ReturnType<typeof getAllFilieresAvecMetiers>>[number]

export const getDomainesPro = async () => {
  const response = await axiosClient.get<{
    data: FiliereStrapi[]
  }>("filieres?populate=domainesPro")
  return response.data.data.flatMap((filiere) => filiere.domainesPro)
}
