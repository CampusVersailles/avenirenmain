"use server"

import { AddressResult } from "@/components/AdresseAutocomplete/AdresseAutocomplete"
import { getMediaUrl } from "@/lib/media_utils"
import axiosClient from "@/services/axios"
import { ReferencerForm } from "@/types/formation"

export type Option = {
  value: string
  label: string
}

export type FilterType = {
  search: string
  city: AddressResult | null
  filiere: string
  diplome: string
  alternance: string
  duree: string
  romeCode: string
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
const formationPopulateParams =
  "populate[adresse]=*&populate[formationNiveau][fields]=label&populate[formationDuree][fields]=label&populate[filieres][populate][icone][fields]=url"
export const getFormations = async (filter: FilterType, page: number, withCoordinates: boolean) => {
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
    if (filter.romeCode) {
      filterQuery += `&filters[romeCodeMetiers][code][$contains]=${filter.romeCode}`
    }
  }
  if (withCoordinates) {
    filterQuery += "&withCoordinates=true"
  }

  const response = await axiosClient.get<{
    data: { formations: FormationStrapi[]; coordinates: Coordinates[] }
    meta: {
      pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
      }
    }
  }>(`formations?${formationPopulateParams}&pagination[page]=${page}&pagination[pageSize]=10${filterQuery}`)

  return {
    formations: response.data.data.formations.map((formation) => ({
      ...formation,
      filieres: formation.filieres.map((filiere) => ({
        ...filiere,
        icone: filiere.icone?.url ? { url: getMediaUrl(filiere.icone) } : undefined,
      })),
    })),
    coordinates: response.data.data.coordinates,
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
    data: { formations: FormationStrapi[] }
  }>(
    `formations?${formationPopulateParams}&filters[romeCodeMetiers][code][$eq]=${romeCode}&pagination[pageSize]=${maxResults}`,
  )

  return response.data.data.formations.map((formation) => ({
    ...formation,
    filieres: formation.filieres.map((filiere) => ({
      ...filiere,
      icone: filiere.icone?.url ? { url: getMediaUrl(filiere.icone) } : undefined,
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

export const getFormationsCoordinates = async () => {
  const response =
    await axiosClient.get<{ longitude: number; latitude: number; documentId: string }[]>("formations/coordinates")

  return response.data
}
export type Coordinates = Awaited<ReturnType<typeof getFormationsCoordinates>>[number]

export const getFormationByDocumentId = async (documentId: string): Promise<Formation | null> => {
  const response = await axiosClient.get<{ data: FormationStrapi }>(
    `formations/${documentId}?${formationPopulateParams}`,
  )
  return {
    ...response.data.data,
    filieres: response.data.data.filieres.map((filiere) => ({
      ...filiere,
      icone: filiere.icone?.url ? { url: getMediaUrl(filiere.icone) } : undefined,
    })),
  }
}

export const submitFormation = async (formationForm: ReferencerForm) => {
  const response = await axiosClient.post("/formations?status=draft", {
    data: {
      ...formationForm,
      romeCodeMetiers: formationForm.romeCodeMetiers.map((romeCode) => ({ code: romeCode })),
      origine: "Site",
    },
  })
  return response.data
}
