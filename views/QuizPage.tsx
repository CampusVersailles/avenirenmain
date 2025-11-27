import Block from "@/components/Block/Block"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import QuizComponent from "@/components/Quiz/Quiz"

const QuizPage = () => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Quiz", href: "/quiz" },
        ]}
      />
      <Block>
        <QuizComponent />
      </Block>
    </>
  )
}

export default QuizPage
