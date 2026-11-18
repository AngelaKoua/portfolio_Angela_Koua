export type Project = {
  title: string;
  description: string;

  details?: string;
  slug?: string;
  year: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  href?: string;
};

export type SocialLink = { label: string; href: string };

export const profile = {
  firstName: "Angela Koua",
  job: "Data science and Machine Learning student",
  heroNote: "bienvenue dans mon portfolio",
  headline: "Des projets pensés avec soin,",
  headlineAccent: "de l’idée à la réalisation.",
  intro:
    "Etudiante en science des données pour l'apprentissage automatique et l'intelligence artificielle à l'université de Rouen Normandie, je recherche un stage à partir d'Avril. Voici les projets qui illustrent le mieux mes compétences.",
  email: "angelakoua5@gmail.com",
  cvUrl: "/cv.pdf",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/angela-koua/" },
  ] as SocialLink[],
};

export const about = {
  
  photo: "/photo.jpeg",
  photoAlt: "Portrait d’Angela Koua",
  text: "Je suis étudiante en science des données et intelligence artificielle à l’Université de Rouen Normandie. Ce qui m’a attirée vers ce domaine, c’est la curiosité : comprendre ce qui se cache derrière les chiffres et découvrir les histoires qu’ils peuvent raconter. J’aime chercher, tester, me tromper parfois, puis voir une idée prendre forme jusqu’à devenir un résultat concret. Ce qui me motive avant tout, c’est de mettre ces outils au service de projets utiles, qui ont un vrai sens pour les personnes à qui ils s’adressent.",
};

export const contact = {
  title: "Et si on faisait pousser quelque chose ensemble ?",
  text: "Un projet, une idée ou une simple question : ma boîte aux lettres est grande ouverte.",
};


export const projects: Project[] = [
  {
    title: "Aeronautical field RAG ",
    description: "Une RAG permettant de répondre à des questions précises et pertinentes dans le domaine de l'aéronautique",
    details: "[Description détaillée : le problème, ta démarche, les outils utilisés et ce que tu as appris.]",
    year: "2026",
    tags: ["NLP", ""],
    image: "/projects/rag-aeronautique.png",
    imageAlt: "Aperçu du RAG dédié à l’aéronautique",
    href: "#",
  },
  {
    title: "CRM for a small business",
    description: "Un système de gestion de la relation client adapté aux besoins d'une petite entreprise",
    details: "[Description détaillée : le problème, ta démarche, les outils utilisés et ce que tu as appris.]",
    year: "2026",
    tags: ["Nest.js", "Supabase"],
    image: "/projects/crm.png",
    imageAlt: "Aperçu du CRM pour petite entreprise",
    href: "#",
  },
  {
    title: "CEO Dashboard",
    description: "Un tableau de bord pour les dirigeants afin de suivre les performances de l'entreprise",
    details: "[Description détaillée : le problème, ta démarche, les outils utilisés et ce que tu as appris.]",
    year: "2026",
    tags: ["Next.js", "Tailwind CSS", "supabase", "Kimi API"],
    image: "/projects/ceo-dashboard.png",
    imageAlt: "Aperçu du tableau de bord CEO",
    href: "#",
  },
  {
    title: "Application de gestion de données",
    description: "[Une ou deux phrases : le contexte, ton rôle et le résultat.]",
    details: "[Description détaillée : le problème, ta démarche, les outils utilisés et ce que tu as appris.]",
    year: "2025",
    tags: ["Next.js", "Supabase", ],
    image: "/patro.png",
    imageAlt: "Aperçu de l’application de gestion de données",
    href: "",
  },
  {
    title: "IdeazBot",
    description: "Un chatbot intelligent pour générer des idées créativeset organiser des sessions de brainstorming.",
    details: "[Description détaillée : le problème, ta démarche, les outils utilisés et ce que tu as appris.]",
    year: "2025",
    tags: ["NLP", "LLM", "Next.js", "Flask", "Grok API", "Neon DB"],
    image: "/projects/ideazbot.png",
    imageAlt: "Aperçu de l’interface du chatbot IdeazBot",
    href: "https://chatbot-ideation.vercel.app/",
  },
  {
    title: "ColaTrack",
    description: "Une plateforme de niveau industriel développée pour Coca-Cola afin de numériser les processus de maintenance. ",
    details: "[Description détaillée : le problème, ta démarche, les outils utilisés et ce que tu as appris.]",
    year: "2026",
    tags: ["Next.js", "FastAPI", "Neon DB", "PosgreSQL"],
    image: "/projects/colatrack.png",
    imageAlt: "Aperçu de la plateforme ColaTrack",
    href: "https://cola-track.vercel.app/",
  },
  
];
