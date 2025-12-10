"use client"
import { useRouter } from "next/navigation"
import Formation from "./Formation"
import { FilterType, type Option, Formation as FormationType, Coordinates } from "@/strapi/formations"
import Filter from "./Filter/Filter"
import Pagination from "./Pagination"
import styles from "./Formations.module.css"
import { Metier } from "@/strapi/metiers"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const FormationsMap = dynamic(() => import("@/components/Formation/Map/FormationsMap"), {
  ssr: false,
  loading: () => <div>Chargement de la carte...</div>,
})

const Formations = ({
  filieres,
  niveaux,
  durees,
  formations,
  pagination,
  filters,
  metier,
  coordinates,
  showMap,
}: {
  filieres: Option[]
  niveaux: Option[]
  durees: Option[]
  formations: FormationType[]
  pagination: { page: number; pageSize: number; pageCount: number; total: number }
  filters: FilterType
  metier: Metier | null
  coordinates: Coordinates[]
  showMap: boolean
}) => {
  const router = useRouter()
  const [selectedFormation, setSelectedFormation] = useState<FormationType | null>(null)
  const [extraFormation, setExtraFormation] = useState<FormationType | null>(null)

  useEffect(() => {
    if (selectedFormation && showMap) {
      const element = document.getElementById(`formation-${selectedFormation.id}`)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }
    }
  }, [selectedFormation, showMap])

  const updateURL = (newFilters: FilterType, page: number, map: boolean | undefined) => {
    setSelectedFormation(null)
    setExtraFormation(null)

    const params = new URLSearchParams()
    let scroll = false
    if (map) {
      params.set("map", "1")
    }
    if (newFilters.search) {
      params.set("search", newFilters.search)
    }
    if (newFilters.filiere) {
      params.set("filiere", newFilters.filiere)
    }
    if (newFilters.diplome) {
      params.set("diplome", newFilters.diplome)
    }
    if (newFilters.alternance) {
      params.set("alternance", newFilters.alternance)
    }
    if (newFilters.duree) {
      params.set("duree", newFilters.duree)
    }
    if (newFilters.romeCode) {
      params.set("romeCode", newFilters.romeCode)
    }
    if (newFilters.city) {
      params.set("city", newFilters.city.properties.label)
      params.set("lat", newFilters.city.geometry.coordinates[1].toString())
      params.set("lon", newFilters.city.geometry.coordinates[0].toString())
      if (newFilters.city.properties.name) {
        params.set("name", newFilters.city.properties.name)
      }
      if (newFilters.city.properties.postcode) {
        params.set("postcode", newFilters.city.properties.postcode)
      }
      if (newFilters.city.properties.citycode) {
        params.set("citycode", newFilters.city.properties.citycode)
      }
    }
    if (page > 1) {
      scroll = true
      params.set("page", page.toString())
    }

    const queryString = params.toString()
    router.push(queryString ? `?${queryString}` : "/formations", { scroll })
  }

  if (showMap) {
    return (
      <>
        <div className={styles.mapView}>
          <Filter
            filters={filters}
            updateURL={updateURL}
            filieres={filieres}
            niveaux={niveaux}
            durees={durees}
            page={pagination.page}
            totalResults={pagination.total}
            metier={metier}
            mapMode
          />
          <div className={styles.tooSmall}>
            <p>Votre écran est trop petit pour afficher la carte</p>
            <button className={styles.button} onClick={() => updateURL(filters, pagination.page, false)}>
              Revenir aux résultats
            </button>
          </div>
          <div className={styles.mapContent}>
            {formations.length > 0 && (
              <div className={styles.mapSidebar}>
                <button className={styles.button} onClick={() => updateURL(filters, pagination.page, false)}>
                  Masquer la carte
                </button>
                <div className={styles.formations}>
                  {extraFormation && (
                    <div key={extraFormation.id} id={`formation-${extraFormation.id}`}>
                      <Formation
                        formation={extraFormation}
                        selected={selectedFormation?.id === extraFormation.id}
                        onClick={() => setSelectedFormation(extraFormation)}
                      />
                    </div>
                  )}
                  {formations.map((formation) => (
                    <div key={formation.id} id={`formation-${formation.id}`}>
                      <Formation
                        formation={formation}
                        selected={selectedFormation?.id === formation.id}
                        onClick={() => setSelectedFormation(formation)}
                      />
                    </div>
                  ))}
                </div>
                {pagination.pageCount > 1 && (
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.pageCount}
                    onPageChange={(page) => updateURL(filters, page, showMap)}
                    mapMode
                  />
                )}
              </div>
            )}
            <div className={styles.mapContainer}>
              <FormationsMap
                formations={formations}
                coordinates={coordinates}
                selectedFormation={selectedFormation}
                onSelectFormation={setSelectedFormation}
                city={filters.city}
                onAddFormation={setExtraFormation}
              />
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Filter
        filters={filters}
        updateURL={updateURL}
        filieres={filieres}
        niveaux={niveaux}
        durees={durees}
        page={pagination.page}
        totalResults={pagination.total}
        metier={metier}
      />

      <div className={styles.formations}>
        {formations.length > 0 && formations.map((formation) => <Formation formation={formation} key={formation.id} />)}
      </div>

      {formations.length > 0 && pagination.pageCount > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pageCount}
          onPageChange={(page) => updateURL(filters, page, showMap)}
        />
      )}
    </>
  )
}

export default Formations
