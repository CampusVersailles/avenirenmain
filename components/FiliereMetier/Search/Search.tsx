"use client"

import { MetierStrapi } from "@/strapi/metiers"
import styles from "./Search.module.css"
import SearchIcon from "@/components/Icons/SearchIcon"
import { useMemo, useState, useEffect, useRef } from "react"
import Fuse from "fuse.js"
import { useRouter } from "next/navigation"
import { FiliereAvecMetiers } from "@/strapi/filieres"

const MAX_RESULTS = 8

export default function Search({ filiere }: { filiere: FiliereAvecMetiers }) {
  const metiers = filiere.metiers
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<MetierStrapi[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const fuse = useMemo(() => {
    return new Fuse(metiers, {
      keys: ["titre", "description"],
      threshold: 0.3,
      ignoreLocation: true,
    })
  }, [metiers])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setQuery("")
        setSelectedIndex(-1)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSelectedIndex(-1)
      return
    }
    console.log("query", query)

    const searchResults = fuse.search(query).slice(0, MAX_RESULTS)
    setResults(searchResults.map((r) => r.item))
    setSelectedIndex(-1)
    setIsOpen(true)
  }, [query, fuse])

  const handleSelect = (metier: MetierStrapi) => {
    setIsOpen(false)
    setQuery("")
    setResults([])
    router.push(`/metiers/${filiere.documentId}/${metier.documentId}`)
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
      <div className={styles.searchField}>
        <div className={styles.inputWrapper} ref={wrapperRef}>
          <SearchIcon />
          <input
            id='search'
            type='text'
            placeholder='Recherche ton métier'
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (results.length) setIsOpen(true)
            }}
            onKeyDown={handleKeyDown}
            autoComplete='off'
            role='combobox'
            aria-autocomplete='list'
            aria-expanded={isOpen}
            aria-controls='city-listbox'
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
                <span className={styles.metier}>{metier.titre}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
