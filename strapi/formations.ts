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

export type FormationStrapi = {
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
  filieres: { icone: { url: string } }[]
  formationDuree: { label: string }
  formationNiveau: { label: string }
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
}

const DEFAULT_RADIUS = 20

export const getFormations = async (filter: FilterType, page: number) => {
  let filterQuery = ""
  if (filter) {
    if (filter.filiere) {
      filterQuery += `&filters[filieres][documentId][$eq]=${filter.filiere}`
    }
    if (filter.search) {
      filterQuery += `&fuzzy=${filter.search}`
    }
    if (filter.city) {
      filterQuery += `&latitude=${filter.city.geometry.coordinates[1]}&longitude=${filter.city.geometry.coordinates[0]}&radius=${DEFAULT_RADIUS}`
    }
    if (filter.diplome) {
      filterQuery += `&filters[formationNiveau][documentId][$eq]=${filter.diplome}`
    }
    if (filter.alternance) {
      filterQuery += `&filters[alternance][$eq]=${filter.alternance}`
    }
    if (filter.duree) {
      filterQuery += `&filters[formationDuree][documentId][$eq]=${filter.duree}`
    }
  }

  const response = await axiosClient.get<{
    data: FormationStrapi[]
    meta: {
      pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
      }
    }
  }>(
    `formations?populate[adresse]=*&populate[formationNiveau][fields]=label&populate[formationDuree][fields]=label&populate[filieres][populate][icone][fields]=url&pagination[page]=${page}&pagination[pageSize]=10${filterQuery}`,
  )

  return {
    formations: response.data.data.map((formation) => ({
      ...formation,
      filieres: formation.filieres.map((filiere) => ({
        ...filiere,
        icone: filiere.icone?.url ? { url: `${process.env.STRAPI_URL}${filiere.icone.url}` } : undefined,
      })),
    })),
    pagination: response.data.meta.pagination,
  }
}

export const getFormationsByRomeCode = async ({
  romeCode,
  maxResults = 5,
}: {
  romeCode: string
  maxResults?: number
}) => {
  const response = await axiosClient.get<{
    data: FormationStrapi[]
  }>(
    `formations?populate[adresse][fields]=*&populate[filieres][populate][icone][fields]=url&filters[romeCodeMetiers][code][$eq]=${romeCode}&pagination[pageSize]=${maxResults}`,
  )

  return response.data.data.map((formation) => ({
    ...formation,
    filieres: formation.filieres.map((filiere) => ({
      ...filiere,
      icone: filiere.icone?.url ? { url: `${process.env.STRAPI_URL}${filiere.icone.url}` } : undefined,
    })),
  }))
}

export type Formation = Awaited<ReturnType<typeof getFormations>>["formations"][number]

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

export const countFormations = async () => {
  const response = await axiosClient.get<{
    meta: {
      pagination: {
        total: number
      }
    }
  }>("formations?pagination[pageSize]=1")

  return response.data.meta.pagination.total
}
