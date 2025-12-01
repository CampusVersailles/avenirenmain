import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import Formations from "@/components/Formation/Formations"
import { type Option, type Formation, type FilterType } from "@/strapi/formations"
import { Metier } from "@/strapi/metiers"

const FormationsPage = ({
  filieres,
  niveaux,
  durees,
  formations,
  pagination,
  filters,
  metier,
}: {
  filieres: Option[]
  niveaux: Option[]
  durees: Option[]
  formations: Formation[]
  pagination: { page: number; pageSize: number; pageCount: number; total: number }
  filters: FilterType
  metier: Metier | null
}) => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Formations", href: "/formations" },
        ]}
      />
      <Block>
        <h1>Les formations</h1>
        <Formations
          filieres={filieres}
          niveaux={niveaux}
          durees={durees}
          formations={formations}
          pagination={pagination}
          filters={filters}
          metier={metier}
        />
      </Block>
    </>
  )
}

export default FormationsPage
