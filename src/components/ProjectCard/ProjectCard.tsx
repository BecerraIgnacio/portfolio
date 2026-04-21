"use client";

import type { Project } from "@/types/project";
import styles from "./ProjectCard.module.css";

const stampLabels: Record<string, string> = {
  live: "LIVE",
  build: "WIP",
  shipped: "SHIPPED",
  paused: "PAUSED",
};

export default function ProjectCard({ project }: { project: Project }) {
  const isWip = project.status === "build";

  const handleClick = (e: React.MouseEvent) => {
    if (!project.href) return;
    if ((e.target as HTMLElement).closest(`.${styles.links}`)) return;
    window.open(project.href, "_blank");
  };

  return (
    <article
      className={`${styles.card} ${isWip ? styles.wip : ""}`}
      onClick={project.href ? handleClick : undefined}
      style={{ cursor: project.href ? "pointer" : "default" }}
    >
      <div className={`${styles.tape} ${styles[`tape-${project.tape}`]}`} />
      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.name}>{project.name}</h3>
          <span className={`${styles.stamp} ${styles[`stamp-${project.status}`]}`}>
            {stampLabels[project.status]}
          </span>
        </div>
        <div className={styles.descWrap}>
          <p className={styles.desc}>{project.description}</p>
          {isWip && <div className={styles.descBlur} />}
        </div>
        <span className={styles.stack}>{project.stack}</span>
        <div className={styles.links}>
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener">
              {link.label}{" "}
              {link.label === "Visit" || link.label === "Source" ? (
                <span className={styles.arrow}>&rarr;</span>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
