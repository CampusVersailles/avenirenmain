import styles from "./Metier.module.css"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import { Metier as MetierType } from "@/strapi/metiers"
import MetierBanner from "./MetierBanner"
import MetierDescription from "./MetierDescription"
import MetierCentresInterets from "./MetierSectionCentreInterets"
import MetierQuotidien from "./MetierSectionQuotidien"
import MetierPerspectives from "./MetierSectionPerspectives"
import MetiersTabs, { TabItem } from "./Tabs/MetiersTabs"
import TabSpecialization from "./Tabs/TabAppellations"
import TabSalaire from "./Tabs/TabSalaire"
import TabMetiersProches from "./Tabs/TabMetiersProches"
import TabFormations from "./Tabs/TabFormations"

const Metier = ({ filiere, metier }: { filiere: FiliereAvecMetiers; metier: MetierType }) => {
  const tabs: TabItem[] = [
    { id: "formations", label: "Formations", component: <TabFormations /> },
    {
      id: "specialisations",
      label: "Spécialisations",
      component: <TabSpecialization filiere={filiere} metier={metier} />,
    },
    { id: "metiers", label: "Métiers proches", component: <TabMetiersProches metier={metier} /> },
    { id: "salaire", label: "Salaire estimé", component: <TabSalaire metier={metier} /> },
  ]

  return (
    <div className={styles.metier}>
      <MetierBanner filiere={filiere} metier={metier} />
      <MetierDescription filiere={filiere} metier={metier} />
      <MetierCentresInterets metier={metier} />
      <MetierQuotidien metier={metier} />
      <MetierPerspectives metier={metier} />
      <MetiersTabs tabs={tabs} defaultActiveId='specialisations' ariaLabel='Informations supplémentaires' />
    </div>
  )
}
export default Metier
