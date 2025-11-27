export type FiliereCode = "GASTRO" | "ART" | "PATRI" | "HORTI" | "TOUR"
export type VerbeCode = "Concevoir" | "Fabriquer" | "Echanger" | "Organiser"

export interface AnswerOption<Code extends string = string> {
  id: string
  text: string
  code: Code
}

export interface Question<Code extends string = string> {
  id: string
  text: string
  answers: AnswerOption<Code>[]
}

export type AnyCode = FiliereCode | VerbeCode
export type AnyQuestion = Question<AnyCode>

export const filieresQuestions: Question<FiliereCode>[] = [
  {
    id: "Q1",
    text: "⚙️ Tu organises une activité avec tes amis. Tu leur proposes...",
    answers: [
      {
        id: "Q1_R1",
        text: "Une sortie au resto",
        code: "GASTRO",
      },
      {
        id: "Q1_R2",
        text: "Un atelier DIY",
        code: "ART",
      },
      {
        id: "Q1_R3",
        text: "La visite d'un château",
        code: "PATRI",
      },
      {
        id: "Q1_R4",
        text: "Une balade dans la nature",
        code: "HORTI",
      },
      {
        id: "Q1_R5",
        text: "Un jeu de piste dans la ville",
        code: "TOUR",
      },
    ],
  },
  {
    id: "Q2",
    text: "😴 Enfant, tu rêvais d'être...",
    answers: [
      {
        id: "Q2_R1",
        text: "Bob le bricoleur, qui répare et construit tout",
        code: "PATRI",
      },
      {
        id: "Q2_R2",
        text: "Merida dans le Disney Rebelle, qui adore s'aventurer dans la forêt...",
        code: "HORTI",
      },
      {
        id: "Q2_R3",
        text: "Rémy, le rat chef cuisinier dans Ratatouille",
        code: "GASTRO",
      },
      {
        id: "Q2_R4",
        text: "Léonard de Vinci, le génie de la Renaissance, à la fois artiste et inventeur",
        code: "ART",
      },
      {
        id: "Q2_R5",
        text: "Indiana Jones, l'explorateur, toujours en quête de découvertes autour du monde",
        code: "TOUR",
      },
    ],
  },
  {
    id: "Q3",
    text: "🌏 Tu fais un voyage à l'étranger, sur place tu...",
    answers: [
      {
        id: "Q3_R1",
        text: "T'intéresses à la faune et la flore locales et visites les jardins botaniques",
        code: "HORTI",
      },
      {
        id: "Q3_R2",
        text: "Tu admires les monuments et prends plein de photos pour comprendre leur architecture",
        code: "PATRI",
      },
      {
        id: "Q3_R3",
        text: "Apprends la langue et deviens bestie avec les locaux",
        code: "TOUR",
      },
      {
        id: "Q3_R4",
        text: "Cherches les restaurants et pâtisseries pour goûter les spécialités culinaires",
        code: "GASTRO",
      },
      {
        id: "Q3_R5",
        text: "Tu rentres dans toutes les boutiques des artisans pour trouver des souvenirs",
        code: "ART",
      },
    ],
  },
  {
    id: "Q4",
    text: "🧩 À quoi ressemblaient tes dimanches d'enfance ?",
    answers: [
      {
        id: "Q4_R1",
        text: "Tu construisais des cabanes dehors ou chez toi avec des coussins et des couettes",
        code: "PATRI",
      },
      {
        id: "Q4_R2",
        text: "Tu faisais des promenades en forêt, admirais chaque arbre et ramassais des fleurs",
        code: "HORTI",
      },
      {
        id: "Q4_R3",
        text: "Tu cuisinais les crêpes ou les gâteaux du goûter",
        code: "GASTRO",
      },
      {
        id: "Q4_R4",
        text: "Tu organisais des voyages imaginaires dans ta chambre avec tes doudous",
        code: "TOUR",
      },
      {
        id: "Q4_R5",
        text: "Tu dessinais et bricolais des objets avec tout ce qui te tombait sous la main",
        code: "ART",
      },
    ],
  },
  {
    id: "Q5",
    text: "🎓 Si tu pouvais passer une journée entière à apprendre quelque chose, ce serait...",
    answers: [
      {
        id: "Q5_R1",
        text: "Faire pousser un potager",
        code: "HORTI",
      },
      {
        id: "Q5_R2",
        text: "Fabriquer ta propre déco de A à Z",
        code: "ART",
      },
      {
        id: "Q5_R3",
        text: "Cuisiner un repas gastronomique avec un-e chef-fe",
        code: "GASTRO",
      },
      {
        id: "Q5_R4",
        text: "Découvrir l'histoire d'une civilisation",
        code: "TOUR",
      },
      {
        id: "Q5_R5",
        text: "Construire une maquette de Notre Dame de Paris",
        code: "PATRI",
      },
    ],
  },
  {
    id: "Q6",
    text: "🍿 Si tu devais voir un film...",
    answers: [
      {
        id: "Q6_R1",
        text: "Iron Man, pour construire tes robots",
        code: "ART",
      },
      {
        id: "Q6_R2",
        text: "Willy Wonka, pour la gourmandise",
        code: "GASTRO",
      },
      {
        id: "Q6_R3",
        text: "Raiponce, pour la découverte de la nature",
        code: "HORTI",
      },
      {
        id: "Q6_R4",
        text: "La Reine des Neiges, pour construire des châteaux en un claquement de doigts",
        code: "PATRI",
      },
      {
        id: "Q6_R5",
        text: "Emily in Paris pour jouer la touriste",
        code: "TOUR",
      },
    ],
  },
]

export const verbesQuestions: Question<VerbeCode>[] = [
  {
    id: "Q1",
    text: "🤔 Dans les travaux de groupe, c'est souvent toi qui...",
    answers: [
      {
        id: "Q1_R1",
        text: "Imagines le plan, le déroulé et les thématiques",
        code: "Concevoir",
      },
      {
        id: "Q1_R2",
        text: "Réalises les posters ou le Powerpoint",
        code: "Fabriquer",
      },
      {
        id: "Q1_R3",
        text: "Fais la présentation devant la classe et réponds aux questions",
        code: "Echanger",
      },
      {
        id: "Q1_R4",
        text: "Distribues les rôles entre les participants et organises les réunions",
        code: "Organiser",
      },
    ],
  },
  {
    id: "Q2",
    text: "🎭 Tu prépares une pièce de théâtre avec tes amis, tu préfères être...",
    answers: [
      {
        id: "Q2_R1",
        text: "L'acteur·ice : la partie la plus importante, c'est ce qui se passe sur scène",
        code: "Echanger",
      },
      {
        id: "Q2_R2",
        text: "Le ou la metteur·euse en scène : ce qui te plaît c'est faire le lien entre tout le monde",
        code: "Organiser",
      },
      {
        id: "Q2_R3",
        text: "Le ou la décorateur·ice / costumier·e : tu aimes préparer l'ambiance",
        code: "Fabriquer",
      },
      {
        id: "Q2_R4",
        text: "L'auteur·rice : tu écris l'histoire et imagines les dialogues",
        code: "Concevoir",
      },
    ],
  },
  {
    id: "Q3",
    text: "🎂 Tu viens d'avoir une idée de génie pour ta soirée d'anniversaire...",
    answers: [
      {
        id: "Q3_R1",
        text: "Tu fais une liste des tâches prioritaires et demandes à chacun de t'aider",
        code: "Organiser",
      },
      {
        id: "Q3_R2",
        text: "Tu te dépêches de raconter à tes amis l'éclair de génie que tu viens d'avoir",
        code: "Echanger",
      },
      {
        id: "Q3_R3",
        text: "Tu ne penses qu'à commencer la déco",
        code: "Fabriquer",
      },
      {
        id: "Q3_R4",
        text: "Tu te mets tout de suite à imaginer tout ce qu'il faut préparer",
        code: "Concevoir",
      },
    ],
  },
  {
    id: "Q4",
    text: "🧠 On te confie un gros projet à l'école ou au travail, tu commences par...",
    answers: [
      {
        id: "Q4_R1",
        text: "Lancer une discussion avec les personnes concernées pour bien comprendre",
        code: "Echanger",
      },
      {
        id: "Q4_R2",
        text: "Dessiner ou fabriquer quelque chose pour tester une première idée",
        code: "Fabriquer",
      },
      {
        id: "Q4_R3",
        text: "Organiser les étapes et répartir les rôles",
        code: "Organiser",
      },
      {
        id: "Q4_R4",
        text: "Imaginer plusieurs solutions possibles avant de choisir",
        code: "Concevoir",
      },
    ],
  },
  {
    id: "Q5",
    text: "📚 Quand tu apprends quelque chose de nouveau...",
    answers: [
      {
        id: "Q5_R1",
        text: "Tu cherches à comprendre la logique derrière le concept",
        code: "Concevoir",
      },
      {
        id: "Q5_R2",
        text: "Tu préfères tester avec tes mains",
        code: "Fabriquer",
      },
      {
        id: "Q5_R3",
        text: "Tu prends des notes bien structurées pour t’y retrouver",
        code: "Organiser",
      },
      {
        id: "Q5_R4",
        text: "Tu poses plein de questions pour échanger avec les autres",
        code: "Echanger",
      },
    ],
  },
  {
    id: "Q6",
    text: "🐾 Quel animal te ressemble le plus dans ta façon de travailler ?",
    answers: [
      {
        id: "Q6_R1",
        text: "Le chat, curieux, tu aimes explorer et comprendre",
        code: "Echanger",
      },
      {
        id: "Q6_R2",
        text: "Le castor, tu construis et fabriques sans t'arrêter",
        code: "Fabriquer",
      },
      {
        id: "Q6_R3",
        text: "Le poulpe, tu as autant d'idées que de pattes",
        code: "Concevoir",
      },
      {
        id: "Q6_R4",
        text: "La fourmi, avec toi tout est millimétré, chacun sait ce qu'il doit faire",
        code: "Organiser",
      },
    ],
  },
]

export const allQuestions: AnyQuestion[] = [...filieresQuestions, ...verbesQuestions]

export type AnswersByQuestionId = Record<string, AnswerOption["id"]>
