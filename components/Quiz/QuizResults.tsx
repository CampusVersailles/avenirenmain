"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { getMetierByRomeCode, Metier } from "@/strapi/metiers"
import FiliereMetier from "../FiliereMetier/FiliereMetier"
import { AnswersByQuestionId, FiliereCode, filieresQuestions, VerbeCode, verbesQuestions } from "./Questions"
import styles from "./QuizResults.module.css"
import { quizResultsByCombination } from "./Results"
import { FiliereAvecMetiers, getFiliereById } from "@/strapi/filieres"

function buildScores<Code extends string>(
  questions: { id: string; answers: { id: string; code: Code }[] }[],
  answers: AnswersByQuestionId,
): Record<Code, number> {
  return questions.reduce(
    (acc, question) => {
      const selectedId = answers[question.id]
      if (!selectedId) return acc

      const answer = question.answers.find((a) => a.id === selectedId)
      if (!answer) return acc

      acc[answer.code] = (acc[answer.code] || 0) + 1
      return acc
    },
    {} as Record<Code, number>,
  )
}

function getMaxKey<Code extends string>(scores: Record<Code, number>, fallback: Code): Code {
  let maxKey = fallback
  let maxValue = -1

  for (const [key, value] of Object.entries(scores) as [Code, number][]) {
    if (value > maxValue) {
      maxValue = value
      maxKey = key
    }
  }

  return maxKey
}

const QuizResults = ({ answers }: { answers: AnswersByQuestionId }) => {
  const filieresResults = useMemo(() => buildScores<FiliereCode>(filieresQuestions, answers), [answers])

  const verbesResults = useMemo(() => buildScores<VerbeCode>(verbesQuestions, answers), [answers])

  const maxFiliere = getMaxKey<FiliereCode>(filieresResults, "ART")
  const maxVerbe = getMaxKey<VerbeCode>(verbesResults, "Organiser")

  const result = quizResultsByCombination[maxFiliere]?.[maxVerbe]

  const [metiersWithFilieres, setMetiersWithFilieres] = useState<{ metier: Metier; filiere: FiliereAvecMetiers }[]>([])

  useEffect(() => {
    async function load() {
      if (!result) return
      const metiersWithFilieres = await Promise.all(
        result.metiers.map(async (romeCode) => {
          const metier = await getMetierByRomeCode(romeCode)
          const filiere = await getFiliereById(metier.filieres[0].documentId)
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
      <h1 className={styles.title}>🎉 Voici les résultats de ton quiz !</h1>
      <p className={styles.description}>{result.description}</p>

      <p className={styles.metiersTitle}>As-tu pensé à regarder les métiers de...</p>

      <div className={styles.metiers}>
        {metiersWithFilieres.map(({ metier, filiere }) => (
          <FiliereMetier key={metier.documentId} metier={metier} filiere={filiere} />
        ))}
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
