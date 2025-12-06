"use client"

import { useState, useEffect } from "react"
import styles from "./Filter.module.css"
import SearchIcon from "@/components/Icons/SearchIcon"
import { Option } from "@/strapi/formations"
import { Metier } from "@/strapi/metiers"
import JobIcon from "@/components/Icons/Job"
import CloseIcon from "@/components/Icons/CloseIcon"
import AdresseAutocomplete, { AddressResult } from "@/components/AdresseAutocomplete/AdresseAutocomplete"

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
  selectedRomeCode,
  onFiliereChange,
  onDiplomeChange,
  onAlternanceChange,
  onDureeChange,
  totalResults,
  metier,
  onRemoveMetier,
}: {
  search: string
  onSearchChange: (search: string) => void
  city: AddressResult | null
  onCityChange: (city: AddressResult | null) => void
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
  selectedRomeCode: string
  metier: Metier | null
  onRemoveMetier: () => void
}) => {
  const [text, setText] = useState(search)

  useEffect(() => {
    setText(search)
  }, [search])

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search !== text) {
        onSearchChange(text)
      }
    }, 300)

    return () => clearTimeout(debounce)
  }, [search, text, onSearchChange])

  return (
    <div className={styles.filter}>
      {selectedRomeCode && metier && (
        <div className={styles.row}>
          <div className={styles.searchField}>
            <label htmlFor='romeCode'>Métier sélectionné</label>
            <div className={styles.metierWrapper}>
              <JobIcon />
              <p className={styles.metierTitle}>{metier.titre}</p>
              <button onClick={onRemoveMetier} className={styles.button}>
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
          <AdresseAutocomplete value={city} onChange={onCityChange} searchType='city' />
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
