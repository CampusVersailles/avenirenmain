"use client"

import { useState, useEffect } from "react"
import styles from "./Filter.module.css"
import SearchIcon from "@/components/Icons/SearchIcon"
import CityAutocomplete, { CityResult } from "./CityAutocomplete"
import { Option } from "@/strapi/formations"

const Filter = ({
  search,
  onSearchChange,
  city,
  onCityChange,
  filieres,
  niveaux,
  durees,
  selectedFiliere,
  selectedDiplome,
  selectedAlternance,
  selectedDuree,
  onFiliereChange,
  onDiplomeChange,
  onAlternanceChange,
  onDureeChange,
  totalResults,
}: {
  search: string
  onSearchChange: (search: string) => void
  city: CityResult | null
  onCityChange: (city: CityResult | null) => void
  filieres: Option[]
  niveaux: Option[]
  durees: Option[]
  selectedFiliere: string
  selectedDiplome: string
  selectedAlternance: string
  selectedDuree: string
  onFiliereChange: (filiere: string) => void
  onDiplomeChange: (diplome: string) => void
  onAlternanceChange: (alternance: string) => void
  onDureeChange: (duree: string) => void
  totalResults: number
}) => {
  const [text, setText] = useState(search)

  useEffect(() => {
    setText(search)
  }, [search])

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search !== text) {
        if (text.length > 2) {
          onSearchChange(text)
        } else if (search !== "") {
          onSearchChange("")
        }
      }
    }, 300)

    return () => clearTimeout(debounce)
  }, [search, text, onSearchChange])

  return (
    <div className={styles.filter}>
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
          <CityAutocomplete value={city} onChange={onCityChange} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor='filiere'>Filières</label>
          <select
            id='filiere'
            value={selectedFiliere}
            onChange={(e) => onFiliereChange(e.target.value)}
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
            value={selectedDiplome}
            onChange={(e) => onDiplomeChange(e.target.value)}
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
            value={selectedAlternance}
            onChange={(e) => onAlternanceChange(e.target.value)}
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
            value={selectedDuree}
            onChange={(e) => onDureeChange(e.target.value)}
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
      {totalResults > 0 && (
        <p className={styles.resultCount}>
          {totalResults.toLocaleString()} résultat{totalResults > 1 ? "s" : ""} selon les critères
        </p>
      )}
    </div>
  )
}

export default Filter
