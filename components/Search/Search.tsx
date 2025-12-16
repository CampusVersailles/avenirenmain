"use client"

import styles from "./Search.module.css"
import SearchIcon from "@/components/Icons/SearchIcon"
import { useMemo, useState, useEffect, useRef } from "react"
import Fuse from "fuse.js"
import { useRouter } from "next/navigation"
import { FiliereAvecMetiers } from "@/strapi/filieres"

const MAX_RESULTS = 10

const FUZZY_SEARCH_THRESHOLD = 0.4

type SearchItem = {
  type: "metier" | "appellation"
  titre: string
  documentIdMetier: string
  documentIdAppellation?: string
  titreAppellation?: string
  titreMetier: string
  filiereDocumentId: string
}

function getSearchItemLink(item: SearchItem) {
  if (item.type === "metier" || !item.documentIdAppellation) {
    return `/metiers/${item.filiereDocumentId}/${item.documentIdMetier}`
  } else {
    return `/metiers/${item.filiereDocumentId}/${item.documentIdAppellation}`
  }
}

export default function Search({ filieres }: { filieres: FiliereAvecMetiers[] }) {
  const allMetiers = filieres.flatMap((filiere) => {
    return filiere.metiers.map((metier) => ({
      ...metier,
      filiereDocumentId: filiere.documentId,
    }))
  })
  const metiers = allMetiers.filter(
    (metier, index, self) => index === self.findIndex((t) => t.documentId === metier.documentId),
  )
  const router = useRouter()
  const [results, setResults] = useState<SearchItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const searchItems = useMemo<SearchItem[]>(() => {
    return metiers
      .flatMap((metier) => {
        const metierItem: SearchItem = {
          type: "metier",
          titre: metier.titre,
          documentIdMetier: metier.documentId,
          titreMetier: metier.titre,
          filiereDocumentId: metier.filiereDocumentId,
        }

        const appellationsItems: SearchItem[] = metier.appellations.map((appellation) => ({
          type: "appellation",
          titre: appellation.nom,
          documentIdMetier: metier.documentId,
          documentIdAppellation: appellation.metier?.documentId,
          titreAppellation: appellation.nom,
          titreMetier: metier.titre,
          filiereDocumentId: metier.filiereDocumentId,
        }))

        return [metierItem, ...appellationsItems]
      })
      .filter((item, index, array) => array.findIndex((i) => i.titre === item.titre) === index)
  }, [metiers])

  const fuse = useMemo(() => {
    return new Fuse(searchItems, {
      keys: ["titre"],
      threshold: FUZZY_SEARCH_THRESHOLD,
      ignoreLocation: true,
      isCaseSensitive: false,
      ignoreDiacritics: true,
    })
  }, [searchItems])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const trimmed = value.trim()
    if (!trimmed) {
      setResults([])
      setSelectedIndex(-1)
      setIsOpen(false)
      return
    }

    const searchResults = fuse.search(trimmed).slice(0, MAX_RESULTS)
    setResults(searchResults.map((r) => r.item))
    setSelectedIndex(-1)
    setIsOpen(true)
  }

  const handleSelect = (item: SearchItem) => {
    setIsOpen(false)
    setResults([])
    router.push(getSearchItemLink(item))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % results.length)
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleSelect(results[selectedIndex])
        }
        break
      case "Escape":
        e.preventDefault()
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  return (
    <div className={styles.row}>
      <div className={styles.searchField} ref={wrapperRef}>
        <div className={styles.inputWrapper}>
          <SearchIcon />
          <input
            id='search'
            aria-label='Recherche ton métier'
            type='text'
            placeholder='Recherche ton métier'
            onChange={handleChange}
            onFocus={() => {
              if (results.length) setIsOpen(true)
            }}
            onKeyDown={handleKeyDown}
            autoComplete='off'
            role='combobox'
            aria-autocomplete='list'
            aria-expanded={isOpen}
            aria-controls='metier-listbox'
            aria-activedescendant={selectedIndex >= 0 ? `metier-option-${selectedIndex}` : undefined}
          />
        </div>
        {isOpen && results.length > 0 && (
          <ul id='metier-listbox' className={styles.dropdown} role='listbox'>
            {results.map((metier, index) => (
              <li
                key={index}
                id={`metier-option-${index}`}
                role='option'
                aria-selected={index === selectedIndex}
                onClick={() => handleSelect(metier)}
                className={styles.suggestion}>
                <span className={styles.metier}>
                  {metier.type === "metier" ? (
                    metier.titreMetier
                  ) : metier.documentIdAppellation ? (
                    metier.titreAppellation
                  ) : (
                    <>
                      {metier.titreMetier} (ex: <span className={styles.appellation}>{metier.titreAppellation}</span>)
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
