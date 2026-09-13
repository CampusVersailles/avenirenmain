import { useMemo } from "react"
import Fuse from "fuse.js"
import { FichePratiqueStrapi } from "@/strapi/ressources"
import { extractNodeText } from "@/lib/extract_text"

const FUZZY_SEARCH_THRESHOLD = 0.35

type IndexedFiche = {
  fiche: FichePratiqueStrapi
  descriptionText: string
}

const getDescriptionText = (fiche: FichePratiqueStrapi) => {
  if (!Array.isArray(fiche.intro)) {
    return ""
  }

  return fiche.intro.map((block) => extractNodeText(block)).join(" ")
}

export default function useSearchFiches(fiches: FichePratiqueStrapi[], searchValue: string) {
  const indexedFiches = useMemo<IndexedFiche[]>(
    () => fiches.map((fiche) => ({ fiche, descriptionText: getDescriptionText(fiche) })),
    [fiches],
  )

  const fuse = useMemo(() => {
    return new Fuse(indexedFiches, {
      keys: ["fiche.titre", "fiche.type", "fiche.temps", "descriptionText"],
      threshold: FUZZY_SEARCH_THRESHOLD,
      ignoreLocation: true,
      isCaseSensitive: false,
      ignoreDiacritics: true,
      minMatchCharLength: 2,
    })
  }, [indexedFiches])

  const searchedFiches = useMemo(() => {
    const trimmedSearch = searchValue.trim()
    if (!trimmedSearch) {
      return fiches
    }

    return fuse.search(trimmedSearch).map((result) => result.item.fiche)
  }, [fiches, searchValue, fuse])

  return searchedFiches
}
