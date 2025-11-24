"use client"
import styles from "./FiliereMetier.module.css"
import FiliereMetier from "./FiliereMetier"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import Filter from "./Filter/Filter"
import { useState } from "react"

const FiliereMetiers = ({ filiere }: { filiere: FiliereAvecMetiers }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  return (
    <div>
      <Filter title='Domaines professionnels' options={filiere.domainesPro} onFilterChange={setSelectedFilters} />

      <div className={styles.metiers}>
        {(selectedFilters.length > 0
          ? filiere.metiers.filter((metier) =>
              selectedFilters.some((filter) => metier.codeRomeMetier.code.startsWith(filter)),
            )
          : filiere.metiers
        ).map((metier) => (
          <FiliereMetier metier={metier} filiere={filiere} key={metier.id} />
        ))}
      </div>
    </div>
  )
}
export default FiliereMetiers
