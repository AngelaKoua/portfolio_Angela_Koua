import { existsSync } from "node:fs";
import path from "node:path";
import type { Project } from "@/content/portfolio";

/**
 * À utiliser uniquement côté serveur.
 * Si l’image indiquée n’existe pas encore dans /public, on la retire :
 * la carte affiche alors l’illustration florale au lieu d’une image cassée.
 */
export function withExistingImage(project: Project): Project {
  if (!project.image || project.image.startsWith("http")) return project;
  const file = path.join(process.cwd(), "public", decodeURI(project.image));
  if (existsSync(file)) return project;
  const { image: _image, imageAlt: _imageAlt, imageCredit: _imageCredit, ...rest } = project;
  return rest;
}
