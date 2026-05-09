import { FichePratiquePartieStrapi, FichePratiqueSousPartieStrapi } from "@/strapi/ressources"
import { FichePratiqueContentItem } from "./FichePratiqueContentItem"
import styles from "./FichePratiqueStep.module.css"
import ArrowLeftSLine from "../Icons/ArrowLeftSLine"
import ArrowRightSLine from "../Icons/ArrowRightSLine"
import classNames from "classnames"

type StepInfo = {
  partieIndex: number
  sousPartieIndex: number
  partie: FichePratiquePartieStrapi
  sousPartie: FichePratiqueSousPartieStrapi
}

const FichePratiqueStep = ({
  currentStep,
  allSteps,
  handlePrev,
  handleNext,
}: {
  currentStep: StepInfo
  allSteps: StepInfo[]
  handlePrev: () => void
  handleNext: () => void
}) => {
  const currentIdx = allSteps.findIndex((s) => s === currentStep)
  return (
    <section className={styles.stepContainer}>
      <div className={styles.stepHeader}>
        <p className={styles.stepLabel}>
          Étape {currentStep.partieIndex + 1}.{currentStep.sousPartieIndex + 1}
        </p>
        <h1 className={styles.stepPartieTitle}>{currentStep.partie.titre}</h1>
        <h2 className={styles.stepSousPartieTitle}>{currentStep.sousPartie.titre}</h2>
      </div>
      <div className={styles.stepContent}>
        {currentStep.sousPartie.contenu.map((item) => (
          <FichePratiqueContentItem key={item.id} item={item} />
        ))}
      </div>
      <div className={styles.navigation}>
        <button
          onClick={handlePrev}
          className={classNames(styles.navButton, styles.navButtonPrev)}
          aria-label='Étape précédente'>
          <ArrowLeftSLine /> Précédent
        </button>
        {currentIdx < allSteps.length - 1 ? (
          <button onClick={handleNext} className={styles.navButton} aria-label='Étape suivante'>
            Suivant <ArrowRightSLine />
          </button>
        ) : (
          <div />
        )}
      </div>
    </section>
  )
}

export default FichePratiqueStep
