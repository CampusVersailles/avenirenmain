import { FiliereCode, VerbeCode } from "@/components/Quiz/Questions"
import { quizResultsByCombination } from "@/components/Quiz/Results"
import { getDomainesPro } from "@/strapi/filieres"
import QuizResultsPage from "@/views/QuizResultsPage"
import { Metadata } from "next"

type Props = { searchParams: Promise<{ [key: string]: string | undefined }> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.searchParams

  const filiere = (params.filiere as FiliereCode) || "ART"
  const verbe = (params.verbe as VerbeCode) || "Organiser"

  const result = quizResultsByCombination[filiere][verbe]

  return {
    title: "Quiz | L’Avenir en Main",
    description: result.description,
    openGraph: {
      title: "🎉 Voici les résultats de ton quiz !",
      description: result.description,
      images: [{ url: `${process.env.NEXT_PUBLIC_URL}/meta/og.png` }],
    },
  }
}

const QuizResultats = async ({ searchParams }: Props) => {
  const params = await searchParams
  const domainesPro = await getDomainesPro()

  const filiere = (params.filiere as FiliereCode) || "ART"
  const verbe = (params.verbe as VerbeCode) || "Organiser"

  return <QuizResultsPage filiere={filiere} verbe={verbe} domainesPro={domainesPro} />
}

export default QuizResultats
