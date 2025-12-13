"use client"

import styles from "./FiliereMetiers.module.css"
import FiliereMetier from "./FiliereMetier"
import { FiliereAvecMetiers, FiliereAvecMetiersSansMedia } from "@/strapi/filieres"
import Filter from "./Filter/Filter"
import { useState } from "react"
import FiliereBanner from "./FiliereBanner"
import Search from "../Search/Search"
import Accordion from "@/components/Accordion/Accordion"

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
      <div className={styles.searchContainer}>
        <Search filieres={[filiere]} />
      </div>
      <Accordion title='Filtrer par domaines professionnels' defaultOpen={false}>
        <Filter options={filiere.domainesPro} onFilterChange={setSelectedFilters} />
      </Accordion>
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
