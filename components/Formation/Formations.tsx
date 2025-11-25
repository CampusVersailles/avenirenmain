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

  useEffect(() => {
    const controller = new AbortController()
    getFormations(undefined, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setFilteredFormations(data)
        }
      })
      .catch((error) => {
        // Ignore abort errors as they are intentional
        if (error.name !== "CanceledError" && error.name !== "AbortError") {
          console.error("Error fetching formations:", error)
        }
      })
    return () => controller.abort()
  }, [])

  const applyFilters = (newFilters: FilterType) => {
    // Cancel the previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create a new AbortController for this request
    const controller = new AbortController()
    abortControllerRef.current = controller

    setFilteredFormations(null)
    getFormations(newFilters, controller.signal)
      .then((data) => {
        // Only update state if this request hasn't been cancelled
        if (!controller.signal.aborted) {
          setFilteredFormations(data)
        }
      })
      .catch((error) => {
        // Ignore abort errors as they are intentional
        if (error.name !== "CanceledError" && error.name !== "AbortError") {
          console.error("Error fetching formations:", error)
          // Only clear loading state if this is the current request
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
