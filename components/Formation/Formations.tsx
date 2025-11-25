"use client"

import { useEffect, useState, useRef } from "react"
import Formation from "./Formation"
import { FilterType, getFormations, type Option, Formation as FormationType } from "@/strapi/formations"
import Filter from "./Filter/Filter"
import styles from "./Formations.module.css"
import { CityResult } from "./Filter/CityAutocomplete"

const Formations = ({ filieres, niveaux, durees }: { filieres: Option[]; niveaux: Option[]; durees: Option[] }) => {
  const [filteredFormations, setFilteredFormations] = useState<FormationType[] | null>(null)
  const [filters, setFilters] = useState<FilterType>({
    search: "",
    city: null,
    filiere: "",
    diplome: "",
    alternance: "",
    duree: "",
  })
  const abortControllerRef = useRef<AbortController | null>(null)

  const createAbortController = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const controller = new AbortController()
    abortControllerRef.current = controller
    return controller
  }

  useEffect(() => {
    const controller = createAbortController()
    getFormations(undefined, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setFilteredFormations(data)
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching formations:", error)
        }
      })
    return () => {
      controller.abort()
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null
      }
    }
  }, [])

  const applyFilters = (newFilters: FilterType) => {
    const controller = createAbortController()

    setFilteredFormations(null)
    getFormations(newFilters, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setFilteredFormations(data)
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching formations:", error)
          if (!controller.signal.aborted) {
            setFilteredFormations([])
          }
        }
      })
  }

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    applyFilters(newFilters)
  }

  const handleCityChange = (city: CityResult | null) => {
    const newFilters = { ...filters, city }
    setFilters(newFilters)
    applyFilters(newFilters)
  }

  return (
    <>
      <Filter
        search={filters.search}
        onSearchChange={(value) => handleFilterChange("search", value)}
        city={filters.city}
        onCityChange={(value) => handleCityChange(value)}
        filieres={filieres}
        niveaux={niveaux}
        durees={durees}
        onFiliereChange={(value) => handleFilterChange("filiere", value)}
        onDiplomeChange={(value) => handleFilterChange("diplome", value)}
        onAlternanceChange={(value) => handleFilterChange("alternance", value)}
        onDureeChange={(value) => handleFilterChange("duree", value)}
      />
      <div className={styles.formations}>
        {filteredFormations ? (
          filteredFormations.map((formation) => <Formation formation={formation} key={formation.id} />)
        ) : (
          <p>Chargement des formations en cours...</p>
        )}
      </div>
    </>
  )
}

export default Formations
