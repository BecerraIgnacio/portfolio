import type { Project, ProductionLineConfig } from "@/types/project";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import ConveyorBelt from "@/components/ConveyorBelt/ConveyorBelt";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import styles from "./ProductionLine.module.css";

const ROLLER_COUNT = 15;

export default function ProductionLine({
  config,
  projects,
}: {
  config: ProductionLineConfig;
  projects: Project[];
}) {
  return (
    <section className={styles.line} id={config.anchor}>
      <ScrollReveal>
        <div className={styles.header}>
          <h2 className={styles.label}>{config.label}</h2>
          <span className={styles.rule} />
          <span className={styles.count}>{projects.length} packages</span>
        </div>
      </ScrollReveal>
      <div className={styles.beltContainer}>
        <ConveyorBelt speed={config.speed}>
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </ConveyorBelt>
      </div>
      <div
        className={styles.surface}
        style={{ animationDuration: `${config.beltDuration}s` }}
        aria-hidden="true"
      />
      <div className={styles.rollers} aria-hidden="true">
        {Array.from({ length: ROLLER_COUNT }, (_, i) => (
          <div
            key={i}
            className={styles.roller}
            style={{ animationDuration: `${config.rollerDuration}s` }}
          />
        ))}
      </div>
    </section>
  );
}
