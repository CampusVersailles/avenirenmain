import axiosClient from "@/services/axios"
import {
  FichePratiqueDetailStrapi,
  FichePratiqueStrapi,
  MetaFichePratiqueStrapi,
  RessourcePageStrapi,
} from "./ressources"
import { withStrapiFallback } from "./safe"
import { getMediaUrl } from "@/lib/media_utils"

export const getGuidePage = async () => {
  return withStrapiFallback("getGuidePage", null, async () => {
    const response = await axiosClient.get<{
      data: RessourcePageStrapi
    }>("guide")

    return response.data.data
  })
}

export const getFicheFormations = async () => {
  const [fiches, meta] = await Promise.all([
    withStrapiFallback("getFicheFormations", [] as FichePratiqueStrapi[], async () => {
      const response = await axiosClient.get<{
        data: FichePratiqueStrapi[]
      }>("fiche-formations?populate[image][fields]=url")
      return response.data.data.map((fiche) => ({
        ...fiche,
        image: fiche.image ? { url: getMediaUrl(fiche.image) } : undefined,
      }))
    }),

    withStrapiFallback("getFicheFormationsMeta", null, async () => {
      const response = await axiosClient.get<{
        data: MetaFichePratiqueStrapi
      }>("fiche-formation-intro")
      return response.data.data
    }),
  ])

  return { fiches, meta }
}

export const getEtudesDeCas = async () => {
  const [fiches, meta] = await Promise.all([
    withStrapiFallback("getEtudesDeCas", [] as FichePratiqueStrapi[], async () => {
      const response = await axiosClient.get<{
        data: FichePratiqueStrapi[]
      }>("cas-pratiques?populate[image][fields]=url")
      return response.data.data.map((fiche) => ({
        ...fiche,
        image: fiche.image ? { url: getMediaUrl(fiche.image) } : undefined,
      }))
    }),

    withStrapiFallback("getEtudesDeCasMeta", null, async () => {
      const response = await axiosClient.get<{
        data: MetaFichePratiqueStrapi
      }>("etude-de-cas")
      return response.data.data
    }),
  ])

  return { fiches, meta }
}

export const getFicheFormation = async (documentId: string) => {
  return withStrapiFallback("getFicheFormation", null, async () => {
    const response = await axiosClient.get<{
      data: FichePratiqueDetailStrapi
    }>(
      `fiche-formations/${documentId}?populate=parties&populate=parties.sousParties&populate=parties.sousParties.contenu&populate=parties.sousParties.contenu.texte&populate=parties.sousParties.contenu.image&populate=parties.sousParties.contenu.image.image&populate=parties.sousParties.contenu.chiffre&populate=parties.sousParties.contenu.chiffre.chiffres&populate=parties.sousParties.contenu.cta&populate=parties.sousParties.contenu.temoignage&populate=image`,
    )

    const fiche = response.data.data

    return {
      ...fiche,
      image: fiche.image ? { url: getMediaUrl(fiche.image) } : undefined,
      parties: (fiche.parties || []).map((partie) => ({
        ...partie,
        sousParties: (partie.sousParties || []).map((sousPartie) => ({
          ...sousPartie,
          contenu: (sousPartie.contenu || []).map((item) => ({
            ...item,
            image: item.image
              ? { image: { url: getMediaUrl(item.image.image) }, titre: item.image.titre, source: item.image.source }
              : null,
          })),
        })),
      })),
    }
  })
}

export const getCasPratique = async (documentId: string) => {
  return withStrapiFallback("getCasPratique", null, async () => {
    const response = await axiosClient.get<{
      data: FichePratiqueDetailStrapi
    }>(
      `cas-pratiques/${documentId}?populate=parties&populate=parties.sousParties&populate=parties.sousParties.contenu&populate=parties.sousParties.contenu.texte&populate=parties.sousParties.contenu.image&populate=parties.sousParties.contenu.image.image&populate=parties.sousParties.contenu.chiffre&populate=parties.sousParties.contenu.chiffre.chiffres&populate=parties.sousParties.contenu.cta&populate=parties.sousParties.contenu.temoignage&populate=image`,
    )

    const fiche = response.data.data

    return {
      ...fiche,
      image: fiche.image ? { url: getMediaUrl(fiche.image) } : undefined,
      parties: (fiche.parties || []).map((partie) => ({
        ...partie,
        sousParties: (partie.sousParties || []).map((sousPartie) => ({
          ...sousPartie,
          contenu: (sousPartie.contenu || []).map((item) => ({
            ...item,
            image: item.image
              ? { image: { url: getMediaUrl(item.image.image) }, titre: item.image.titre, source: item.image.source }
              : null,
          })),
        })),
      })),
    }
  })
}
