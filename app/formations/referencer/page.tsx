import { getFilieresAvecMetiersRomeCodes } from "@/strapi/filieres"
import { getFormationDurees, getFormationNiveaux } from "@/strapi/formations"
import ReferencerPage from "@/views/ReferencerPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Référencer une formation | L’Avenir en Main",
}

export default async function Referencer() {
  const [filieres, niveaux, durees] = await Promise.all([
    getFilieresAvecMetiersRomeCodes(),
    getFormationNiveaux(),
    getFormationDurees(),
  ])

  return (
    <ReferencerPage
      filieresAvecMetiersRomeCodes={filieres}
      filieres={filieres
        .sort((a, b) => a.nom.localeCompare(b.nom))
        .map((filiere) => ({
          value: filiere.documentId,
          label: filiere.nom,
        }))}
      niveaux={niveaux
        .sort((a, b) => a.id - b.id)
        .map((niveau) => ({
          value: niveau.documentId,
          label: niveau.label,
        }))}
      durees={durees
        .sort((a, b) => a.id - b.id)
        .map((duree) => ({
          value: duree.documentId,
          label: duree.label,
        }))}
    />
  )
}
