"use client";

import { useEffect, useRef } from "react";
import styles from "./Nav.module.css";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (navRef.current) {
          navRef.current.style.borderBottomColor =
            window.scrollY > 20 ? "var(--border)" : "transparent";
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav ref={navRef} className={styles.nav} aria-label="Main navigation">
      <div className={styles.inner}>
        <a href="#" className={styles.logo} aria-label="Home">
          CB/CD_
        </a>
        <ul className={styles.links}>
          <li><a href="#deployed">Factory</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="https://github.com/BecerraIgnacio" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="https://linkedin.com/in/ignacio-becerra-528761252" target="_blank" rel="noopener">LinkedIn</a></li>
        </ul>
      </div>
    </nav>
  );
}
