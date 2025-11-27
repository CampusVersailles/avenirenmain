import { getFilieres } from "@/strapi/filieres"
import { getFormationNiveaux, getFormationDurees } from "@/strapi/formations"
import FormationsPage from "@/views/FormationsPage"

const Formations = async () => {
  const [filieres, niveaux, durees] = await Promise.all([getFilieres(), getFormationNiveaux(), getFormationDurees()])

  return (
    <FormationsPage
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

export default Formations
