import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Factory running since 2019 · 20 packages shipped · CB/CD</p>
      <div className={styles.links}>
        <a href="https://github.com/BecerraIgnacio" target="_blank" rel="noopener">GitHub</a>
        <a href="https://linkedin.com/in/ignacio-becerra-528761252" target="_blank" rel="noopener">LinkedIn</a>
        <a href="mailto:ignaciobcerra@gmail.com">Email</a>
      </div>
    </footer>
  );
}
