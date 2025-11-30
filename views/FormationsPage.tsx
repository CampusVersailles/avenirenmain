import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import Formations from "@/components/Formation/Formations"
import { type Option, type Formation, type FilterType } from "@/strapi/formations"

const FormationsPage = ({
  filieres,
  niveaux,
  durees,
  formations,
  pagination,
  filters,
}: {
  filieres: Option[]
  niveaux: Option[]
  durees: Option[]
  formations: Formation[]
  pagination: { page: number; pageSize: number; pageCount: number; total: number }
  filters: FilterType
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
        />
      </Block>
    </>
  )
}

export default FormationsPage
