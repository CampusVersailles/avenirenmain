"use server"

import { CityResult } from "@/components/Formation/Filter/CityAutocomplete"
import axiosClient from "@/services/axios"

export type Option = {
  value: string
  label: string
}

export type FilterType = {
  search: string
  city: CityResult | null
  filiere: string
  diplome: string
  alternance: string
  duree: string
}

export const getFormations = async (filter?: FilterType, signal?: AbortSignal) => {
  let filterQuery = ""
  if (filter) {
    if (filter.filiere) {
      filterQuery += `&filters[filieres][documentId][$eq]=${filter.filiere}`
    }
    if (filter.search) {
      filterQuery += `&fuzzy=${filter.search}`
    }
    if (filter.city) {
      filterQuery += `&latitude=${filter.city.geometry.coordinates[1]}&longitude=${filter.city.geometry.coordinates[0]}&radius=50`
    }
    if (filter.diplome) {
      filterQuery += `&filters[formationNiveaux][documentId][$eq]=${filter.diplome}`
    }
    if (filter.alternance) {
      filterQuery += `&filters[alternance][$eq]=${filter.alternance}`
    }
    if (filter.duree) {
      filterQuery += `&filters[formationDuree][documentId][$eq]=${filter.duree}`
    }
  }

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
      filieres: { documentId: string; nom: string }[]
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
  }>(`formations?populate=adresse${filterQuery}`, { signal })

  return response.data.data
}

export type Formation = Awaited<ReturnType<typeof getFormations>>[number]

export const getFormationNiveaux = async () => {
  const response = await axiosClient.get<{
    data: {
      id: number
      documentId: string
      label: string
    }[]
  }>("formation-niveaus?sort=label:asc&pagination[pageSize]=100")

  return response.data.data
}

export type Niveau = Awaited<ReturnType<typeof getFormationNiveaux>>[number]

export const getFormationDurees = async () => {
  const response = await axiosClient.get<{
    data: {
      id: number
      documentId: string
      label: string
    }[]
  }>("formation-durees?sort=label:asc&pagination[pageSize]=100")

  return response.data.data
}

export type Duree = Awaited<ReturnType<typeof getFormationDurees>>[number]
