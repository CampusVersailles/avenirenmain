"use client"

import { useRouter } from "next/navigation"
import Formation from "./Formation"
import { FilterType, type Option, Formation as FormationType } from "@/strapi/formations"
import Filter from "./Filter/Filter"
import Pagination from "./Pagination"
import styles from "./Formations.module.css"
import { CityResult } from "./Filter/CityAutocomplete"
import { Metier } from "@/strapi/metiers"

const Formations = ({
  filieres,
  niveaux,
  durees,
  formations,
  pagination,
  filters,
  metier,
}: {
  filieres: Option[]
  niveaux: Option[]
  durees: Option[]
  formations: FormationType[]
  pagination: { page: number; pageSize: number; pageCount: number; total: number }
  filters: FilterType
  metier: Metier | null
}) => {
  const router = useRouter()

  const updateURL = (newFilters: FilterType, page: number) => {
    const params = new URLSearchParams()

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
      params.set("page", page.toString())
    }

    const queryString = params.toString()
    router.push(queryString ? `?${queryString}` : "/formations", { scroll: false })
  }

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    updateURL({ ...filters, [key]: value }, 1)
  }

  const handleCityChange = (city: CityResult | null) => {
    updateURL({ ...filters, city }, 1)
  }

  const handleRemoveMetier = () => {
    updateURL({ ...filters, romeCode: "" }, 1)
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
        selectedFiliere={filters.filiere}
        selectedDiplome={filters.diplome}
        selectedAlternance={filters.alternance}
        selectedDuree={filters.duree}
        onFiliereChange={(value) => handleFilterChange("filiere", value)}
        onDiplomeChange={(value) => handleFilterChange("diplome", value)}
        onAlternanceChange={(value) => handleFilterChange("alternance", value)}
        onDureeChange={(value) => handleFilterChange("duree", value)}
        totalResults={pagination.total}
        selectedRomeCode={filters.romeCode}
        metier={metier}
        onRemoveMetier={handleRemoveMetier}
      />

      <div className={styles.formations}>
        {formations.length > 0 ? (
          formations.map((formation) => <Formation formation={formation} key={formation.id} />)
        ) : (
          <p>Aucune formation trouvée.</p>
        )}
      </div>

      {formations.length > 0 && pagination.pageCount > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pageCount}
          onPageChange={(page) => updateURL(filters, page)}
        />
      )}
    </>
  )
}

export default Formations
