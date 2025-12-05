import { getFilieres } from "@/strapi/filieres"
import { getFormationDurees, getFormationNiveaux } from "@/strapi/formations"
import ReferencerPage from "@/views/ReferencerPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Référencer une formation | L’Avenir en Main",
}

export default async function Referencer() {
  const [filieres, niveaux, durees] = await Promise.all([getFilieres(), getFormationNiveaux(), getFormationDurees()])

  // const romeCodesMetiers = filieres.map((filiere) => filiere.metiers.map((metier) => metier.codeRomeMetier.code))
  return (
    <ReferencerPage
      filieres={filieres
        .sort((a, b) => a.nom.localeCompare(b.nom))
        .map((filiere) => ({
          value: filiere.documentId,
          label: filiere.nom,
        }))}
      niveaux={niveaux.map((niveau) => ({
        value: niveau.documentId,
        label: niveau.label,
      }))}
      durees={durees.map((duree) => ({
        value: duree.documentId,
        label: duree.label,
      }))}
    />
  )
}
