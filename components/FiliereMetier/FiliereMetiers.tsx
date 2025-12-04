"use client"

import styles from "./FiliereMetiers.module.css"
import FiliereMetier from "./FiliereMetier"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import Filter from "./Filter/Filter"
import { useState } from "react"
import FiliereBanner from "./FiliereBanner"
import Search from "./Search/Search"

const FiliereMetiers = ({
  filiere,
  domainesPro,
}: {
  filiere: FiliereAvecMetiers
  domainesPro: { code: string; description: string }[]
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  return (
    <div>
      <FiliereBanner filiere={filiere} />
      <Search filiere={filiere} />
      <Filter title='Domaines Professionnels' options={filiere.domainesPro} onFilterChange={setSelectedFilters} />
      <div className={styles.metiers}>
        {filiere.metiers
          .filter((metier) => !metier.appellation)
          .map((metier) => {
            const hidden =
              selectedFilters.length > 0 &&
              !selectedFilters.some((filter) => metier.codeRomeMetier.code.startsWith(filter))

            return (
              <FiliereMetier
                metier={metier}
                filiere={filiere}
                domainesPro={domainesPro}
                className={hidden ? styles.hidden : undefined}
                key={metier.id}
                ariaHidden={hidden}
              />
            )
          })}
      </div>
    </div>
  )
}
export default FiliereMetiers
