"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import FichePratiqueIntro from "./FichePratiqueIntro"
import FichePratiqueStep from "./FichePratiqueStep"
import FichePratiqueAside from "./FichePratiqueAside"
import {
  FichePratiqueDetailStrapi,
  FichePratiquePartieStrapi,
  FichePratiqueSousPartieStrapi,
} from "@/strapi/ressources"
import styles from "./FichePratiqueDetail.module.css"

type StepInfo = {
  partieIndex: number
  sousPartieIndex: number
  partie: FichePratiquePartieStrapi
  sousPartie: FichePratiqueSousPartieStrapi
}

const FichePratiqueDetail = ({ fiche }: { fiche: FichePratiqueDetailStrapi }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const allSteps: StepInfo[] = useMemo(() => {
    const steps: StepInfo[] = []
    fiche.parties.forEach((partie, partieIndex) => {
      partie.sousParties.forEach((sousPartie, sousPartieIndex) => {
        steps.push({ partieIndex, sousPartieIndex, partie, sousPartie })
      })
    })
    return steps
  }, [fiche.parties])

  const partieParam = searchParams.get("partie") ? parseInt(searchParams.get("partie")!) : null
  const sousPartieParam = searchParams.get("sousPartie") ? parseInt(searchParams.get("sousPartie")!) : null

  const isIntroPage = partieParam === null && sousPartieParam === null
  const totalSteps = allSteps.length

  const currentStep = useMemo(() => {
    if (isIntroPage) {
      return null
    }
    const step = allSteps.find((s) => s.partieIndex === partieParam && s.sousPartieIndex === sousPartieParam)
    return step
  }, [isIntroPage, partieParam, sousPartieParam, allSteps])

  const goToStep = (partieIndex: number, sousPartieIndex: number) => {
    const params = new URLSearchParams()
    params.set("partie", String(partieIndex))
    params.set("sousPartie", String(sousPartieIndex))
    router.push(`?${params.toString()}`)
  }

  const goToIntro = () => {
    router.push(window.location.pathname)
  }

  const handleNext = () => {
    if (!currentStep) {
      return
    }
    const currentIdx = allSteps.findIndex((s) => s === currentStep)
    if (currentIdx < allSteps.length - 1) {
      const next = allSteps[currentIdx + 1]
      goToStep(next.partieIndex, next.sousPartieIndex)
    }
  }

  const handlePrev = () => {
    if (!currentStep) {
      return
    }
    const currentIdx = allSteps.findIndex((s) => s === currentStep)
    if (currentIdx > 0) {
      const prev = allSteps[currentIdx - 1]
      goToStep(prev.partieIndex, prev.sousPartieIndex)
    }
  }

  return (
    <>
      <div className={styles.introBadge}>{fiche.type && <p className={styles.badge}>{fiche.type}</p>}</div>
      <div className={styles.layout}>
        <article className={styles.content}>
          {isIntroPage ? (
            <FichePratiqueIntro fiche={fiche} onStart={() => goToStep(0, 0)} />
          ) : (
            currentStep && (
              <FichePratiqueStep
                currentStep={currentStep}
                allSteps={allSteps}
                handlePrev={currentStep.partieIndex === 0 && currentStep.sousPartieIndex === 0 ? goToIntro : handlePrev}
                handleNext={handleNext}
              />
            )
          )}
        </article>
        <FichePratiqueAside
          fiche={fiche}
          allSteps={allSteps}
          currentStep={currentStep}
          isIntroPage={isIntroPage}
          totalSteps={totalSteps}
          goToIntro={goToIntro}
          goToStep={goToStep}
        />
      </div>
    </>
  )
}

export default FichePratiqueDetail
