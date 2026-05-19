import {
  FichePratiqueDetailStrapi,
  FichePratiquePartieStrapi,
  FichePratiqueSousPartieStrapi,
} from "@/strapi/ressources"
import styles from "./FichePratiqueAside.module.css"
import classNames from "classnames"

type StepInfo = {
  partieIndex: number
  sousPartieIndex: number
  partie: FichePratiquePartieStrapi
  sousPartie: FichePratiqueSousPartieStrapi
}

const FichePratiqueAside = ({
  fiche,
  allSteps,
  currentStep,
  isIntroPage,
  totalSteps,
  goToIntro,
  goToStep,
}: {
  fiche: Pick<FichePratiqueDetailStrapi, "parties">
  allSteps: StepInfo[]
  currentStep?: StepInfo | null
  isIntroPage: boolean
  totalSteps: number
  goToIntro: () => void
  goToStep: (partieIdx: number, sousPartieIdx: number) => void
}) => {
  const currentIdx = isIntroPage ? 0 : allSteps.findIndex((s) => s === currentStep) + 1
  const percentage = totalSteps > 0 ? Math.round((currentIdx / totalSteps) * 100) : 0
  return (
    <aside className={styles.aside} aria-label='Sommaire de la fiche'>
      <nav className={styles.nav}>
        <div className={styles.navProgress}>
          <span className={styles.progressLabel}>Avancée dans le cours</span>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBarFill} style={{ width: `${percentage}%` }} />
          </div>
          {currentIdx > 0 && (
            <span className={styles.progressText}>
              {currentIdx}
              {currentIdx === 1 ? "ère" : "ème"} étape sur {totalSteps}
            </span>
          )}
        </div>
        <button
          onClick={goToIntro}
          className={classNames(styles.sousPartieButton, { [styles.sousPartieButtonActive]: isIntroPage })}>
          <div className={styles.sousPartieCircle} />
          <span className={styles.sousPartieText}>Introduction</span>
        </button>
        {fiche.parties.map((partie, partieIdx) => (
          <div key={partie.id} className={styles.partieGroup}>
            <p className={styles.partieLabel}>Étape {partieIdx + 1}</p>
            {partie.sousParties.map((sousPartie, sousPartieIdx) => {
              const isActive =
                !isIntroPage && currentStep?.partieIndex === partieIdx && currentStep?.sousPartieIndex === sousPartieIdx
              return (
                <button
                  key={sousPartie.id}
                  onClick={() => goToStep(partieIdx, sousPartieIdx)}
                  className={classNames(styles.sousPartieButton, { [styles.sousPartieButtonActive]: isActive })}>
                  <div className={styles.sousPartieCircle} />
                  <span className={styles.sousPartieText}>{sousPartie.titre}</span>
                </button>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default FichePratiqueAside
