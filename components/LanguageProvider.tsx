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
    if (word) gsap.set(word, { opacity: 0, yPercent: 10 });

    const tl = gsap.timeline({
      onComplete: () => {
        setActive(false);
        animating.current = false;
      },
    });

    // Cover: the flag sweeps in and settles over the whole screen.
    tl.to(panel, { xPercent: 0, duration: 0.85, ease: "power2.inOut" });
    // Swap every string while fully hidden — the reflow happens behind the flag.
    tl.add(() => applyLang(target));
    if (word) {
      tl.to(word, { opacity: 1, yPercent: 0, duration: 0.5, ease: "power3.out" }, "-=0.42");
    }
    // Hold on the full flag so the language change lands cleanly.
    tl.to({}, { duration: 0.55 });
    if (word) {
      tl.to(word, { opacity: 0, yPercent: -8, duration: 0.35, ease: "power2.in" });
    }
    // Reveal: the flag exits the far side, uncovering the new language.
    tl.to(panel, { xPercent: exitTo, duration: 0.85, ease: "power2.inOut" }, "<");
  };

  return (
    <Ctx.Provider value={{ lang, content, toggle }}>
      {children}
      <div className={`lang-overlay${active ? " active" : ""}`} aria-hidden="true">
        <div className="flag-panel" ref={panelRef}>
          {sweepFlag === "argentina" ? <ArgentinaFlag /> : <USAFlag />}
          <span className="flag-cloth" />
          <span className="flag-sheen" />
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

// viewBox ~16:10 so the slice crop on a full screen keeps proportions natural.
const FW = 1200;
const FH = 750;

/* The Sol de Mayo: a face ringed by 32 rays alternating straight and wavy. */
function SolDeMayo() {
  const cx = FW / 2;
  const cy = FH / 2;
  const s = 5.0;
  const gold = "#f5b324";
  const goldDark = "#c8881a";
  const face = "#e8a317";
  const innerR = 26 * s;
  const tipR = 46 * s;
  const rays: React.ReactNode[] = [];
  for (let i = 0; i < 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    if (i % 2 === 0) {
      const w = 0.055;
      const x1 = cx + Math.cos(a - w) * innerR;
      const y1 = cy + Math.sin(a - w) * innerR;
      const x2 = cx + Math.cos(a + w) * innerR;
      const y2 = cy + Math.sin(a + w) * innerR;
      const xt = cx + Math.cos(a) * tipR;
      const yt = cy + Math.sin(a) * tipR;
      rays.push(
        <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${xt},${yt}`} fill={gold} stroke={goldDark} strokeWidth={0.6 * s} />
      );
    } else {
      const mid = (innerR + tipR) / 2;
      const x1 = cx + Math.cos(a) * innerR;
      const y1 = cy + Math.sin(a) * innerR;
      const xt = cx + Math.cos(a) * tipR;
      const yt = cy + Math.sin(a) * tipR;
      const px = cx + Math.cos(a + 0.13) * mid;
      const py = cy + Math.sin(a + 0.13) * mid;
      const qx = cx + Math.cos(a - 0.13) * mid;
      const qy = cy + Math.sin(a - 0.13) * mid;
      rays.push(
        <path key={i} d={`M ${x1} ${y1} Q ${px} ${py} ${xt} ${yt} Q ${qx} ${qy} ${x1} ${y1} Z`} fill={gold} stroke={goldDark} strokeWidth={0.5 * s} />
      );
    }
  }
  const r = 24 * s;
  const eyeY = cy - 4 * s;
  return (
    <g>
      {rays}
      <circle cx={cx} cy={cy} r={r} fill={face} stroke={goldDark} strokeWidth={1.2 * s} />
      <circle cx={cx - 8 * s} cy={eyeY} r={1.8 * s} fill={goldDark} />
      <circle cx={cx + 8 * s} cy={eyeY} r={1.8 * s} fill={goldDark} />
      <path d={`M ${cx - 11 * s} ${eyeY - 5 * s} q ${5 * s} ${-3 * s} ${9 * s} 0`} fill="none" stroke={goldDark} strokeWidth={1.1 * s} />
      <path d={`M ${cx + 2 * s} ${eyeY - 5 * s} q ${4.5 * s} ${-3 * s} ${9 * s} 0`} fill="none" stroke={goldDark} strokeWidth={1.1 * s} />
      <path d={`M ${cx - 2.5 * s} ${cy} q ${2.5 * s} ${3 * s} ${5 * s} 0`} fill="none" stroke={goldDark} strokeWidth={1.3 * s} />
      <path d={`M ${cx - 7 * s} ${cy + 8 * s} q ${7 * s} ${6 * s} ${14 * s} 0`} fill="none" stroke={goldDark} strokeWidth={1.4 * s} strokeLinecap="round" />
    </g>
  );
}

function ArgentinaFlag() {
  return (
    <svg className="flag-svg" viewBox={`0 0 ${FW} ${FH}`} preserveAspectRatio="xMidYMid slice">
      <rect width={FW} height={FH} fill="#fff" />
      <rect width={FW} height={FH / 3} fill="#75aadb" />
      <rect width={FW} height={FH / 3} y={(2 * FH) / 3} fill="#75aadb" />
      <SolDeMayo />
    </svg>
  );
}

/* A 5-point star centred at (cx, cy). */
function star(cx: number, cy: number, R: number, key: string) {
  const pts: string[] = [];
  const r = R * 0.382;
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? R : r;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + Math.cos(a) * rad).toFixed(1)},${(cy + Math.sin(a) * rad).toFixed(1)}`);
  }
  return <polygon key={key} points={pts.join(" ")} fill="#fff" />;
}

function USAFlag() {
  const stripes = Array.from({ length: 13 }, (_, i) => (
    <rect key={i} x="0" y={(FH / 13) * i} width={FW} height={FH / 13} fill={i % 2 === 0 ? "#b22234" : "#fff"} />
  ));
  const cantonW = FW * 0.42;
  const cantonH = (FH / 13) * 7;
  const stars: React.ReactNode[] = [];
  for (let row = 0; row < 9; row++) {
    const long = row % 2 === 0;
    const count = long ? 6 : 5;
    const offX = long ? cantonW / 12 : cantonW / 6;
    const stepX = cantonW / 6;
    const y = (cantonH / 10) * (row + 1);
    for (let c = 0; c < count; c++) {
      stars.push(star(offX + c * stepX, y, cantonW / 45, `${row}-${c}`));
    }
  }
  return (
    <svg className="flag-svg" viewBox={`0 0 ${FW} ${FH}`} preserveAspectRatio="xMidYMid slice">
      {stripes}
      <rect width={cantonW} height={cantonH} fill="#3c3b6e" />
      <g>{stars}</g>
    </svg>
  );
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
