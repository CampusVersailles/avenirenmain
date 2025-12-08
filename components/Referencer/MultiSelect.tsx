import React, { useState, useRef, useEffect } from "react"
import styles from "./MultiSelect.module.css"
import classNames from "classnames"
import CloseIcon from "../Icons/CloseIcon"
import DownChevronIcon from "../Icons/DownChevron"

type Option = { value: string; label: string }

export function MultiSelect({
  id,
  options,
  value,
  onChange,
  placeholder,
  noResultsText,
  enableSearch,
}: {
  id: string
  options: Option[]
  value: string[]
  onChange: (newValues: string[]) => void
  placeholder: string
  noResultsText: string
  enableSearch: boolean
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const containerRef = useRef<HTMLDivElement | null>(null)

  const selectedOptions = options.filter((opt) => value.includes(opt.value))

  function toggleOption(val: string) {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val))
    } else {
      onChange([...value, val])
    }
  }

  function removeOption(val: string, e?: React.MouseEvent) {
    if (e) e.stopPropagation()
    onChange(value.filter((v) => v !== val))
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredOptions = options.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className={styles.multiSelect} ref={containerRef}>
      {/* Control */}
      <button
        id={id}
        type='button'
        className={styles.multiSelectControl}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup='listbox'
        aria-expanded={open}>
        <div className={styles.multiSelectValues}>
          {selectedOptions.length === 0 && <span className={styles.multiSelectPlaceholder}>{placeholder}</span>}
          {selectedOptions.map((opt) => (
            <span className={styles.multiSelectTag} key={opt.value}>
              {opt.label}
              <span className={styles.multiSelectTagRemove} onClick={(e) => removeOption(opt.value, e)}>
                <CloseIcon className={styles.multiSelectTagRemoveIcon} />
              </span>
            </span>
          ))}
        </div>
        <DownChevronIcon className={styles.multiSelectIcon} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className={styles.multiSelectMenu}>
          {enableSearch && (
            <input
              type='text'
              className={styles.multiSelectSearch}
              placeholder='Recherche...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <ul className={styles.multiSelectList} role='listbox' aria-multiselectable='true'>
            {filteredOptions.map((opt) => {
              const isSelected = value.includes(opt.value)
              return (
                <li
                  key={opt.value}
                  className={classNames(styles.multiSelectOption, {
                    [styles.multiSelectOptionSelected]: isSelected,
                  })}
                  onClick={() => toggleOption(opt.value)}
                  role='option'
                  aria-selected={isSelected}>
                  <input type='checkbox' checked={isSelected} readOnly className={styles.multiSelectCheckbox} />
                  <span>{opt.label}</span>
                </li>
              )
            })}

            {filteredOptions.length === 0 && <li className={styles.multiSelectNoResults}>{noResultsText}</li>}
          </ul>
        </div>
      )}
    </div>
  )
}
