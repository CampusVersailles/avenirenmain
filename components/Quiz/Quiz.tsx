"use client"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  allQuestions,
  AnswersByQuestionId,
  FiliereCode,
  filieresQuestions,
  VerbeCode,
  verbesQuestions,
} from "./Questions"
import styles from "./Quiz.module.css"
import classNames from "classnames"
import { trackEvent } from "@/lib/gtag"

function buildScores<Code extends string>(
  questions: { id: string; answers: { id: string; code: Code }[] }[],
  answers: AnswersByQuestionId,
): Record<Code, number> {
  return questions.reduce(
    (acc, question) => {
      const selectedId = answers[question.id]
      if (!selectedId) {
        return acc
      }

      const answer = question.answers.find((a) => a.id === selectedId)
      if (!answer) {
        return acc
      }

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

export const Quiz = () => {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswersByQuestionId>({})

  const currentQuestion = allQuestions[currentIndex]
  const selectedAnswerId = answers[currentQuestion?.id]
  const canGoNext = Boolean(selectedAnswerId)

  const handleSelect = useCallback((questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }))
  }, [])

  const handleNext = useCallback(() => {
    if (!canGoNext) {
      return
    }

    if (currentIndex === allQuestions.length - 1) {
      // Calculer les résultats
      const filieresResults = buildScores<FiliereCode>(filieresQuestions, answers)
      const verbesResults = buildScores<VerbeCode>(verbesQuestions, answers)

      const maxFiliere = getMaxKey<FiliereCode>(filieresResults, "ART")
      const maxVerbe = getMaxKey<VerbeCode>(verbesResults, "Organiser")

      // Rediriger avec les résultats en query params
      trackEvent("quiz_fini", { maxFiliere, maxVerbe })
      trackEvent(`quiz_filiere_${maxFiliere}`)
      trackEvent(`quiz_verbe_${maxVerbe}`)
      router.push(`/quiz/resultats?filiere=${maxFiliere}&verbe=${maxVerbe}`)
      return
    }

    setCurrentIndex((prevIndex) => prevIndex + 1)
  }, [canGoNext, currentIndex, answers, router])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const { key } = event
      let index: number | null = null
      if (key >= "1" && key <= "9") {
        index = Number(key) - 1
      } else if (key >= "a" && key <= "z") {
        index = key.charCodeAt(0) - "a".charCodeAt(0)
      } else if (key >= "A" && key <= "Z") {
        index = key.charCodeAt(0) - "A".charCodeAt(0)
      }

      if (key === "ArrowUp" || key === "ArrowDown") {
        const currentAnswerIndex = currentQuestion.answers.findIndex((answer) => answer.id === selectedAnswerId)

        if (key === "ArrowUp") {
          if (currentAnswerIndex > 0) {
            index = currentAnswerIndex - 1
          } else if (currentAnswerIndex === -1 && currentQuestion.answers.length > 0) {
            index = currentQuestion.answers.length - 1
          }
        } else if (key === "ArrowDown") {
          if (currentAnswerIndex < currentQuestion.answers.length - 1) {
            index = currentAnswerIndex + 1
          } else if (currentAnswerIndex === -1 && currentQuestion.answers.length > 0) {
            index = 0
          }
        }
      }

      if (index !== null) {
        const answer = currentQuestion.answers[index]

        if (answer) {
          event.preventDefault()
          handleSelect(currentQuestion.id, answer.id)
        }
      }

      if (key === "Enter") {
        if (canGoNext) {
          event.preventDefault()
          handleNext()
        }
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [currentQuestion, canGoNext, handleNext, handleSelect, selectedAnswerId])

  const questionLabelId = `question-${currentQuestion.id}`

  return (
    <div className={styles.quizContainer}>
      <div role='status' aria-live='polite'>
        <p>
          Question {currentIndex + 1} sur {allQuestions.length}
        </p>
        <p id={questionLabelId} className={styles.quizTitle}>
          {currentQuestion.text}
        </p>
      </div>

      <div className={styles.quizOptions} role='radiogroup' aria-labelledby={questionLabelId} aria-required='true'>
        {currentQuestion.answers.map((answer, index) => {
          const isSelected = selectedAnswerId === answer.id
          const optionId = `${currentQuestion.id}-option-${answer.id}`

          return (
            <label
              key={answer.id}
              htmlFor={optionId}
              className={classNames(styles.quizOption, {
                [styles.quizOptionSelected]: isSelected,
              })}>
              <input
                id={optionId}
                type='radio'
                name={currentQuestion.id}
                value={answer.id}
                checked={isSelected}
                onChange={() => handleSelect(currentQuestion.id, answer.id)}
                className={styles.hiddenRadio}
                aria-describedby={`hint-${index}`}
              />

              <div className={styles.quizOptionContent}>
                <span
                  className={classNames(styles.quizOptionCheckbox, { [styles.quizOptionCheckboxSelected]: isSelected })}
                  aria-hidden='true'
                />

                <p className={styles.quizOptionText}>{answer.text}</p>
              </div>

              <span
                id={`hint-${index}`}
                className={styles.quizOptionKeyHint}
                aria-label={`Touche ${String.fromCharCode(65 + index)}`}>
                {String.fromCharCode(65 + index)}
              </span>
            </label>
          )
        })}
      </div>

      <button
        type='button'
        className={styles.quizNext}
        disabled={!canGoNext}
        aria-disabled={!canGoNext}
        aria-label={currentIndex === allQuestions.length - 1 ? "Terminer le quiz" : "Question suivante"}
        onClick={handleNext}>
        {currentIndex === allQuestions.length - 1 ? "Terminer" : "Suivant"}
      </button>
    </div>
  )
}

export default Quiz
