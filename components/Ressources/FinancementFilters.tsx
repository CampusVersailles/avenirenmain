"use client"

import FinancementFilter from "./FinancementFilter"
import styles from "./FinancementFilters.module.css"

interface FinancementFiltersProps {
  acteurs: string[]
  besoins: string[]
  objectifs: string[]
  onActeursChange: (selected: string[]) => void
  onBesoinsChange: (selected: string[]) => void
  onObjectifsChange: (selected: string[]) => void
}

const FinancementFilters = ({
  acteurs,
  besoins,
  objectifs,
  onActeursChange,
  onBesoinsChange,
  onObjectifsChange,
}: FinancementFiltersProps) => {
  return (
    <div className={styles.filtersWrapper}>
      {acteurs.length > 0 && (
        <div className={styles.filterSection}>
          <h3 className={styles.sectionTitle}>Acteurs</h3>
          <FinancementFilter options={acteurs} onFilterChange={onActeursChange} badgeClass='badgeActeur' />
        </div>
      )}

      {besoins.length > 0 && (
        <div className={styles.filterSection}>
          <h3 className={styles.sectionTitle}>Besoins</h3>
          <FinancementFilter options={besoins} onFilterChange={onBesoinsChange} badgeClass='badgeBesoin' />
        </div>
      )}

      {objectifs.length > 0 && (
        <div className={styles.filterSection}>
          <h3 className={styles.sectionTitle}>Objectifs</h3>
          <FinancementFilter options={objectifs} onFilterChange={onObjectifsChange} badgeClass='badgeObjectif' />
        </div>
      )}
    </div>
  )
}

export default FinancementFilters
