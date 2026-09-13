"use client"

import { useState, useMemo } from "react"
import Fuse from "fuse.js"
import classNames from "classnames"
import ArrowRightIcon from "../Icons/ArrowRightIcon"
import StrapiRichText from "../Strapi/StrapiRichText"
import Tile from "../Tile/Tile"
import tileStyles from "../Tile/Tile.module.css"
import styles from "./FinancementTiles.module.css"
import { DispositifFinancementStrapi } from "@/strapi/financement"
import { extractNodeText } from "@/lib/extract_text"
import Accordion from "@/components/Accordion/Accordion"
import FinancementFilters from "./FinancementFilters"
import searchStyles from "../Search/Search.module.css"
import SearchIcon from "../Icons/SearchIcon"

const FinancementTiles = ({ dispositifs }: { dispositifs: DispositifFinancementStrapi[] }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedActeurs, setSelectedActeurs] = useState<string[]>([])
  const [selectedBesoins, setSelectedBesoins] = useState<string[]>([])
  const [selectedObjectifs, setSelectedObjectifs] = useState<string[]>([])

  // Récupérer les listes uniques d'acteurs, besoins et objectifs
  const uniqueOptions = useMemo(() => {
    const acteurs = new Set<string>()
    const besoins = new Set<string>()
    const objectifs = new Set<string>()

    dispositifs.forEach((d) => {
      d.acteurs?.forEach((a) => acteurs.add(a.acteur))
      d.besoins?.forEach((b) => besoins.add(b.besoin))
      d.objectifs?.forEach((o) => objectifs.add(o.objectif))
    })

    return {
      acteurs: Array.from(acteurs).sort(),
      besoins: Array.from(besoins).sort(),
      objectifs: Array.from(objectifs).sort(),
    }
  }, [dispositifs])

  // Transformer les dispositifs pour inclure une version searchable de la description
  const searchableDispositifs = useMemo(
    () =>
      dispositifs.map((d) => ({
        ...d,
        searchableDescription: Array.isArray(d.description)
          ? d.description.map((block) => extractNodeText(block)).join(" ")
          : "",
      })),
    [dispositifs],
  )

  const fuse = useMemo(() => {
    return new Fuse(searchableDispositifs, {
      keys: [
        {
          name: "titre",
          weight: 0.7,
        },
        {
          name: "searchableDescription",
          weight: 0.3,
        },
      ],
      threshold: 0.3,
      includeScore: true,
    })
  }, [searchableDispositifs])

  const filteredDispositifs = useMemo(() => {
    let results = dispositifs

    // Filtrer par recherche texte
    if (searchQuery.trim()) {
      results = fuse.search(searchQuery).map((result) => result.item)
    }

    // Filtrer par acteurs
    if (selectedActeurs.length > 0) {
      results = results.filter((d) => selectedActeurs.some((a) => d.acteurs?.some((act) => act.acteur === a)))
    }

    // Filtrer par besoins
    if (selectedBesoins.length > 0) {
      results = results.filter((d) => selectedBesoins.some((b) => d.besoins?.some((bes) => bes.besoin === b)))
    }

    // Filtrer par objectifs
    if (selectedObjectifs.length > 0) {
      results = results.filter((d) => selectedObjectifs.some((o) => d.objectifs?.some((obj) => obj.objectif === o)))
    }

    return results
  }, [searchQuery, selectedActeurs, selectedBesoins, selectedObjectifs, fuse, dispositifs])

  return (
    <>
      <div className={searchStyles.searchField}>
        <div className={searchStyles.inputWrapper}>
          <SearchIcon />
          <input
            id='fiches-search'
            aria-label='Rechercher dans les dispositifs...'
            type='text'
            placeholder='Rechercher dans les dispositifs...'
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>

      {(uniqueOptions.acteurs.length > 0 || uniqueOptions.besoins.length > 0 || uniqueOptions.objectifs.length > 0) && (
        <div className={styles.accordion}>
          <Accordion title='Filtrer'>
            <FinancementFilters
              acteurs={uniqueOptions.acteurs}
              besoins={uniqueOptions.besoins}
              objectifs={uniqueOptions.objectifs}
              onActeursChange={setSelectedActeurs}
              onBesoinsChange={setSelectedBesoins}
              onObjectifsChange={setSelectedObjectifs}
            />
          </Accordion>
        </div>
      )}

      <div className={styles.tiles}>
        {filteredDispositifs.map((dispositif) => (
          <Tile key={dispositif.id} href={dispositif.lien} className={tileStyles.tile} external>
            <div className={styles.badgesContainer}>
              {dispositif.acteurs?.map(({ acteur }, idx) => (
                <span key={`acteur-${idx}`} className={classNames(styles.badge, styles.badgeActeur)}>
                  {acteur}
                </span>
              ))}
            </div>
            <div className={styles.badgesContainer}>
              {dispositif.besoins?.map(({ besoin }, idx) => (
                <span key={`besoin-${idx}`} className={classNames(styles.badge, styles.badgeBesoin)}>
                  {besoin}
                </span>
              ))}
            </div>
            <div className={styles.badgesContainer}>
              {dispositif.objectifs?.map(({ objectif }, idx) => (
                <span key={`objectif-${idx}`} className={classNames(styles.badge, styles.badgeObjectif)}>
                  {objectif}
                </span>
              ))}
            </div>
            <p className={styles.title}>{dispositif.type}</p>
            <p className={styles.subTitle}>{dispositif.echelle}</p>
            <div className={styles.description}>
              <StrapiRichText content={dispositif.description} />
            </div>
            <p>
              En savoir plus sur le dispositif <ArrowRightIcon />
            </p>
          </Tile>
        ))}
      </div>
      {filteredDispositifs.length === 0 && (
        <p className={styles.noResults}>Aucun dispositif trouvé correspondant à votre recherche.</p>
      )}
    </>
  )
}

export default FinancementTiles
