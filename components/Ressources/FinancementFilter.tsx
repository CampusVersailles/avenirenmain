"use client"

import { useState } from "react"
import styles from "./FinancementFilter.module.css"
import classNames from "classnames"

interface FinancementFilterProps {
  options: string[]
  onFilterChange: (selectedFilters: string[]) => void
  badgeClass: string
}

const FinancementFilter = ({ options, onFilterChange, badgeClass }: FinancementFilterProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const toggleFilter = (option: string) => {
    let newFilters: string[]

    if (selectedFilters.includes(option)) {
      newFilters = selectedFilters.filter((f) => f !== option)
    } else {
      newFilters = [...selectedFilters, option]
    }

    setSelectedFilters(newFilters)
    onFilterChange(newFilters)
  }

  const toggleSelectAll = () => {
    if (selectedFilters.length > 0) {
      setSelectedFilters([])
      onFilterChange([])
    } else {
      setSelectedFilters(options)
      onFilterChange(options)
    }
  }

  return (
    <div className={styles.filter}>
      <div className={styles.options}>
        <button
          type='button'
          className={classNames(styles.badge, styles[badgeClass as keyof typeof styles], {
            [styles.active]: selectedFilters.length === 0 || selectedFilters.length === options.length,
          })}
          onClick={toggleSelectAll}>
          <span>Tous</span>
        </button>
        {options.map((option) => (
          <button
            type='button'
            key={option}
            className={classNames(styles.badge, styles[badgeClass as keyof typeof styles], {
              [styles.active]: selectedFilters.includes(option),
            })}
            onClick={() => toggleFilter(option)}>
            <span>{option}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default FinancementFilter
