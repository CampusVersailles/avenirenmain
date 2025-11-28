import { FiliereCode, VerbeCode } from "./Questions"

export interface QuizResult {
  filiere: FiliereCode
  verbe: VerbeCode
  text: string
  jobs: string[]
}

export const quizResultsByCombination: Record<
  FiliereCode,
  Record<VerbeCode, { description: string; metiers: string[] }>
> = {
  ART: {
    Concevoir: {
      description:
        "On dirait que ton truc, c'est l'artisanat d'art ! Tu es créatif et réfléchi, tu as le sens du détail et un oeil pour les tendances ! Tu aimes traduire tes idées en mots ou en images.",
      metiers: ["E1104", "H1204"],
    },
    Fabriquer: {
      description:
        "On dirait que ton truc, c'est l'artisanat d'art ! Tu es créatif et habile de tes mains. Tu as un goût pour les belles matières et les beaux objets et tu aimes découvrir leurs secrets de fabrication.",
      metiers: ["B1605", "B1804", "B1201", "B1301"],
    },
    Echanger: {
      description:
        "On dirait que ton truc, c'est l'artisanat d'art ! Tu es curieux, sociable et dynamique, tu t'intéresses à l'art et à la culture. Tu aimes partager tes connaissances et capter l'attention des autres en racontant des histoires.",
      metiers: ["D1201", "G1201", "G1101"],
    },
    Organiser: {
      description:
        "On dirait que ton truc, c'est l'artisanat d'art ! Tu es un pro de l'organisation et tu aimes motiver les troupes. Aucun détail ne t'échappe et tu t'intéresses aux arts et à la culture.",
      metiers: ["K1602", "K1601", "H2505"],
    },
  },
  GASTRO: {
    Concevoir: {
      description:
        "Mettons les pieds dans le plat : pour toi, la cuisine/gastronomie c'est tout une expérience. Tu es inventif, tu aimes te projeter et tu aimes que les gens passent un bon moment.",
      metiers: ["G1402", "G1601"],
    },
    Fabriquer: {
      description:
        "Mettons les pieds dans le plat : tu as l'air d'être fait pour la cuisine ! Tu aimes travailler les bons produits et sublimer les aliments pour ravir les papilles de chacun.",
      metiers: ["D1102", "A1412", "G1608"],
    },
    Echanger: {
      description:
        "Mettons les pieds dans le plat : pour toi, la cuisine c'est un vrai moment de partage. Tu es sociable et dynamique et tu as un sens inné de l'accueil.",
      metiers: ["G1802", "G1803"],
    },
    Organiser: {
      description:
        "Mettons les pieds dans le plat : pour toi, la cuisine c'est tout un art. Tu as l'air d'être un pro de l'organisation et d'aimer motiver les troupes. Tu es dynamique et rigoureux et tu aimes recevoir.",
      metiers: ["G1802", "G1401", "G1402"],
    },
  },
  HORTI: {
    Concevoir: {
      description:
        "Tu sembles avoir la main verte ! Tu t'intéresses à la faune et la flore, tu aimes faire des expériences et protéger l'environnement est super important pour toi.",
      metiers: ["A1303", "A1301"],
    },
    Fabriquer: {
      description:
        "Tu sembles avoir la main verte ! Tu es dynamique, tu aimes passer du temps dehors, faire une activité physique et pour toi, protéger l'environnement c'est super important.",
      metiers: ["A1414", "A1204", "A1203"],
    },
    Echanger: {
      description:
        "Tu sembles avoir la main verte ! Tu es sociable, dynamique et pour toi, rien de mieux que des fleurs pour faire plaisir.",
      metiers: ["D1209"],
    },
    Organiser: {
      description:
        "Tu sembles avoir la main verte ! Tu es un pro de l'organisation, tu aimes voir le résultat de tes actions et tu as un petit côté scientifique.",
      metiers: ["A1303", "A1420"],
    },
  },
  PATRI: {
    Concevoir: {
      description:
        "Tu aimes apporter ta pierre à l'édifice : ton truc, c'est la construction et les bâtiments chargés d'histoire.Tu aimes imaginer et innover. Tu es rigoureux et pour toi, les idées doivent pouvoir s'appliquer concrètement.",
      metiers: ["F1101", "F1102", "F1106"],
    },
    Fabriquer: {
      description:
        "Tu aimes apporter ta pierre à l'édifice ! Tu es dynamique et sportif, et te servir de tes mains n'est pas un problème. Tu as un petit faible pour les bâtiments chargés d'histoire.",
      metiers: ["H2206", "F1703", "F1606", "F1502"],
    },
    Echanger: {
      description:
        "Tu aimes apporter ta pierre à l'édifice ! Tu es curieux, sociable et dynamique. Tu t'intéresses à l'art et aux monuments chargés d'histoire et tu aimes partager ta passion.",
      metiers: ["G1201"],
    },
    Organiser: {
      description:
        "Tu aimes apporter ta pierre à l'édifice ! Ton truc, c'est d'être dans le feu de l'action et de donner le tempo. Etre dehors n'est pas un problème pour toi. Tu aimes la construction et les bâtiments chargés d'histoire.",
      metiers: ["F1202", "F1201"],
    },
  },
  TOUR: {
    Concevoir: {
      description:
        "En avant, toute ! Tu aimes voyager et découvrir d'autres cultures. Ton truc, c'est d'imaginer des itinéraires ou des expériences et de convaincre les autres de t'accompagner.",
      metiers: ["G1303", "G1301", "G1102"],
    },
    Fabriquer: {
      description:
        "En avant, toute ! Tu es dynamique, débrouillard, curieux et créatif. Tu aimes donner vie à des moments uniques et être sur le terrain.",
      metiers: ["E1107", "G1102"],
    },
    Echanger: {
      description:
        "En avant, toute ! Tu es chaleureux, dynamique et curieux. Tu aimes te faire l'ambassadeur d'un lieu / te sentir chez toi partout, anticiper les besoins des autres et tu as le sens du commerce.",
      metiers: ["M1601", "D1402", "G1802", "G1703"],
    },
    Organiser: {
      description:
        "En avant, toute ! Tu aimes le tourisme et tu adores recevoir. Tu es un pro de l'organisation et tu aimes motiver les troupes. Ton truc, c'est d'être dans le feu de l'action !",
      metiers: ["G1402", "G1403"],
    },
  },
}
