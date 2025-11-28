import { getFilieres } from "@/strapi/filieres"
import { getFormationNiveaux, getFormationDurees, getFormations } from "@/strapi/formations"
import FormationsPage from "@/views/FormationsPage"

const Formations = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
  const params = await searchParams
  const [filieres, niveaux, durees] = await Promise.all([getFilieres(), getFormationNiveaux(), getFormationDurees()])

  const filters = {
    search: params.search || "",
    filiere: params.filiere || "",
    diplome: params.diplome || "",
    alternance: params.alternance || "",
    duree: params.duree || "",
    city:
      params.city && params.lat && params.lon
        ? {
            properties: {
              label: params.city,
              name: params.name || params.city,
              postcode: params.postcode || "",
              city: params.name || params.city,
              citycode: params.citycode || "",
            },
            geometry: { coordinates: [parseFloat(params.lon), parseFloat(params.lat)] as [number, number] },
          }
        : null,
  }

  const page = parseInt(params.page || "1")
  const { formations, pagination } = await getFormations(filters, page)

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
      formations={formations}
      pagination={pagination}
      filters={filters}
    />
  )
}

export default Formations
