import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <header className={styles.hero}>
      <ScrollReveal>
        <p className={styles.status}>SYSTEM ACTIVE &mdash; BUILDING</p>
      </ScrollReveal>
      <ScrollReveal delay={0.07}>
        <h1 className={styles.title}>Ignacio Becerra Mas Roca</h1>
      </ScrollReveal>
      <ScrollReveal delay={0.07}>
        <p className={styles.cbcd} aria-hidden="true">CB/CD</p>
        <p className={styles.cbcdSub}>CONTINUOUS BUILD &middot; CONTINUOUS DEPLOYMENT</p>
      </ScrollReveal>
      <ScrollReveal delay={0.14}>
        <p className={styles.desc}>
          AI Agent builder from Buenos Aires, 25. I ship fast, learn in public, and keep the factory running. 20 projects &mdash; from protein discovery engines to multi-agent architectures &mdash; all on the belt.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.21}>
        <div className={styles.currently}>
          <span className={styles.tag}><strong>Exolgan</strong> &middot; Microservices &amp; IoT</span>
          <span className={styles.tag}><strong>Centenario</strong> &middot; AI Agents for FIE</span>
          <span className={styles.tag}><strong>Crecimiento</strong> &middot; AI Fellow (top 5)</span>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.28}>
        <div className={styles.actions}>
          <a href="#deployed" className={`${styles.btn} ${styles.btnPrimary}`}>Enter factory &darr;</a>
          <a href="mailto:ignaciobcerra@gmail.com" className={`${styles.btn} ${styles.btnGhost}`}>Contact</a>
          <a href="https://github.com/BecerraIgnacio" target="_blank" rel="noopener" className={`${styles.btn} ${styles.btnGhost}`}>GitHub &rarr;</a>
        </div>
      </ScrollReveal>
      <div className={styles.scrollCue} aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
      </div>
    </header>
  );
}
