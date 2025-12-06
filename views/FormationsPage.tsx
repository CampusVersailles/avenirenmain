import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import Formations from "@/components/Formation/Formations"
import { type Option, type Formation, type FilterType, Coordinates } from "@/strapi/formations"
import { Metier } from "@/strapi/metiers"

const FormationsPage = ({
  filieres,
  niveaux,
  durees,
  formations,
  pagination,
  filters,
  metier,
  coordinates,
  showMap,
}: {
  filieres: Option[]
  niveaux: Option[]
  durees: Option[]
  formations: Formation[]
  pagination: { page: number; pageSize: number; pageCount: number; total: number }
  filters: FilterType
  metier: Metier | null
  coordinates: Coordinates[]
  showMap: boolean
}) => {
  return showMap ? (
    <Formations
      coordinates={coordinates}
      filieres={filieres}
      niveaux={niveaux}
      durees={durees}
      formations={formations}
      pagination={pagination}
      filters={filters}
      metier={metier}
      showMap={showMap}
    />
  ) : (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Formations", href: "/formations" },
        ]}
      />
      <Block>
        <Formations
          coordinates={coordinates}
          filieres={filieres}
          niveaux={niveaux}
          durees={durees}
          formations={formations}
          pagination={pagination}
          filters={filters}
          metier={metier}
          showMap={showMap}
        />
      </Block>
    </>
  )
}

export default FormationsPage
