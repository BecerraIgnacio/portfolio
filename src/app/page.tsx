import Nav from "@/components/Nav/Nav";
import Hero from "@/components/Hero/Hero";
import ProductionLine from "@/components/ProductionLine/ProductionLine";
import About from "@/components/About/About";
import Footer from "@/components/Footer/Footer";
import { projects, productionLines } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        {productionLines.map((line) => (
          <ProductionLine
            key={line.id}
            config={line}
            projects={projects.filter((p) => p.line === line.id)}
          />
        ))}
      </main>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />
      </div>
      <About />
      <Footer />
    </>
  );
}
