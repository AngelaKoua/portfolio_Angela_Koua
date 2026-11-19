import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BotanicalDefs from "@/components/BotanicalDefs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProjectBouquet from "@/components/ProjectBouquet";
import { profile, projects } from "@/content/portfolio";
import { withExistingImage } from "@/lib/projectImages";
import { detailParagraphs, findProject, projectSlug } from "@/lib/projects";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

/** Une page est générée pour chaque projet ; toute autre adresse renvoie une 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: projectSlug(project) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = findProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} · ${profile.firstName}`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const found = findProject((await params).slug);
  if (!found) notFound();
  const project = withExistingImage(found);

  const paragraphs = detailParagraphs(project);
  const hasLink = Boolean(project.href) && project.href !== "#";
  const isExternal = project.href?.startsWith("http") ?? false;
  const tags = project.tags.filter((tag) => tag.trim() !== "");

  return (
    <>
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <BotanicalDefs />
      <Header home="/" />
      <main id="contenu" className={styles.page}>
        <div className={styles.inner}>
          <Link href="/#jardin" className={styles.back}>
            <span aria-hidden="true">←</span> Retour aux projets
          </Link>

          <div className={styles.stage}>
            <ProjectBouquet className={`${styles.bouquet} ${styles.bouquetTop}`} />
            <ProjectBouquet className={`${styles.bouquet} ${styles.bouquetBottom}`} />

            <article className={`${styles.card} appear`}>
              <span className={`${styles.tape} ${styles.tapeLeft}`} aria-hidden="true" />
              <span className={`${styles.tape} ${styles.tapeRight}`} aria-hidden="true" />

              {project.image && (
                <div className={styles.media}>
                  {/* Largeur et hauteur à 0 + style : le cadre prend la forme réelle de l’image */}
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? ""}
                    width={0}
                    height={0}
                    sizes="(max-width: 760px) 100vw, 680px"
                    className={styles.image}
                    priority
                  />
                </div>
              )}
              {project.image && project.imageCredit && (
                <p className={styles.credit}>
                  <a href={project.imageCredit.href} target="_blank" rel="noopener noreferrer">
                    {project.imageCredit.text}
                    <span className="sr-only"> (nouvel onglet)</span>
                  </a>
                </p>
              )}

              <p className={styles.harvest}>Réalisé en {project.year}</p>
              <h1 className={styles.title}>{project.title}</h1>
              <p className={styles.lead}>{project.description}</p>

              {tags.length > 0 && (
                <ul className={styles.tags} aria-label="Catégories">
                  {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              )}

              {paragraphs.length > 0 && (
                <div className={styles.details}>
                  {paragraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              )}

              {hasLink && (
                <div className={styles.actions}>
                  <a
                    href={project.href}
                    className="btn btn-primary"
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    Voir le projet
                    {isExternal && <span className="sr-only"> (nouvel onglet)</span>}
                  </a>
                </div>
              )}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
