import {
  allQuestions,
  AnswersByQuestionId,
  FiliereCode,
  filieresQuestions,
  VerbeCode,
  verbesQuestions,
} from "./Questions"
import styles from "./Quiz.module.css"

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

  return (
    <div className={styles.quizContainer}>
      <p className={styles.quizTitle}>Tes résultats</p>
      <div className={styles.quizResults}>
        {allQuestions.map((q) => {
          const answer = q.answers.find((a) => a.id === answers[q.id])
          if (!answer) return null
          return (
            <div key={q.id} className={styles.quizResultCard}>
              <div className={styles.quizResultQuestion}>{q.text}</div>
              <div className={styles.quizResultAnswer}>{answer.text}</div>
              <div className={styles.quizResultCode}>Code : {answer.code}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default QuizResults
