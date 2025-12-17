"use client"

import { useState, useEffect } from "react"
import styles from "./Filter.module.css"
import SearchIcon from "@/components/Icons/SearchIcon"
import { FilterType, Option } from "@/strapi/formations"
import { Metier } from "@/strapi/metiers"
import JobIcon from "@/components/Icons/Job"
import CloseIcon from "@/components/Icons/CloseIcon"
import formationsStyles from "../Formations.module.css"
import AdresseAutocomplete, { AddressResult } from "@/components/AdresseAutocomplete/AdresseAutocomplete"
import { trackEvent } from "@/lib/gtag"

const Filter = ({
  filters,
  updateURL,
  filieres,
  niveaux,
  durees,
  totalResults,
  metier,
  mapMode,
  page,
  searching,
}: {
  filters: {
    search: string
    city: AddressResult | null
    filiere: string
    diplome: string
    alternance: string
    duree: string
    romeCode: string
  }
  updateURL: (newFilters: FilterType, page: number, map: boolean | undefined) => void
  filieres: Option[]
  niveaux: Option[]
  durees: Option[]
  totalResults: number
  metier: Metier | null
  mapMode?: boolean
  page: number
  searching: boolean
}) => {
  const [text, setText] = useState(filters.search)
  const [showMoreFilters, setShowMoreFilters] = useState(false)

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (filters.search !== text) {
        trackEvent(`formation_recherche_${text}`)
        updateURL({ ...filters, search: text }, 1, mapMode)
      }
    }, 300)

    return () => clearTimeout(debounce)
  }, [text])

  return (
    <div className={mapMode ? styles.filterMap : styles.filter}>
      {filters.romeCode && metier && (
        <div className={styles.row}>
          <div className={styles.searchField}>
            <label htmlFor='romeCode'>Métier sélectionné</label>
            <div className={styles.metierWrapper}>
              <JobIcon />
              <p className={styles.metierTitle}>{metier.titre}</p>
              <button onClick={() => updateURL({ ...filters, romeCode: "" }, 1, mapMode)} className={styles.button}>
                <CloseIcon className={styles.closeIcon} />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.row}>
        <div className={styles.searchField}>
          <label htmlFor='search'>Recherche ta formation</label>
          <div className={styles.inputWrapper}>
            <SearchIcon />
            <input
              id='search'
              type='text'
              placeholder='Recherche ta formation'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.searchField}>
          <label htmlFor='adresse'>Ville</label>
          <AdresseAutocomplete
            value={filters.city}
            onChange={(city) => {
              if (city) {
                trackEvent(`formation_ville_${city.properties.label}`)
              }
              updateURL({ ...filters, city }, 1, mapMode)
            }}
            searchType='city'
          />
        </div>
      </div>
      <div className={showMoreFilters ? "" : styles.extraFilters} id='mobileFiltersDropdown'>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor='filiere'>Filières</label>
            <select
              id='filiere'
              value={filters.filiere}
              onChange={(e) => {
                trackEvent(`formation_filiere_${e.target.value}`)
                updateURL({ ...filters, filiere: e.target.value }, 1, mapMode)
              }}
              className={styles.select}>
              <option value=''>Toutes</option>
              {filieres.map((filiere) => (
                <option key={filiere.value} value={filiere.value}>
                  {filiere.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor='diplome'>Diplôme</label>
            <select
              id='diplome'
              value={filters.diplome}
              onChange={(e) => {
                trackEvent(`formation_diplome_${e.target.value}`)
                updateURL({ ...filters, diplome: e.target.value }, 1, mapMode)
              }}
              className={styles.select}>
              <option value=''>Tous</option>
              {niveaux.map((niveau) => (
                <option key={niveau.value} value={niveau.value}>
                  {niveau.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor='alternance'>Alternance</label>
            <select
              id='alternance'
              value={filters.alternance}
              onChange={(e) => {
                trackEvent(`formation_alternance_${e.target.value}`)
                updateURL({ ...filters, alternance: e.target.value }, 1, mapMode)
              }}
              className={styles.select}>
              <option value=''>Toutes</option>
              <option value='true'>Oui</option>
              <option value='false'>Non</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor='duree'>Durée</label>
            <select
              id='duree'
              value={filters.duree}
              onChange={(e) => {
                trackEvent(`formation_duree_${e.target.value}`)
                updateURL({ ...filters, duree: e.target.value }, 1, mapMode)
              }}
              className={styles.select}>
              <option value=''>Toutes</option>
              {durees.map((duree) => (
                <option key={duree.value} value={duree.value}>
                  {duree.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={styles.mobileMoreFilters}>
        <button
          id='mobileFiltersButton'
          className={styles.moreFiltersButton}
          onClick={() => setShowMoreFilters(!showMoreFilters)}
          aria-expanded={showMoreFilters}
          aria-controls='mobileFiltersDropdown'>
          {showMoreFilters ? "Masquer les filtres" : "Voir plus de filtres"}
        </button>
      </div>
      <div className={styles.resultCount}>
        <div className={styles.count}>
          {searching ? (
            <p>Recherche en cours...</p>
          ) : totalResults > 0 ? (
            <p>
              {totalResults.toLocaleString()} résultat{totalResults > 1 ? "s" : ""} selon les critères
            </p>
          ) : (
            <p>Aucune formation trouvée.</p>
          )}
        </div>
        <button
          className={formationsStyles.button}
          onClick={() => {
            trackEvent(`formation_carte_${mapMode ? "masquer" : "afficher"}`)
            updateURL(filters, page, !mapMode)
          }}>
          {mapMode ? "Masquer la carte" : "Afficher la carte"}
        </button>
      </div>
    </div>
  )
}

export default Filter
