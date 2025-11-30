"use client"

import styles from "./FiliereMetiers.module.css"
import FiliereMetier from "./FiliereMetier"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import Filter from "./Filter/Filter"
import { useState } from "react"
import FiliereBanner from "./FiliereBanner"
import classNames from "classnames"

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
      <Filter title='Domaines Professionnels' options={filiere.domainesPro} onFilterChange={setSelectedFilters} />
      <div className={styles.metiers}>
        {filiere.metiers.map((metier) => {
          const hidden =
            selectedFilters.length > 0 &&
            !selectedFilters.some((filter) => metier.codeRomeMetier.code.startsWith(filter))

          return (
            <div
              key={metier.id}
              className={classNames(styles.tile, {
                [styles.hidden]: hidden,
              })}
              aria-hidden={hidden}>
              <FiliereMetier metier={metier} filiere={filiere} domainesPro={domainesPro} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default FiliereMetiers
