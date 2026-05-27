"use client"

import {
  FichePratiqueDetailStrapi,
  FichePratiquePartieStrapi,
  FichePratiqueSousPartieStrapi,
} from "@/strapi/ressources"
import styles from "./FichePratiqueAside.module.css"
import classNames from "classnames"
import ArrowRightSLine from "../Icons/ArrowRightSLine"
import ArrowLeftSLine from "../Icons/ArrowLeftSLine"

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
  minimized,
  setMinimized,
}: {
  fiche: Pick<FichePratiqueDetailStrapi, "parties">
  allSteps: StepInfo[]
  currentStep?: StepInfo | null
  isIntroPage: boolean
  totalSteps: number
  goToIntro: () => void
  goToStep: (partieIdx: number, sousPartieIdx: number) => void
  minimized: boolean
  setMinimized: (minimized: boolean) => void
}) => {
  const currentIdx = isIntroPage ? 0 : allSteps.findIndex((s) => s === currentStep) + 1
  const percentage = totalSteps > 0 ? Math.round((currentIdx / totalSteps) * 100) : 0

  return (
    <aside
      className={classNames(styles.aside, { [styles.asideMinimized]: minimized })}
      aria-label='Sommaire de la fiche'>
      <nav className={styles.nav}>
        <div className={classNames(styles.navProgress, { [styles.navProgressMinimized]: minimized })}>
          <p className={styles.progressLabel}>
            <button
              className={styles.navDisplayButton}
              title={minimized ? "Agrandir la barre d'avancée" : "Minimiser la barre d'avancée"}
              onClick={() => setMinimized(!minimized)}>
              {minimized ? <ArrowRightSLine /> : <ArrowLeftSLine />}
            </button>
            <span>Avancée</span>
          </p>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBarFill} style={{ width: `${percentage}%` }} />
          </div>
          {currentIdx > 0 && (
            <span className={styles.progressText}>
              {currentIdx}
              {currentIdx === 1 ? "ère" : "ème"} partie sur {totalSteps}
            </span>
          )}
        </div>
        <button
          onClick={goToIntro}
          className={classNames(styles.sousPartieButton, {
            [styles.sousPartieButtonActive]: isIntroPage,
            [styles.sousPartieButtonMinimized]: minimized,
          })}>
          <div className={styles.sousPartieCircle} />
          <span className={styles.sousPartieText}>Introduction</span>
        </button>
        {fiche.parties.map((partie, partieIdx) => (
          <div key={partie.id} className={classNames(styles.partieGroup, { [styles.partieGroupMinimized]: minimized })}>
            <p className={styles.partieLabel}>Partie {partieIdx + 1}</p>
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
