"use client"
import { useCallback, useEffect, useState } from "react"
import { allQuestions, AnswersByQuestionId } from "./Questions"
import styles from "./Quiz.module.css"
import QuizResults from "./QuizResults"
import classNames from "classnames"

export const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswersByQuestionId>({})
  const [showResults, setShowResults] = useState(false)

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

    setCurrentIndex((prevIndex) => {
      if (prevIndex === allQuestions.length - 1) {
        setShowResults(true)
        return prevIndex
      }
      return prevIndex + 1
    })
  }, [canGoNext])

  useEffect(() => {
    if (showResults) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const { key } = event

      if (key >= "1" && key <= "9") {
        const index = Number(key) - 1
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
  }, [currentQuestion, canGoNext, handleNext, handleSelect, showResults])

  if (showResults) {
    return <QuizResults answers={answers} />
  }

  const questionLabelId = `question-${currentQuestion.id}`

  return (
    <div className={styles.quizContainer}>
      <p id={questionLabelId} className={styles.quizTitle}>
        {currentQuestion.text}
      </p>

      <div className={styles.quizOptions} role='radiogroup' aria-labelledby={questionLabelId}>
        {currentQuestion.answers.map((answer, index) => {
          const isSelected = selectedAnswerId === answer.id
          const optionId = `${currentQuestion.id}-option-${answer.id}`

          return (
            <button
              key={answer.id}
              id={optionId}
              type='button'
              className={classNames(styles.quizOption, { [styles.quizOptionSelected]: isSelected })}
              onClick={() => handleSelect(currentQuestion.id, answer.id)}
              role='radio'
              aria-checked={isSelected}>
              <div className={styles.quizOptionContent}>
                <span className={styles.quizOptionCheckbox} aria-hidden='true'>
                  {isSelected && <span className={styles.quizOptionCheckboxInner} />}
                </span>

                <p className={styles.quizOptionText}>{answer.text}</p>
              </div>
              <span className={styles.quizOptionKeyHint}>{index + 1}</span>
            </button>
          )
        })}
      </div>

      <button
        type='button'
        className={styles.quizNext}
        disabled={!canGoNext}
        aria-disabled={!canGoNext}
        onClick={handleNext}>
        {currentIndex === allQuestions.length - 1 ? "Terminer" : "Suivant"}
      </button>
    </div>
  )
}

export default Quiz
