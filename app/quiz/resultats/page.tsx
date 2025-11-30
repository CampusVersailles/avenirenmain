import { FiliereCode, VerbeCode } from "@/components/Quiz/Questions"
import { getDomainesPro } from "@/strapi/filieres"
import QuizResultsPage from "@/views/QuizResultsPage"

const QuizResultats = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
  const params = await searchParams
  const domainesPro = await getDomainesPro()

  const filiere = (params.filiere as FiliereCode) || "ART"
  const verbe = (params.verbe as VerbeCode) || "Organiser"

  return <QuizResultsPage filiere={filiere} verbe={verbe} domainesPro={domainesPro} />
}

export default QuizResultats
