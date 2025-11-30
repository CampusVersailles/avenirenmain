import QuizResults from "@/components/Quiz/QuizResults"
import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import { FiliereCode, VerbeCode } from "@/components/Quiz/Questions"

const QuizResultsPage = ({
  filiere,
  verbe,
  domainesPro,
}: {
  filiere: FiliereCode
  verbe: VerbeCode
  domainesPro: { code: string; description: string }[]
}) => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Quiz", href: "/quiz" },
          { label: "Résultats", href: "/quiz/resultats" },
        ]}
      />
      <Block>
        <QuizResults filiere={filiere} verbe={verbe} domainesPro={domainesPro} />
      </Block>
    </>
  )
}

export default QuizResultsPage
