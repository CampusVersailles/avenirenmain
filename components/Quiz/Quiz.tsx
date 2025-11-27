"use client"
import { useState } from "react"
import { allQuestions, AnswersByQuestionId } from "./Questions"
import styles from "./Quiz.module.css"
import QuizResults from "./QuizResults"

export const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswersByQuestionId>({})
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = allQuestions[currentIndex]

  const handleSelect = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }))
  }

  const handleNext = () => {
    if (currentIndex === allQuestions.length - 1) {
      setShowResults(true)
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  const selectedAnswerId = answers[currentQuestion?.id]
  const canGoNext = Boolean(selectedAnswerId)

  if (showResults) {
    return <QuizResults answers={answers} />
  }

  return (
    <div className={styles.quizContainer}>
      <p className={styles.quizTitle}>{currentQuestion.text}</p>

      <div className={styles.quizOptions}>
        {currentQuestion.answers.map((answer) => {
          const isSelected = selectedAnswerId === answer.id
          return (
            <button
              key={answer.id}
              type='button'
              className={`${styles.quizOption} ${isSelected ? styles.quizOptionSelected : ""}`}
              onClick={() => handleSelect(currentQuestion.id, answer.id)}>
              <span className={styles.quizOptionCheckbox}>
                {isSelected && <span className={styles.quizOptionCheckboxInner} />}
              </span>
              <p className={styles.quizOptionText}>{answer.text}</p>
            </button>
          )
        })}
      </div>

      <button type='button' className={styles.quizNext} disabled={!canGoNext} onClick={handleNext}>
        {currentIndex === allQuestions.length - 1 ? "Terminer" : "Suivant"}
      </button>
    </div>
  )
}
export default Quiz
