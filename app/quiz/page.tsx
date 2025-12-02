import QuizPage from "@/views/QuizPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quiz | L’Avenir en Main",
}

export default function Quiz() {
  return <QuizPage />
}
