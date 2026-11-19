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
    details: `Dans un atelier de maintenance aéronautique agréé Part-145, retrouver la bonne exigence réglementaire prend du temps. Le texte de l’EASA est long, rédigé en anglais, réparti sur trois niveaux (règle, AMC et GM) et régulièrement amendé. Les techniciens et les responsables qualité doivent en plus relier chaque exigence à leurs propres procédures internes.

Je développe un assistant de questions-réponses fondé sur le RAG (Retrieval-Augmented Generation). Il répond en français ou en anglais et cite le paragraphe exact, son niveau (règle, AMC ou GM) et la version du texte utilisée. Quand l’information ne figure pas dans les documents, il le dit au lieu d’inventer une réponse. Le corpus réunit le Part-145, tiré des Easy Access Rules de l’EASA, ainsi que le manuel et les procédures d’un atelier fictif rédigés pour le projet.

Avant d’aborder le domaine aéronautique, j’ai construit deux prototypes pour maîtriser chaque étape du pipeline : découpage des documents, embeddings multilingues avec Sentence Transformers, index vectoriel FAISS, recherche, construction du prompt, génération avec un modèle open source exécuté en local via Ollama, puis interface Streamlit. J’y ai aussi mesuré la qualité de la recherche sur un jeu de questions formulées avec d’autres mots que les documents, et comparé les réponses d’un LLM seul à celles du LLM avec RAG.

Le projet est en cours. Les objectifs sont fixés dès le départ : le bon paragraphe dans les cinq premiers résultats pour au moins 90 % des questions de test, une référence correcte dans au moins 90 % des réponses, et un refus pour au moins 90 % des questions hors corpus. La version finale sera déployée sous forme d’API sur AWS.`,
    year: "2026",
    tags: ["NLP", ""],
    image: "/projects/rag-aeronautique.png",
    imageAlt: "Aperçu du RAG dédié à l’aéronautique",
    href: "#",
  },
  {
    title: "CRM for a small business",
    description: "Un système de gestion de la relation client adapté aux besoins d'une petite entreprise",
    details: `Beaucoup de petites entreprises suivent encore leurs clients dans des tableurs, des carnets ou des messages dispersés. Les informations se perdent, les relances sont oubliées et il devient difficile d’avoir une vue d’ensemble de l’activité commerciale.

J’ai conçu un CRM (gestion de la relation client) pensé pour ces structures : un outil simple qui centralise les informations sur les clients et le suivi des échanges, sans la complexité des solutions conçues pour les grands groupes.

L’API est développée avec NestJS, un framework Node.js organisé en modules, et les données sont stockées dans Supabase, qui repose sur PostgreSQL. Ce projet m’a appris à partir des besoins concrets d’une petite structure pour définir les fonctionnalités vraiment utiles, et à organiser une API back-end de façon claire et maintenable.`,
    year: "2026",
    tags: ["Nest.js", "Supabase"],
    image: "/projects/crm.png",
    imageAlt: "Aperçu du CRM pour petite entreprise",
    href: "#",
  },
  {
    title: "CEO Dashboard",
    description: "Un tableau de bord pour les dirigeants afin de suivre les performances de l'entreprise",
    details: `Ce projet est la refonte complète d’un tableau de bord que j’avais réalisé pendant un stage. La version d’origine était liée à un seul prestataire logistique, avec des règles codées en dur (pays, devise, coût de livraison). J’ai voulu en faire un outil que n’importe quelle entreprise commerciale peut utiliser : un site e-commerce, une enseigne de magasins ou un distributeur B2B.

Le dirigeant y retrouve tous ses indicateurs : ventes et taux de conversion, rentabilité par marché, canal et produit, marketing (coût par lead, ROAS), logistique, stock, trésorerie et alertes configurables. Les données arrivent par import CSV, avec détection automatique des colonnes, ou par webhooks sécurisés. Chaque entreprise configure ses propres marchés, devises, canaux et objectifs.

L’application repose sur Next.js 16 et Supabase (PostgreSQL). L’isolation entre entreprises et les droits de chaque rôle sont gérés directement dans la base, grâce à la sécurité au niveau des lignes (RLS) : un oubli dans le code ne peut pas exposer les données d’une autre entreprise. Les agrégations sont faites en SQL, et le calcul des indicateurs dans des fonctions TypeScript couvertes par des tests.

Un copilote IA répond aux questions posées en langage naturel. Le modèle de langage ne calcule rien : il reçoit un résumé déjà calculé par le moteur d’indicateurs, avec la consigne de ne jamais inventer ni recalculer un chiffre. Les données financières sont retirées avant l’appel quand l’utilisateur n’a pas le droit de les voir. Ce projet m’a appris à concevoir un modèle de données générique et à intégrer un LLM de façon fiable.`,
    year: "2026",
    tags: ["Next.js", "Tailwind CSS", "supabase", "Kimi API"],
    image: "/projet_ceo_dashboard.png",
    imageAlt: "Aperçu du tableau de bord CEO",
    href: "https://dashboard-ceo-entreprise-commercial.vercel.app/",
  },
  {
    title: "Application de gestion de données",
    description: "Une application web pour gérer les membres, les activités et les évènements du Patro St Charles Lwanga, un mouvement de jeunesse.",
    details: `Le Patro St Charles Lwanga est un mouvement de jeunesse qui organise des activités pour les enfants pendant l’année scolaire et pendant les vacances. Ses responsables avaient besoin d’un outil unique pour suivre les membres et les activités, et pour analyser leur évolution.

J’ai développé une application web qui centralise cette gestion : un espace pour le Patro scolaire, un autre pour le Patro vacances, la gestion des évènements, des statistiques sur les activités et la participation, la gestion des comptes utilisateurs et un guide d’utilisation intégré.

L’application est construite avec Next.js, et les données sont stockées dans Supabase (PostgreSQL). Ce projet m’a appris à concevoir un outil pour des utilisateurs qui ne sont pas des spécialistes de l’informatique : l’interface devait rester simple, et le guide intégré permet à chacun de prendre l’outil en main seul.`,
    year: "2025",
    tags: ["Next.js", "Supabase", ],
    image: "/patro.png",
    imageAlt: "Aperçu de l’application de gestion de données",
    href: "",
  },
  {
    title: "IdeazBot",
    description: "Un chatbot intelligent pour générer des idées créativeset organiser des sessions de brainstorming.",
    details: `Lancer un projet ou résoudre un problème commence souvent devant une page blanche. IdeazBot est un assistant d’idéation qui accompagne l’utilisateur dans une véritable séance de créativité structurée, au lieu de lui donner une simple liste d’idées.

L’utilisateur décrit son projet ou son besoin, et le chatbot adapte sa réponse. Si la demande est floue, il pose des questions ciblées. Sinon, il produit un rapport complet : reformulation du défi, analyse du contexte (besoins, tendances, opportunités), cinq idées, un top 3 classé et un concept principal. Il s’appuie pour cela sur des méthodes d’idéation reconnues comme SCAMPER, les six chapeaux de De Bono ou Crazy 8. On peut ensuite approfondir une idée ou demander un plan d’action, et transformer n’importe quelle réponse en carte mentale interactive, exportable en image.

C’est une application full-stack : un frontend Next.js, une API REST en Flask avec authentification JWT, une base PostgreSQL hébergée sur Neon, et un modèle de langage (gpt-oss-120b) appelé via l’API Groq. Chaque conversation est enregistrée : l’utilisateur peut la retrouver, la rechercher et la reprendre plus tard.

Ce projet m’a appris à écrire un prompt système capable de produire plusieurs types de réponses, à gérer la fenêtre de contexte d’une longue conversation, et à déployer une application en trois parties sur Vercel, Render et Neon.`,
    year: "2025",
    tags: ["NLP", "LLM", "Next.js", "Flask", "Grok API", "Neon DB"],
    image: "/ideaz_bot.png",
    imageAlt: "Aperçu de l’interface du chatbot IdeazBot",
    href: "https://chatbot-ideation.vercel.app/",
  },
  {
    title: "ColaTrack",
    description: "Une plateforme de niveau industriel développée pour Coca-Cola afin de numériser les processus de maintenance. ",
    details: `Sur une ligne d’embouteillage, une panne imprévue arrête toute la production. ColaTrack est une plateforme de supervision industrielle et de maintenance prédictive conçue pour une ligne Coca-Cola. Elle suit deux machines clés : l’osmoseur, qui traite l’eau par osmose inverse, et la remplisseuse, qui remplit les bouteilles.

Les techniciens y saisissent et suivent les mesures des machines (débits, pH, conductivité, température, carbonatation, vibrations…), gèrent les incidents et reçoivent des notifications en temps réel. Un assistant IA, ColaAssist, basé sur Gemini, répond à leurs questions, et des tableaux de bord présentent les indicateurs de performance.

Côté data science, j’ai généré un jeu de données synthétique de mesures et d’incidents, réalisé l’analyse exploratoire, puis entraîné plusieurs modèles : Isolation Forest pour détecter les anomalies, XGBoost pour estimer la probabilité de panne dans les 24 heures, Gradient Boosting pour calculer un indice de santé de chaque machine, et Random Forest et régression logistique pour évaluer le risque qualité. L’API charge ces modèles au démarrage pour produire ses prédictions.

L’API est développée avec FastAPI et PostgreSQL. Un ETL alimente un entrepôt de données en schéma en étoile, utilisé pour les analyses : indicateurs globaux, séries temporelles, comparaison entre techniciens et corrélations. Ce projet m’a permis de construire toute la chaîne, de la donnée brute jusqu’à une application complète.`,
    year: "2026",
    tags: ["Next.js", "FastAPI", "Neon DB", "PosgreSQL"],
    image: "/projects/colatrack.png",
    imageAlt: "Aperçu de la plateforme ColaTrack",
    href: "https://cola-track.vercel.app/",
  },
  
];
