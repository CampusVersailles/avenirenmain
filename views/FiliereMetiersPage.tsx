import Block from "@/components/Block/Block"
import FiliereMetiers from "@/components/FiliereMetier/FiliereMetiers"
import { FiliereAvecMetiers } from "@/strapi/filieres"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"

const mappingNomFiliereTitle: Record<string, string> = {
  "Artisanat d'art & design": "Découvrez les métiers de l'Artisanat d'art & design",
  "Horticulture & Paysage": "Découvrez les métiers de l'Horticulture & Paysage",
  "Accueil & Tourisme": "Découvrez les métiers de l'Accueil & Tourisme",
  "Patrimoine bâti": "Découvrez les métiers du Patrimoine bâti",
  Gastronomie: "Découvrez les métiers de la Gastronomie",
}

const FiliereMetiersPage = ({ filiere }: { filiere: FiliereAvecMetiers }) => {
  return (
    <Block>
      {/* TODO: Icone de la filière */}
      <h1>{mappingNomFiliereTitle[filiere.nom]}</h1>
      <p>{filiere.description}</p>
      <FiliereMetiers filiere={filiere} />
    </Block>
  )
}

export default FiliereMetiersPage
