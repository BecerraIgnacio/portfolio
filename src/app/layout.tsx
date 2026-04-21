import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Ignacio Becerra Mas Roca — AI Agent Builder | Portfolio",
  description:
    "Ignacio Becerra Mas Roca — AI Agent builder from Buenos Aires. 20 projects shipped: protein discovery engines, veterinary surveillance, multi-agent architectures, and Claude Code ecosystems.",
  authors: [{ name: "Ignacio Becerra Mas Roca" }],
  metadataBase: new URL("https://ignaciobecerra.dev"),
  openGraph: {
    title: "Ignacio Becerra Mas Roca — AI Agent Builder",
    description:
      "20 projects shipped from the factory floor. Protein discovery, veterinary surveillance, multi-agent architectures, and Claude Code ecosystems.",
    type: "website",
    url: "https://ignaciobecerra.dev",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ignacio Becerra Mas Roca — AI Agent Builder",
    description: "20 projects shipped from the factory floor.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ignacio Becerra Mas Roca",
  url: "https://ignaciobecerra.dev",
  jobTitle: "AI Agent Builder & Software Developer",
  worksFor: { "@type": "Organization", name: "Exolgan" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "FIE — Facultad de Ingeniería Electrónica",
  },
  knowsAbout: [
    "AI Agents",
    "Machine Learning",
    "Python",
    "TypeScript",
    "Next.js",
    "PyTorch",
  ],
  sameAs: [
    "https://github.com/BecerraIgnacio",
    "https://linkedin.com/in/ignacio-becerra-528761252",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
