"use client"
import styles from "./FiliereMetiers.module.css"
import FiliereMetier from "./FiliereMetier"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import Filter from "./Filter/Filter"
import { useState } from "react"
import FiliereBanner from "./FiliereBanner"

const FiliereMetiers = ({ filiere }: { filiere: FiliereAvecMetiers }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  return (
    <div>
      <FiliereBanner filiere={filiere} />
      <Filter title='Domaines Professionnels' options={filiere.domainesPro} onFilterChange={setSelectedFilters} />
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
