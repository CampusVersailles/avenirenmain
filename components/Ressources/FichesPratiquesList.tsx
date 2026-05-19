"use client"

import { useMemo, useState } from "react"
import { FichePratiqueStrapi } from "@/strapi/ressources"
import SearchIcon from "../Icons/SearchIcon"
import Filter from "../FiliereMetier/Filter/Filter"
import metierStyles from "../FiliereMetier/FiliereMetiers.module.css"
import ficheStyles from "../FiliereMetier/FiliereMetier.module.css"
import searchStyles from "../Search/Search.module.css"
import useSearchFiches from "./useSearchFiches"
import Link from "next/link"
import Image from "next/image"
import StrapiRichText from "../Strapi/StrapiRichText"
import LinkIcon from "../Icons/LinkIcon"
import styles from "./FichesPratiquesList.module.css"

const FichesPratiquesList = ({ fiches }: { fiches: FichePratiqueStrapi[] }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [searchValue, setSearchValue] = useState("")

  const availableTypes = useMemo(() => {
    return [...new Set(fiches.map((fiche) => fiche.type?.trim()).filter((type): type is string => !!type))].sort(
      (a, b) => a.localeCompare(b, "fr"),
    )
  }, [fiches])

  const typeOptions = useMemo(() => availableTypes.map((type) => ({ code: type, description: type })), [availableTypes])

  const searchedFiches = useSearchFiches(fiches, searchValue)

  const filteredFiches = useMemo(() => {
    return searchedFiches.filter((fiche) => {
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(fiche.type)
      return matchesType
    })
  }, [searchedFiches, selectedTypes])

  return (
    <>
      <div className={searchStyles.searchField}>
        <div className={searchStyles.inputWrapper}>
          <SearchIcon />
          <input
            id='fiches-search'
            aria-label='Rechercher une fiche pratique'
            type='text'
            placeholder='Rechercher une fiche pratique'
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
      </div>

      <Filter options={typeOptions} onFilterChange={setSelectedTypes} text='Tous les types' />

      {filteredFiches.length === 0 ? (
        <p>Aucune fiche ne correspond à votre recherche.</p>
      ) : (
        <div className={metierStyles.metiers}>
          {filteredFiches.map((fiche) => (
            <div key={fiche.id} className={ficheStyles.tile}>
              <Link href={`/fiches-pratiques/${fiche.documentId}`} className={ficheStyles.link}>
                <div className={ficheStyles.mainContainer}>
                  {fiche.image && (
                    <>
                      <Image className={ficheStyles.image} src={fiche.image.url} alt='' width={250} height={145} />
                      {fiche.type && <p className={ficheStyles.domaine}>{fiche.type}</p>}
                      {fiche.temps && <p className={styles.time}>{fiche.temps}</p>}
                    </>
                  )}
                  <div className={ficheStyles.content}>
                    <p className={ficheStyles.title}>{fiche.titre}</p>
                    <StrapiRichText content={fiche.intro} className={ficheStyles.description} />
                  </div>
                </div>
                <div className={ficheStyles.linkIconContainer}>
                  <span className={ficheStyles.linkIconText}>Voir la fiche</span>
                  <LinkIcon className={ficheStyles.linkIcon} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default FichesPratiquesList
