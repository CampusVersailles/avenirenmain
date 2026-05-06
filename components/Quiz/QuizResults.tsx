"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getMetierByRomeCode, Metier } from "@/strapi/metiers"
import FiliereMetier from "../FiliereMetier/FiliereMetier"
import { FiliereCode, VerbeCode } from "./Questions"
import styles from "./QuizResults.module.css"
import { quizResultsByCombination } from "./Results"
import { FiliereAvecMetiersComplets, getFiliereById } from "@/strapi/filieres"
import ShareButton from "../Metier/ShareButton"

const QuizResults = ({
  filiere,
  verbe,
  domainesPro,
}: {
  filiere: FiliereCode
  verbe: VerbeCode
  domainesPro: { code: string; description: string }[]
}) => {
  const result = quizResultsByCombination[filiere]?.[verbe]

  const [metiersWithFilieres, setMetiersWithFilieres] = useState<
    { metier: Metier | null; filiere: FiliereAvecMetiersComplets | null }[]
  >([])

  useEffect(() => {
    async function load() {
      if (!result) return
      const metiersWithFilieres = await Promise.all(
        result.metiers.map(async (romeCode) => {
          const metier = await getMetierByRomeCode(romeCode)
          const filiere = metier ? await getFiliereById(metier.filieres[0].documentId) : null
          return { metier, filiere }
        }),
      )
      setMetiersWithFilieres(metiersWithFilieres)
    }
    load()
  }, [result])

  if (!result) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Oups 😅</h1>
        <p className={styles.description}>
          On n'a pas réussi à trouver un résultat pour cette combinaison de réponses.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🎉 Voici les résultats de ton quiz !</h1>
        <ShareButton ariaLabel='Partager les résultats du quiz' tracking='Quiz' />
      </div>
      <p className={styles.description}>{result.description}</p>

      <p className={styles.metiersTitle}>As-tu pensé à regarder les métiers de...</p>

      <div className={styles.metiers}>
        {metiersWithFilieres.map(({ metier, filiere }) =>
          metier && filiere ? (
            <FiliereMetier key={metier.documentId} metier={metier} filiere={filiere} domainesPro={domainesPro} />
          ) : null,
        )}
      </div>

      <div className={styles.buttonContainer}>
        <Link className={styles.button} href='/metiers'>
          <p>Profites-en pour explorer aussi les autres métiers !</p>
        </Link>
      </div>
    </div>
  )
}

export default QuizResults
