import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Self-hosted and preloaded by next/font: no round trip to Google on first visit.
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display-face",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body-face",
});

const primary = (family: string) => family.split(",")[0].trim();

// Runs inline before first paint. Keeps the first viewport dark until the web
// fonts are ready, then lets the CSS intro play — so text never paints in a
// fallback face. Capped at 2.5s so a slow font download can't hold the page.
const introScript = `(function(){var d=document.documentElement,done=false;d.classList.add("intro");function go(){if(!done){done=true;d.classList.add("ready")}}setTimeout(go,2500);try{var f=document.fonts,a=${JSON.stringify(
  primary(display.style.fontFamily)
)},b=${JSON.stringify(
  primary(body.style.fontFamily)
)};Promise.all([f.load("1em "+a),f.load("italic 1em "+a),f.load("1em "+b)]).then(function(r){return r[0].length?0:f.ready}).then(go,go)}catch(e){go()}})();`;

export const metadata: Metadata = {
  title: "Octavio Boggiano — AI Solutions Architect",
  description:
    "AI Solutions Architect specializing in Voice AI, app building, AI cybersecurity, automation and flow efficiency. Solutions Architect at AudioCodes.",
  openGraph: {
    title: "Octavio Boggiano — AI Solutions Architect",
    description:
      "Designing intelligent systems where voice, security and automation converge.",
    url: "https://oboggiano.vercel.app",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
