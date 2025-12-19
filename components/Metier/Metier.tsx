import styles from "./Metier.module.css"
import { FiliereAvecMetiersComplets } from "@/strapi/filieres"
import { Metier as MetierType } from "@/strapi/metiers"
import MetierBanner from "./MetierBanner"
import MetierDescription from "./MetierDescription"
import MetierCentresInterets from "./MetierSectionCentreInterets"
import MetierQuotidien from "./MetierSectionQuotidien"
import MetierPerspectives from "./MetierSectionPerspectives"
import MetiersTabs, { TabItem } from "./Tabs/MetiersTabs"
import TabSpecialization from "./Tabs/TabAppellations"
import TabSalaire from "./Tabs/TabSalaire"
import TabFormations from "./Tabs/TabFormations"

const Metier = ({
  filiere,
  metier,
  domainesPro,
}: {
  filiere: FiliereAvecMetiersComplets
  metier: MetierType
  domainesPro: { code: string; description: string }[]
}) => {
  const hasSpecialisations = metier.appellations && metier.appellations.length > 0
  const hasMetiersProches = metier.metiersProches && metier.metiersProches.length > 0
  const hasSalaire = metier.salaire && metier.salaire.valeur_basse && metier.salaire.valeur_haute
  const tabs: TabItem[] = [
    {
      id: "formations",
      label: "Formations",
      component: <TabFormations metier={metier} />,
    },
    ...(hasSpecialisations
      ? [
          {
            id: "specialisations",
            label: "Spécialisations",
            component: (
              <TabSpecialization
                filiere={filiere}
                appellations={metier.appellations}
                notFoundMessage='Aucune spécialisation disponible pour ce métier.'
              />
            ),
          },
        ]
      : []),
    ...(hasMetiersProches
      ? [
          {
            id: "metiers",
            label: "Métiers proches",
            component: (
              <TabSpecialization
                filiere={filiere}
                appellations={metier.metiersProches}
                notFoundMessage='Aucun métier proche disponible pour ce métier.'
              />
            ),
          },
        ]
      : []),
    ...(hasSalaire ? [{ id: "salaire", label: "Salaire estimé", component: <TabSalaire metier={metier} /> }] : []),
  ]

  const defaultActiveTabId = hasSpecialisations ? "specialisations" : hasMetiersProches ? "metiers" : "formations"

  return (
    <div className={styles.metier}>
      <MetierBanner metier={metier} domainesPro={domainesPro} />
      <MetierDescription metier={metier} />
      <MetierCentresInterets metier={metier} />
      <MetierQuotidien metier={metier} />
      <MetierPerspectives metier={metier} />
      <MetiersTabs tabs={tabs} defaultActiveId={defaultActiveTabId} ariaLabel='Informations supplémentaires' />
    </div>
  )
}
export default Metier
