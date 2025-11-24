"use client"

import { useState } from "react"
import styles from "./Filter.module.css"

interface FilterProps {
  title: string
  options: { code: string; description: string }[]
  onFilterChange?: (selectedFilters: string[]) => void
  selectAll?: boolean
}

const Filter = ({ title, options, onFilterChange, selectAll = false }: FilterProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [allSelected, setAllSelected] = useState(selectAll)

  const toggleFilter = (key: string) => {
    let newFilters: string[]

    if (selectedFilters.includes(key)) {
      newFilters = selectedFilters.filter((f) => f !== key)
    } else {
      newFilters = [...selectedFilters, key]
    }

    setSelectedFilters(newFilters)
    setAllSelected(false)
    onFilterChange?.(newFilters)
  }

  const toggleSelectAll = () => {
    const newAllSelected = !allSelected
    setAllSelected(newAllSelected)

    if (newAllSelected) {
      setSelectedFilters([])
      onFilterChange?.([])
    }
  }

  return (
    <div className={styles.filter}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.options}>
        {selectAll && (
          <button className={`${styles.badge} ${allSelected ? styles.active : ""}`} onClick={toggleSelectAll}>
            <span>Sélectionner toute la catégorie</span>
          </button>
        )}
        {options.map((option) => (
          <button
            key={option.code}
            className={`${styles.badge} ${selectedFilters.includes(option.code) ? styles.active : ""}`}
            onClick={() => toggleFilter(option.code)}>
            <span>{option.description}</span>
            <span className={styles.icon}>+</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Filter
