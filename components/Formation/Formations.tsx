"use client"

import { useEffect, useState } from "react"
import Formation from "./Formation"
import { FilterType, getFormations, type Option, Formation as FormationType } from "@/strapi/formations"
import Filter from "./Filter/Filter"
import styles from "./Formations.module.css"
import { CityResult } from "./Filter/CityAutocomplete"

const Formations = ({ filieres, niveaux, durees }: { filieres: Option[]; niveaux: Option[]; durees: Option[] }) => {
  const [filteredFormations, setFilteredFormations] = useState<FormationType[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterType>({
    search: "",
    city: null,
    filiere: "",
    diplome: "",
    alternance: "",
    duree: "",
  })

  useEffect(() => {
    getFormations()
      .then((data) => {
        setFilteredFormations(data)
        setError(null)
      })
      .catch((err) => {
        console.error("Failed to load formations:", err)
        setError("Erreur lors du chargement des formations. Veuillez réessayer plus tard.")
        setFilteredFormations(null)
      })
  }, [])

  const applyFilters = (newFilters: FilterType) => {
    setFilteredFormations(null)
    setError(null)
    getFormations(newFilters)
      .then((data) => {
        setFilteredFormations(data)
        setError(null)
      })
      .catch((err) => {
        console.error("Failed to load formations:", err)
        setError("Erreur lors du chargement des formations. Veuillez réessayer plus tard.")
        setFilteredFormations(null)
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
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : filteredFormations ? (
          filteredFormations.map((formation) => <Formation formation={formation} key={formation.id} />)
        ) : (
          <p>Chargement des formations en cours...</p>
        )}
      </div>
    </>
  )
}

export default Formations
