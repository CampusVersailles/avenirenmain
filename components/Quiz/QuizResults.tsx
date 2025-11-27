"use client"
import { getMetierByRomeCode, Metier } from "@/strapi/metier"
import FiliereMetier from "../FiliereMetier/FiliereMetier"
import { AnswersByQuestionId, FiliereCode, filieresQuestions, VerbeCode, verbesQuestions } from "./Questions"
import styles from "./QuizResults.module.css"
import { quizResultsByCombination } from "./Results"
import { FiliereAvecMetiers, getFiliereById } from "@/strapi/filieres"
import { useEffect, useState } from "react"
import Link from "next/link"

const QuizResults = ({ answers }: { answers: AnswersByQuestionId }) => {
  const filieresResults: Record<FiliereCode, number> = filieresQuestions.reduce(
    (acc: Record<FiliereCode, number>, question) => {
      const answer = question.answers.find((a) => a.id === answers[question.id])
      if (!answer) return acc
      acc[answer.code] = (acc[answer.code] || 0) + 1
      return acc
    },
    {} as Record<FiliereCode, number>,
  )

  const verbesResults: Record<VerbeCode, number> = verbesQuestions.reduce(
    (acc: Record<VerbeCode, number>, question) => {
      const answer = question.answers.find((a) => a.id === answers[question.id])
      if (!answer) return acc
      acc[answer.code] = (acc[answer.code] || 0) + 1
      return acc
    },
    {} as Record<VerbeCode, number>,
  )

  let maxVerbe: VerbeCode = "Organiser"
  let maxVerbeValue = 0
  for (const [key, value] of Object.entries(verbesResults)) {
    if (value > maxVerbeValue) {
      maxVerbeValue = value
      maxVerbe = key as VerbeCode
    }
  }

  let maxFiliere: FiliereCode = "ART"
  let maxFiliereValue = 0
  for (const [key, value] of Object.entries(filieresResults)) {
    if (value > maxFiliereValue) {
      maxFiliereValue = value
      maxFiliere = key as FiliereCode
    }
  }

  const result = quizResultsByCombination[maxFiliere][maxVerbe]

  const [metiersWithFilieres, setMetiersWithFilieres] = useState<{ metier: Metier; filiere: FiliereAvecMetiers }[]>([])

  useEffect(() => {
    async function load() {
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
  }, [result.metiers])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎉 Voici les résultats de ton quiz !</h1>
      <p className={styles.description}>{result.description}</p>

      <p className={styles.metiersTitle}>As-tu pensé à regarder les métiers de...</p>

      <div className={styles.metiers}>
        {metiersWithFilieres.map((mf) => (
          <FiliereMetier key={mf.metier.documentId} metier={mf.metier} filiere={mf.filiere} />
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <Link className={styles.button} href={`/metiers`}>
          <p>Profites-en pour explorer aussi les autres métiers !</p>
        </Link>
      </div>
    </div>
  )
}
export default QuizResults
