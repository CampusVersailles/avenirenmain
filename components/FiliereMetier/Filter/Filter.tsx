"use client"

import { useState } from "react"
import styles from "./Filter.module.css"
import GridIcon from "@/components/Icons/GridIcon"
import classNames from "classnames"

interface FilterProps {
  title: string
  options: { code: string; description: string }[]
  onFilterChange: (selectedFilters: string[]) => void
}

const Filter = ({ title, options, onFilterChange }: FilterProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const toggleFilter = (key: string) => {
    let newFilters: string[]

    if (selectedFilters.includes(key)) {
      newFilters = selectedFilters.filter((f) => f !== key)
    } else {
      newFilters = [...selectedFilters, key]
    }

    setSelectedFilters(newFilters)
    onFilterChange(newFilters)
  }

  const toggleSelectAll = () => {
    if (selectedFilters.length > 0 && selectedFilters.length < options.length) {
      setSelectedFilters([])
      onFilterChange([])
    }
  }

  return (
    <div className={styles.filter}>
      <h3 className={styles.title}>
        <GridIcon />
        <span>{title}</span>
      </h3>
      <div className={styles.options}>
        <button
          className={classNames(styles.badge, {
            [styles.active]: selectedFilters.length === 0 || selectedFilters.length === options.length,
          })}
          onClick={toggleSelectAll}>
          <span>Tous les métiers</span>
        </button>
        {options.map((option) => (
          <button
            key={option.code}
            className={classNames(styles.badge, { [styles.active]: selectedFilters.includes(option.code) })}
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
