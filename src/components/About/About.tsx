import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.about} id="about">
      <ScrollReveal>
        <div className={styles.header}>
          <p className={styles.label}>Operator</p>
          <h2 className={styles.title}>About</h2>
        </div>
      </ScrollReveal>

      <div className={styles.grid}>
        <ScrollReveal>
          <div className={styles.text}>
            <p>I build <strong>AI agents</strong> and the systems around them. My work spans applied AI — from protein discovery engines and veterinary surveillance to Claude Code ecosystems and multi-agent architectures. Currently all-in on agents.</p>
            <p>By day I&apos;m a software developer at <strong>Exolgan</strong>, one of Argentina&apos;s largest shipping container terminals, building microservices and IoT systems where all IT is developed in-house. My final college project is designing <strong>AI agent infrastructure</strong> for FIE&apos;s Centenario project — modernizing the university for its 100th anniversary.</p>
            <p>Selected as one of 5 <strong>AI Fellows</strong> by Crecimiento, Argentina&apos;s largest tech community working to turn the country into a tech hub. The fellowship means cowork access, weekly programming sessions, exclusive dinners, and personalized support for 3 months.</p>
            <p>Before this: <strong>1st place</strong> at the 2019 Programming Olympiad (UNCo), Cambridge <strong>C1 Advanced</strong>, and a background in <strong>electronics, automation, and industrial control</strong>. I also teach Python, C, and C++ to university students.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.07}>
          <ul className={styles.infoList}>
            <li><span className={styles.infoLabel}>Location</span><span className={styles.infoValue}>Buenos Aires, AR</span></li>
            <li><span className={styles.infoLabel}>Work</span><span className={styles.infoValue}>Software Dev @ Exolgan</span></li>
            <li><span className={styles.infoLabel}>Education</span><span className={styles.infoValue}>Computer Eng, FIE (5th yr)</span></li>
            <li><span className={styles.infoLabel}>Final project</span><span className={styles.infoValue}>AI Agents — Centenario</span></li>
            <li><span className={styles.infoLabel}>Fellowship</span><span className={styles.infoValue}>Crecimiento AI Fellow</span></li>
            <li><span className={styles.infoLabel}>Focus</span><span className={styles.infoValue}>AI Agents · Automation</span></li>
            <li><span className={styles.infoLabel}>Languages</span><span className={styles.infoValue}>ES (native) · EN (C1)</span></li>
            <li><span className={styles.infoLabel}>GitHub</span><span className={styles.infoValue}><a href="https://github.com/BecerraIgnacio" target="_blank" rel="noopener">BecerraIgnacio</a></span></li>
            <li><span className={styles.infoLabel}>LinkedIn</span><span className={styles.infoValue}><a href="https://linkedin.com/in/ignacio-becerra-528761252" target="_blank" rel="noopener">ignacio-becerra</a></span></li>
            <li><span className={styles.infoLabel}>Email</span><span className={styles.infoValue}><a href="mailto:ignaciobcerra@gmail.com">ignaciobcerra@gmail.com</a></span></li>
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
