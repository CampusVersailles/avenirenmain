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
        "On dirait que ton truc, c'est l'artisanat d'art ... tendances ! Tu aimes traduire tes idées en mots ou en images.",
      metiers: ["Concepteur de contenus multimédia", "Designer industriel"],
    },
    Fabriquer: {
      description:
        "On dirait que ton truc, c'est l'artisanat d'art ! Tu es un vrai créatif et tu as l'air d'aimer créer des objets beaux et uniques. Tu es patient, curieux et tu as un vrai sens du détail : pour toi, chaque objet doit être parfait jusque dans les moindres finitions. Tu aimes sans doute travailler avec tes mains et manipuler différentes matières. L'observation et la précision sont tes points forts : tu aimes regarder comment sont fabriquées les choses, comprendre les techniques, et pourquoi pas, découvrir leurs secrets de fabrication.",
      metiers: ["Bijoutier / Bijoutière", "Céramiste d'art", "Brodeur / Brodeuse", "Étalagiste"],
    },
    Echanger: {
      description:
        "On dirait que ton truc, c'est l'artisanat d'art ! Tu es créatif et tu as l'air d'aimer partager ta passion avec les autres. Tu es sans doute quelqu'un de chaleureux, curieux et patient, qui aime observer les détails et raconter des histoires à partir de ce qu'il voit. Tu es sensible à la beauté des objets et à ce qu'ils racontent. Tu aimes sans doute écouter les autres, échanger avec eux et capter l'attention des autres en racontant des histoires.",
      metiers: ["Guide touristique", "Hôte / Hôtesse d'accueil touristique", "Brocanteur"],
    },
    Organiser: {
      description:
        "On dirait que ton truc, c'est l'artisanat d'art ! Tu es sans doute quelqu'un de rigoureux, curieux et organisé, qui aime que les choses soient bien faites. Tu as un vrai sens de l'esthétique et de la composition : tu fais attention aux couleurs, aux formes, aux matières, et tu aimes que tout soit harmonieux. Tu es aussi quelqu'un de responsable et de sérieux, qui aime prendre des décisions et coordonner les autres. Rien ne t'échappe et tu t'intéresses aux arts et à la culture.",
      metiers: ["Conservateur du patrimoine", "Documentaliste", "Chef d'équipe et d'atelier textile"],
    },
  },
  GASTRO: {
    Concevoir: {
      description:
        "Mettons les pieds dans le plat : pour toi, la cuisine, c'est tout un art. Tu es sans doute créatif et curieux, tu aimes imaginer de nouvelles recettes, tester des associations de saveurs et surprendre les autres avec des plats originaux. Tu as le sens du détail, tu observes, tu goûtes, tu ajustes jusqu'à ce que ce soit parfait. Tu es aussi quelqu'un de généreux : pour toi, la cuisine, c'est un moyen de faire plaisir et de partager de bons moments avec les autres. Tu aimes t'occuper des autres, créer une ambiance chaleureuse et conviviale, et tu es sans doute très attentif à ce que les gens ressentent. Tu as aussi un bon sens de l'organisation : tu sais planifier, anticiper et gérer plusieurs tâches en même temps. Tu aimes travailler en équipe et tu te sens à l'aise dans un environnement dynamique. Tu adores quand ça bouge, que ça discute et que ça rit autour de toi. En résumé, tu es créatif, généreux, observateur, et tu aimes que les gens passent un bon moment.",
      metiers: ["Directeur en hotellerie restauration", "Chef de cuisine"],
    },
    Fabriquer: {
      description:
        "Mettons les pieds dans le plat : tu as l'air d'aimer mettre la main à la pâte, au sens propre comme au figuré ! Tu es sans doute quelqu'un de manuel, rigoureux et patient, qui aime transformer des ingrédients simples en quelque chose de bon et de beau. Tu aimes sentir, toucher, façonner, goûter, ajuster… bref, tu aimes être au cœur de l'action. Tu es observateur, tu fais attention aux détails, aux textures, aux odeurs, et tu as à cœur que le résultat soit à la hauteur. Tu es aussi quelqu'un de persévérant : tu sais que pour réussir une recette, il faut parfois recommencer plusieurs fois, affiner les gestes, respecter les temps, les proportions… et tu ne lâches pas l'affaire facilement. Tu es sans doute matinal, courageux, et tu n'as pas peur des journées bien remplies. Tu aimes le contact avec les produits, notamment ceux de qualité, et tu as peut-être un intérêt pour les produits locaux, artisanaux ou de terroir. En résumé, tu es manuel, rigoureux, observateur, persévérant, et tu aimes sublimer les aliments pour ravir les papilles de chacun.",
      metiers: ["Boulanger", "Fromager", "Ecailler"],
    },
    Echanger: {
      description:
        "Mettons les pieds dans le plat : pour toi, la cuisine, c'est fait pour être partagée ! Tu es sûrement quelqu'un de chaleureux, sociable et dynamique, qui aime le contact avec les autres. Tu as un vrai sens de l'accueil : tu aimes que les gens se sentent bien, tu fais attention à leurs besoins, à ce qu'ils aiment, à ce qui pourrait leur faire plaisir. Tu as le sens du service : tu es attentif, réactif, tu anticipes, tu observes les détails qui font la différence (un verre à remplir, un plat à débarrasser, un sourire à offrir). Tu es aussi à l'aise pour échanger, discuter, conseiller, expliquer les plats, partager ton enthousiasme. Tu aimes sans doute travailler dans des lieux où ça vit, où il y a du passage, de l'ambiance, des rencontres. Tu es aussi quelqu'un de rapide et efficace : tu sais gérer plusieurs tâches à la fois, garder ton calme même quand il y a du monde. En résumé, tu es sociable, dynamique, attentif aux autres, tu as le sens du service et tu aimes l'ambiance conviviale de la restauration.",
      metiers: ["Maître d'hôtel", "Serveur"],
    },
    Organiser: {
      description:
        "Mettons les pieds dans le plat : pour toi, la cuisine c'est tout un art. Tu as l'air d'être un pro de l'organisation et de la coordination ! Tu es sûrement quelqu'un de rigoureux, responsable et réactif, qui aime quand tout est bien planifié. Tu sais répartir les tâches, anticiper les besoins, gérer les imprévus sans paniquer. Tu as le sens des priorités, tu sais prendre des décisions rapidement et tu aimes mener une équipe. Tu es à l'aise pour donner des consignes, expliquer ce qu'il faut faire, vérifier que tout se passe bien. Tu es aussi quelqu'un de sociable : tu aimes le contact avec les autres, que ce soit les clients, les fournisseurs ou les membres de ton équipe. Tu apprécies les environnements dynamiques, où ça bouge, où il y a de l'énergie. En résumé, tu es organisé, responsable, sociable, tu as le sens du service et tu aimes recevoir.",
      metiers: [
        "Maître d'hôtel",
        "Assistant manager en hotellerie restauration",
        "Directeur en hôtellerie restauration",
      ],
    },
  },
  HORTI: {
    Concevoir: {
      description:
        "Tu sembles avoir la main verte ! Tu t'intéresses sûrement beaucoup à la nature, aux plantes, aux paysages. Tu es sans doute quelqu'un d'observateur, de patient et de créatif : tu aimes imaginer, organiser, dessiner ou planifier des espaces extérieurs harmonieux. Tu fais attention aux couleurs, aux formes, aux saisons, à la lumière… Tu as peut-être déjà rêvé d'aménager un jardin, un parc ou même un potager idéal. Tu es aussi quelqu'un de curieux : tu t'intéresses à la biodiversité, aux espèces végétales, aux écosystèmes, à la manière dont tout cela fonctionne ensemble. Tu as à cœur de respecter la nature, de la protéger, et tu trouves important de préserver l'environnement. En résumé, tu es observateur, patient, créatif, curieux, et l'environnement est super important pour toi.",
      metiers: ["Ingénieur agronome", "Technicien de culture maraichère"],
    },
    Fabriquer: {
      description:
        "Tu sembles avoir la main verte ! Tu es dynamique, courageux et tu n'as pas peur de te retrousser les manches. Tu aimes être dehors, au contact de la nature, du sol, des plantes. Tu es sûrement quelqu'un de manuel, patient et observateur. Tu aimes voir le résultat concret de ton travail : une plante qui pousse, un jardin qui prend forme, un paysage qui change au fil des saisons. Tu es aussi quelqu'un de persévérant : tu sais que la nature prend son temps et qu'il faut parfois attendre, recommencer, ajuster pour que ça fonctionne. Tu es sensible à la beauté des paysages, des arbres, des fleurs, et tu as sans doute un intérêt pour la protection de la nature. En résumé, tu es manuel, persévérant, observateur, tu aimes être dehors, tu aimes la nature et, pour toi, protéger l'environnement c'est super important.",
      metiers: ["Horticulteur", "Garde forestier", "Jardinier"],
    },
    Echanger: {
      description:
        "Tu sembles avoir la main verte ! Tu es sociable, chaleureux et tu as sans doute envie de partager ta passion pour les plantes et la nature avec les autres. Tu es quelqu'un qui aime conseiller, expliquer, guider. Tu as de l'empathie et tu fais attention à ce que veulent les gens : tu aimes les aider à choisir des plantes, à composer un bouquet, à créer une ambiance qui leur ressemble. Tu es aussi attentif aux émotions : tu sais qu'un bouquet peut faire plaisir, réconforter, célébrer un moment important. Tu es créatif : tu joues avec les formes, les couleurs, les tailles pour que le résultat soit beau et harmonieux. En résumé, tu es sociable, créatif, à l'écoute, tu aimes faire plaisir et, pour toi, rien de mieux que des fleurs pour faire plaisir.",
      metiers: ["Fleuriste"],
    },
    Organiser: {
      description:
        "Tu sembles avoir la main verte ! Tu es un pro de l'organisation et de la gestion. Tu es sans doute quelqu'un de rigoureux, responsable et observateur. Tu aimes planifier, coordonner, vérifier que tout se passe bien, que les cultures poussent comme prévu, que les équipes savent ce qu'elles ont à faire. Tu es à l'aise avec les chiffres, les plannings, les objectifs à atteindre. Tu es aussi curieux et tu as un petit côté scientifique : tu t'intéresses aux méthodes de culture, aux techniques d'amélioration des plantes, à la qualité des sols, à la météo… En résumé, tu es rigoureux, curieux, organisé, tu aimes la nature et tu es prêt à t'investir pour que tout pousse dans les meilleures conditions.",
      metiers: ["Ingénieur agronome", "Chef de culture, responsable d'unité agricole"],
    },
  },
  PATRI: {
    Concevoir: {
      description:
        "Tu aimes apporter ta pierre à l'édifice : ton truc, c'est l'architecture, la construction ou l'aménagement d'espaces. Tu es sans doute quelqu'un de créatif, curieux et observateur. Tu aimes imaginer des bâtiments, des lieux de vie, des espaces publics où les gens se sentent bien. Tu es sensible à l'esthétique, aux matériaux, à la lumière, aux volumes. Tu es aussi quelqu'un de rigoureux : pour toi, les idées doivent pouvoir s'appliquer concrètement. Tu aimes comprendre comment les choses tiennent debout, comment elles sont construites, comment elles peuvent durer dans le temps. En résumé, tu es créatif, observateur, rigoureux, tu t'intéresses à l'architecture, à la construction et tu as envie de concevoir des lieux utiles et agréables.",
      metiers: ["Architecte", "Architecte d'intérieur", "Ingénieur d'études BTP"],
    },
    Fabriquer: {
      description:
        "Tu aimes apporter ta pierre à l'édifice ! Tu es sans doute quelqu'un de manuel, courageux et rigoureux. Tu n'as pas peur des chantiers, des travaux physiques, de travailler dehors ou en hauteur. Tu aimes voir le résultat concret de ton travail : un mur qui se monte, une charpente qui se pose, un bâtiment qui prend forme petit à petit. Tu es aussi quelqu'un de patient et de précis : tu sais que dans la construction, il faut respecter les plans, les mesures, les consignes de sécurité. Tu es observateur : tu fais attention aux détails, aux finitions, aux matériaux. Tu es aussi curieux et tu as peut-être un petit faible pour les bâtiments chargés d'histoire.",
      metiers: ["Menuisier", "Maçon", "Peintre en batiment", "Echafaudeur"],
    },
    Echanger: {
      description:
        "Tu aimes apporter ta pierre à l'édifice ! Tu es sans doute quelqu'un de sociable, curieux et passionné par l'histoire des lieux, des bâtiments, des villes. Tu aimes observer les détails d'une façade, d'un monument, d'une rue, et tu as envie de raconter ce que tu sais aux autres. Tu es à l'aise à l'oral, tu aimes expliquer, guider, répondre aux questions. Tu es aussi patient et à l'écoute : tu fais attention à ce que les gens comprennent, apprécient, se sentent à l'aise. En résumé, tu es sociable, curieux, observateur, tu t'intéresses aux bâtiments chargés d'histoire et tu aimes partager ta passion.",
      metiers: ["Guide touristique"],
    },
    Organiser: {
      description:
        "Tu aimes apporter ta pierre à l'édifice ! Ton truc, c'est d'être dans le feu de l'action et de donner le tempo. Être dehors n'est pas un problème pour toi. Tu aimes la construction et les bâtiments chargés d'histoire. Tu es sans doute quelqu'un de rigoureux, responsable et réactif. Tu sais coordonner une équipe, organiser un chantier, vérifier que tout se passe bien et dans les délais. Tu es à l'aise pour donner des consignes, expliquer ce qu'il faut faire, gérer les imprévus. Tu es aussi observateur : tu fais attention à la sécurité, à la qualité du travail, aux détails qui comptent.",
      metiers: ["Chef de chantier", "Conducteur de travaux"],
    },
  },
  TOUR: {
    Concevoir: {
      description:
        "En avant, toute ! Tu aimes voyager et découvrir de nouveaux endroits, rencontrer des personnes différentes, entendre des langues et des histoires variées. Tu es sans doute quelqu'un de curieux, créatif et organisé. Tu aimes imaginer des voyages, des itinéraires, des activités qui donnent envie de partir à l'aventure. Tu fais attention aux détails : les lieux à visiter, les bonnes adresses, les temps de trajet, les budgets… Tu es aussi quelqu'un de sociable : tu aimes écouter les envies des autres, leur proposer des idées, les conseiller. En résumé, tu es curieux, créatif, organisé, tu adores le tourisme et tu as envie de donner envie aux autres de découvrir le monde et de convaincre les autres de t'accompagner.",
      metiers: ["Agent de voyage", "Chef de produit touristique", "Chargé-e de mission tourisme"],
    },
    Fabriquer: {
      description:
        "En avant, toute ! Tu es dynamique, débrouillard, curieux et tu aimes quand ça bouge. Tu es sans doute quelqu'un qui aime organiser des événements, des sorties, des activités où les gens se retrouvent, s'amusent, partagent de bons moments. Tu es à l'aise pour coordonner, prévoir, gérer les imprévus. Tu es aussi sociable : tu aimes le contact avec les autres, travailler en équipe, collaborer avec différents partenaires (artistes, techniciens, prestataires…). Tu es observateur et tu fais attention à l'ambiance, à ce que les gens ressentent. En résumé, tu es dynamique, sociable, organisé, tu aimes le tourisme, les événements et tu aimes donner vie à des moments uniques et être sur le terrain.",
      metiers: ["Chef-fe de projets événementiels", "Chargé / Chargée de mission tourisme"],
    },
    Echanger: {
      description:
        "En avant, toute ! Tu es chaleureux, dynamique et curieux. Tu aimes rencontrer des gens, discuter avec eux, les conseiller, les aider. Tu es sans doute quelqu'un de patient, à l'écoute, qui sait mettre les autres à l'aise. Tu as le sens du service : tu fais attention au confort, aux besoins, aux demandes des personnes que tu accueilles. Tu es aussi réactif et organisé : tu sais gérer plusieurs demandes à la fois, garder ton calme même quand il y a du monde. En résumé, tu es sociable, chaleureux, serviable, tu aimes le tourisme, anticiper les besoins des autres et tu as le sens du commerce.",
      metiers: ["Agent d'accueil", "Receptionniste", "Commercial grands comptes et entreprises", "Maître d'hôtel"],
    },
    Organiser: {
      description:
        "En avant, toute ! Tu aimes le tourisme et tu adores organiser des séjours, des activités, des événements pour que tout se passe au mieux. Tu es sans doute quelqu'un de rigoureux, responsable et réactif. Tu sais coordonner une équipe, gérer un planning, vérifier que tout est prêt au bon moment. Tu es à l'aise pour donner des consignes, expliquer ce qu'il faut faire, gérer les imprévus. Tu es aussi sociable : tu aimes le contact avec les clients, les prestataires, les membres de ton équipe. En résumé, tu es organisé, responsable, sociable, tu aimes le tourisme, coordonner les autres et mener les troupes. Ton truc, c'est d'être dans le feu de l'action !",
      metiers: ["Directeur en hôtellerie restauration", "Directeur de structure touristique"],
    },
  },
}
