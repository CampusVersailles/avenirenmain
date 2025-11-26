import styles from "./Metier.module.css"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import { Metier as MetierType } from "@/strapi/metier"
import MetierBanner from "./MetierBanner"
import MetierDescription from "./MetierDescription"
import MetierCentresInterets from "./MetierSectionCentreInterets"
import MetierQuotidien from "./MetierSectionQuotidien"
import MetierPerspectives from "./MetierSectionPerspectives"
import MetierTrouverFormation from "./MetierTrouverFormation"
import MetiersTabs, { TabItem } from "./Tabs/MetiersTabs"

const Metier = ({ filiere, metier }: { filiere: FiliereAvecMetiers; metier: MetierType }) => {
  const Formations = () => <div className='tab-panel'>Formations content</div>
  const Specialisations = () => <div className='tab-panel'>Spécialisations content</div>
  const Metiers = () => <div className='tab-panel'>Métiers proches content</div>
  const Salaire = () => <div className='tab-panel'>Salaire estimé content</div>

  const tabs: TabItem[] = [
    { id: "formations", label: "Formations", component: <Formations /> },
    { id: "specialisations", label: "Spécialisations", component: <Specialisations /> },
    { id: "metiers", label: "Métiers proches", component: <Metiers /> },
    { id: "salaire", label: "Salaire estimé", component: <Salaire /> },
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
