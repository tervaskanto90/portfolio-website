"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { getContent, type Content, type Lang } from "@/lib/content";

type SweepFlag = "argentina" | "usa";

interface I18nCtx {
  lang: Lang;
  content: Content;
  toggle: () => void;
}

const Ctx = createContext<I18nCtx | null>(null);

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [active, setActive] = useState(false);
  const [sweepFlag, setSweepFlag] = useState<SweepFlag>("argentina");
  const [sweepLabel, setSweepLabel] = useState("Español");

  const panelRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const animating = useRef(false);

  const content = useMemo(() => getContent(lang), [lang]);

  const applyLang = (next: Lang) => {
    setLang(next);
    if (typeof document !== "undefined") document.documentElement.lang = next;
    try {
      localStorage.setItem("lang", next);
    } catch {
      /* ignore */
    }
  };

  // Restore a previously chosen language (no sweep on first load).
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("lang");
    } catch {
      /* ignore */
    }
    if (stored === "es" || stored === "en") applyLang(stored);
  }, []);

  const toggle = () => {
    if (animating.current) return;
    const target: Lang = lang === "en" ? "es" : "en";
    const flag: SweepFlag = target === "es" ? "argentina" : "usa";
    const label = target === "es" ? "Español" : "English";

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !panelRef.current) {
      applyLang(target);
      return;
    }

    animating.current = true;
    setSweepFlag(flag);
    setSweepLabel(label);
    setActive(true);

    // To Spanish: Argentina sweeps right → left. To English: USA sweeps left → right.
    const enterFrom = target === "es" ? 100 : -100;
    const exitTo = target === "es" ? -100 : 100;
    const panel = panelRef.current;
    const word = wordRef.current;

    gsap.set(panel, { xPercent: enterFrom });
    if (word) gsap.set(word, { opacity: 0, scale: 0.92 });

    const tl = gsap.timeline({
      onComplete: () => {
        setActive(false);
        animating.current = false;
      },
    });

    tl.to(panel, { xPercent: 0, duration: 0.55, ease: "power3.inOut" });
    if (word) {
      tl.to(word, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.28");
    }
    tl.add(() => applyLang(target)); // swap all text while the flag covers the screen
    tl.to({}, { duration: 0.14 }); // brief hold on the full flag
    if (word) {
      tl.to(word, { opacity: 0, duration: 0.25, ease: "power2.in" }, ">-0.05");
    }
    tl.to(panel, { xPercent: exitTo, duration: 0.55, ease: "power3.inOut" }, "<");
  };

  return (
    <Ctx.Provider value={{ lang, content, toggle }}>
      {children}
      <div className={`lang-overlay${active ? " active" : ""}`} aria-hidden="true">
        <div className="flag-panel" ref={panelRef}>
          {sweepFlag === "argentina" ? <ArgentinaFlag /> : <USAFlag />}
          <span className="flag-word" ref={wordRef}>
            {sweepLabel}
          </span>
        </div>
      </div>
    </Ctx.Provider>
  );
}

/* ---------------- toggle (small España / UK chips) ---------------- */

export function LangToggle() {
  const { lang, toggle, content } = useI18n();
  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggle}
      aria-label={content.ui.switchTo}
      title={content.ui.switchTo}
    >
      <span className={`flag-chip${lang === "es" ? " on" : ""}`}>
        <SpainMini />
      </span>
      <span className="flag-chip-sep" />
      <span className={`flag-chip${lang === "en" ? " on" : ""}`}>
        <UKMini />
      </span>
    </button>
  );
}

/* ---------------- full-screen flags ---------------- */

function ArgentinaFlag() {
  const rays = Array.from({ length: 32 }, (_, i) => {
    const a = (i / 32) * Math.PI * 2;
    const inner = 25;
    const outer = 40;
    const w = 0.05;
    const x1 = 150 + Math.cos(a - w) * inner;
    const y1 = 100 + Math.sin(a - w) * inner;
    const x2 = 150 + Math.cos(a + w) * inner;
    const y2 = 100 + Math.sin(a + w) * inner;
    const xt = 150 + Math.cos(a) * outer;
    const yt = 100 + Math.sin(a) * outer;
    return <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${xt},${yt}`} />;
  });
  return (
    <svg className="flag-svg" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
      <rect width="300" height="200" fill="#fff" />
      <rect width="300" height="66.7" fill="#74acdf" />
      <rect width="300" height="66.7" y="133.3" fill="#74acdf" />
      <g fill="#f6b40e" stroke="#85340a" strokeWidth="0.4">
        {rays}
        <circle cx="150" cy="100" r="25" fill="#f6b40e" stroke="#85340a" strokeWidth="0.6" />
        <circle cx="150" cy="100" r="18" fill="none" stroke="#85340a" strokeWidth="0.5" opacity="0.5" />
      </g>
    </svg>
  );
}

function USAFlag() {
  const stripes = Array.from({ length: 13 }, (_, i) => (
    <rect
      key={i}
      x="0"
      y={(200 / 13) * i}
      width="380"
      height={200 / 13}
      fill={i % 2 === 0 ? "#b22234" : "#fff"}
    />
  ));
  const cantonW = 152;
  const cantonH = (200 / 13) * 7;
  const stars: React.ReactNode[] = [];
  for (let row = 0; row < 9; row++) {
    const isLong = row % 2 === 0; // rows of 6, then 5
    const count = isLong ? 6 : 5;
    const offsetX = isLong ? cantonW / 12 : cantonW / 6;
    const stepX = cantonW / 6;
    const y = (cantonH / 10) * (row + 1);
    for (let c = 0; c < count; c++) {
      const x = offsetX + c * stepX;
      stars.push(<use key={`${row}-${c}`} href="#star" x={x} y={y} />);
    }
  }
  return (
    <svg className="flag-svg" viewBox="0 0 380 200" preserveAspectRatio="xMidYMid slice">
      <defs>
        <g id="star">
          <Star />
        </g>
      </defs>
      {stripes}
      <rect width={cantonW} height={cantonH} fill="#3c3b6e" />
      <g fill="#fff">{stars}</g>
    </svg>
  );
}

/* A small 5-point star centred at the origin, scaled for the canton grid. */
function Star() {
  const pts: string[] = [];
  const R = 5.2;
  const r = R * 0.382;
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? R : r;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${Math.cos(a) * rad},${Math.sin(a) * rad}`);
  }
  return <polygon points={pts.join(" ")} />;
}

/* ---------------- mini flags for the toggle ---------------- */

function SpainMini() {
  return (
    <svg viewBox="0 0 60 40" className="mini-flag" aria-hidden="true">
      <rect width="60" height="40" fill="#c60b1e" />
      <rect width="60" height="20" y="10" fill="#ffc400" />
    </svg>
  );
}

function UKMini() {
  return (
    <svg viewBox="0 0 60 40" className="mini-flag" aria-hidden="true">
      <clipPath id="uk-c">
        <rect width="60" height="40" />
      </clipPath>
      <g clipPath="url(#uk-c)">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0,0 60,40 M60,0 0,40" stroke="#fff" strokeWidth="8" />
        <path d="M0,0 60,40 M60,0 0,40" stroke="#c8102e" strokeWidth="4" />
        <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="13" />
        <path d="M30,0 V40 M0,20 H60" stroke="#c8102e" strokeWidth="7" />
      </g>
    </svg>
  );
}
