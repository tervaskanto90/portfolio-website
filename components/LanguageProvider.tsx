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

// A whisper of national colour during the fade — sky-blue for ES, navy for EN.
const TINT: Record<Lang, string> = { es: "#7fb0de", en: "#3f3e6e" };

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [sweepLabel, setSweepLabel] = useState("Español");
  const contentRef = useRef<HTMLDivElement>(null);
  const tintRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
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

  // Restore a previously chosen language (no animation on first load).
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

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const el = contentRef.current;
    if (reduce || !el) {
      applyLang(target);
      return;
    }

    const tint = tintRef.current;
    const word = wordRef.current;
    if (tint) tint.style.background = TINT[target];
    setSweepLabel(target === "es" ? "Español" : "English");

    animating.current = true;

    // Drive everything off a plain object so blur interpolates reliably.
    const o = { blur: 0, fade: 1, scale: 1, tint: 0, word: 0 };
    const render = () => {
      el.style.filter = `blur(${o.blur}px)`;
      el.style.opacity = `${o.fade}`;
      el.style.transform = `scale(${o.scale})`;
      if (tint) tint.style.opacity = `${o.tint}`;
      if (word) {
        word.style.opacity = `${o.word}`;
        word.style.transform = `scale(${0.9 + 0.1 * o.word})`;
      }
    };

    const tl = gsap.timeline({
      onComplete: () => {
        el.style.filter = "";
        el.style.opacity = "";
        el.style.transform = "";
        if (tint) tint.style.opacity = "";
        if (word) word.style.opacity = "0";
        animating.current = false;
      },
    });

    // Frost out: page dissolves to nothing while the language word rises in.
    tl.to(o, {
      blur: 20,
      fade: 0,
      scale: 0.985,
      tint: 0.18,
      word: 1,
      duration: 0.62,
      ease: "power2.inOut",
      onUpdate: render,
    });
    // Swap with the page fully transparent — there is no old text to "pop".
    tl.add(() => applyLang(target));
    // Hold on the word so the change lands as a deliberate beat, not a jump.
    tl.to({}, { duration: 0.34 });
    // Settle back in, crisp, in the new language; the word dissolves away.
    tl.to(o, {
      blur: 0,
      fade: 1,
      scale: 1,
      tint: 0,
      word: 0,
      duration: 0.78,
      ease: "power2.out",
      onUpdate: render,
    });
  };

  return (
    <Ctx.Provider value={{ lang, content, toggle }}>
      <div ref={contentRef} className="lang-content">
        {children}
      </div>
      <div ref={tintRef} className="lang-tint" aria-hidden="true" />
      <div ref={wordRef} className="lang-word" aria-hidden="true">
        {sweepLabel}
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
