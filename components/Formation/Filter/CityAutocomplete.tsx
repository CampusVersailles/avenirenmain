"use client"

import { useState, useEffect, useRef } from "react"
import styles from "./CityAutocomplete.module.css"
import filterStyles from "./Filter.module.css"
import SearchIcon from "@/components/Icons/SearchIcon"

export interface CityResult {
  properties: {
    label: string
    name: string
    postcode: string
    city: string
    citycode: string
  }
  geometry: {
    coordinates: [number, number]
  }
}

const CityAutocomplete = ({
  value,
  onChange,
}: {
  value: CityResult | null
  onChange: (value: CityResult | null) => void
}) => {
  const [text, setText] = useState("")
  const [suggestions, setSuggestions] = useState<CityResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setText("")
        setActiveIndex(-1)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value) {
        return
      }

      if (text.length < 2) {
        setSuggestions([])
        setIsOpen(false)
        setActiveIndex(-1)
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?limit=10&q=${encodeURIComponent(text)}&type=municipality`,
        )
        const data = await response.json()

        if (data.features) {
          setSuggestions(data.features)
          setIsOpen(true)
          setActiveIndex(-1)
        }
      } catch (error) {
        console.error("Error fetching city suggestions for:", text, error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounce = setTimeout(() => {
      fetchSuggestions()
    }, 300)

    return () => clearTimeout(debounce)
  }, [text, value])

  const handleSelect = (suggestion: CityResult) => {
    onChange(suggestion)
    setIsOpen(false)
    setActiveIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "Escape") {
        setIsOpen(false)
        setActiveIndex(-1)
      }
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setActiveIndex((prev) => (prev + 1) % suggestions.length)
        break
      case "ArrowUp":
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1))
        break
      case "Enter":
        e.preventDefault()
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          handleSelect(suggestions[activeIndex])
        }
        break
      case "Escape":
        e.preventDefault()
        setIsOpen(false)
        setActiveIndex(-1)
        break
    }
  }

  return (
    <>
      <label htmlFor='city'>Ville</label>
      <div className={styles.wrapper} ref={wrapperRef}>
        <div className={filterStyles.inputWrapper}>
          <SearchIcon />
          <input
            ref={inputRef}
            id='city'
            type='text'
            placeholder='Saisir une ville'
            value={value ? value.properties.label : text}
            onChange={(e) => {
              if (value) {
                onChange(null)
              }
              setText(e.target.value)
            }}
            onFocus={() => text.length >= 2 && suggestions.length > 0 && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            autoComplete='off'
            role='combobox'
            aria-autocomplete='list'
            aria-expanded={isOpen}
            aria-controls='city-listbox'
            aria-activedescendant={activeIndex >= 0 ? `city-option-${activeIndex}` : undefined}
          />
        </div>

        {isLoading ? (
          <div className={styles.loading}>
            <p className={styles.suggestion}>Chargement...</p>
          </div>
        ) : (
          isOpen &&
          suggestions.length > 0 && (
            <ul id='city-listbox' className={styles.dropdown} role='listbox'>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  id={`city-option-${index}`}
                  role='option'
                  aria-selected={index === activeIndex}
                  onClick={() => handleSelect(suggestion)}
                  className={styles.suggestion}
                >
                  <span className={styles.city}>{suggestion.properties.city}</span>
                  {suggestion.properties.postcode && (
                    <span className={styles.zipcode}>{suggestion.properties.postcode}</span>
                  )}
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </>
  )
}

export default CityAutocomplete
