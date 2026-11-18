import { projects, type Project } from "@/content/portfolio";

/** Transforme un titre en adresse lisible : "CEO Dashboard" → "ceo-dashboard". */
function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Identifiant du projet dans l’adresse de sa page (champ `slug`, sinon calculé depuis le titre). */
export function projectSlug(project: Project): string {
  return project.slug?.trim() || slugify(project.title);
}

/** Adresse de la page dédiée d’un projet. */
export function projectPageHref(project: Project): string {
  return `/projets/${projectSlug(project)}`;
}

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => projectSlug(project) === slug);
}

/** Découpe la description détaillée en paragraphes (séparés par une ligne vide). */
export function detailParagraphs(project: Project): string[] {
  return (project.details ?? "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
