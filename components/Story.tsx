"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { contact } from "@/lib/content";
import ProjectMotif from "@/components/ProjectMotif";
import { useI18n, LangToggle } from "@/components/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const root = useRef<HTMLDivElement>(null);
  const { content: t } = useI18n();
  const { nav, hero, chapters, journey, work, epilogue, experience, projects, education } = t;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        gsap.fromTo(
          group.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: group, start: "top 85%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".chapter-number").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 30, opacity: 0 },
          {
            yPercent: -10,
            opacity: 0.16,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // hero entrance
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".portrait", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.9 }, 0.1)
        .fromTo(".hero-kicker", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 }, 0.2)
        .fromTo(
          ".hero-title .line",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.2, stagger: 0.12 },
          0.4
        )
        .fromTo(".hero-meta", { opacity: 0 }, { opacity: 1, duration: 1 }, 1.1)
        .fromTo(".scroll-hint", { opacity: 0 }, { opacity: 0.7, duration: 1 }, 1.4);

      // hero drifts away as you scroll into the story
      gsap.to(".hero-inner", {
        opacity: 0,
        y: -120,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom 35%", scrub: true },
      });
    }, root);

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={root}>
      <header className="site-nav">
        <a href="#top" className="monogram">Octavio Boggiano</a>
        <nav>
          <a href="#voice">{nav.expertise}</a>
          <a href="#journey">{nav.journey}</a>
          <a href="#work">{nav.work}</a>
          <a href="#contact">{nav.contact}</a>
        </nav>
        <div className="nav-right">
          <LangToggle />
          <a className="nav-cta" href={`mailto:${contact.email}`}>
            {nav.cta}
          </a>
        </div>
      </header>

      {/* CH 0 — HERO */}
      <section className="hero" id="top" data-chapter="0">
        <div className="hero-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/octavio.jpg"
            alt="Octavio Boggiano"
            className="portrait"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <p className="hero-kicker">{hero.kicker}</p>
          <h1 className="hero-title">
            {hero.lines.map((segs, i) => (
              <span className="mask" key={i}>
                <span className="line">
                  {segs.map((s, j) => (s.em ? <em key={j}>{s.t}</em> : <span key={j}>{s.t}</span>))}
                </span>
              </span>
            ))}
          </h1>
          <div className="hero-meta">
            <p>
              {hero.metaLead.map((s, i) => (s.em ? <strong key={i}>{s.t}</strong> : <span key={i}>{s.t}</span>))}
            </p>
            <p className="hero-location">{hero.metaLocation}</p>
          </div>
        </div>
        <div className="scroll-hint">{t.scrollHint}</div>
      </section>

      {/* CHAPTERS */}
      {chapters.map((ch, i) => (
        <section
          key={ch.id}
          id={ch.id}
          data-chapter={i + 1}
          className={`chapter${ch.featured ? " featured" : ""}`}
        >
          <span className="chapter-number" aria-hidden="true">{ch.number}</span>
          <div className="chapter-body">
            <p className="kicker" data-reveal>{ch.kicker}</p>
            <h2 data-reveal>{ch.title}</h2>
            <p className="narrative" data-reveal>{ch.narrative}</p>
            <ul className="chips" data-reveal-group>
              {ch.capabilities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* JOURNEY */}
      <section className="journey" id="journey" data-chapter={chapters.length + 1}>
        <span className="chapter-number" aria-hidden="true">06</span>
        <div className="chapter-body wide">
          <p className="kicker" data-reveal>{journey.kicker}</p>
          <h2 data-reveal>{journey.title}</h2>
          <div className="timeline">
            {experience.map((job) => (
              <article className="job" key={`${job.company}-${job.period}`} data-reveal>
                <div className="job-head">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="job-company">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <p className={`job-period${job.current ? " current" : ""}`}>{job.period}</p>
                </div>
                <ul>
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="education" data-reveal>
            <span className="kicker-inline">{journey.educationLabel}</span> {education.degree} ·{" "}
            {education.school}, {education.location} · {education.period}
          </p>
        </div>
      </section>

      {/* WORK */}
      <section className="work" id="work" data-chapter={chapters.length + 2}>
        <span className="chapter-number" aria-hidden="true">07</span>
        <div className="chapter-body wide">
          <p className="kicker" data-reveal>{work.kicker}</p>
          <h2 data-reveal>{work.title}</h2>
          <div className="project-grid" data-reveal-group>
            {projects.map((p) => (
              <a
                className={`project-card motif-${p.motif}`}
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
              >
                <ProjectMotif motif={p.motif} />
                <div className="project-top">
                  <h3>{p.name}</h3>
                  <span className="arrow" aria-hidden="true">↗</span>
                </div>
                <p className="project-tagline">{p.tagline}</p>
                <p className="project-desc">{p.description}</p>
                <ul className="stack">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* EPILOGUE */}
      <section className="epilogue" id="contact" data-chapter={chapters.length + 3}>
        <div className="chapter-body">
          <p className="kicker" data-reveal>{epilogue.kicker}</p>
          <h2 data-reveal>
            {epilogue.titleLines[0]}<br />{epilogue.titleLines[1]}
          </h2>
          <a className="big-mail" href={`mailto:${contact.email}`} data-reveal>
            {contact.email}
          </a>
          <div className="socials" data-reveal-group>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={contact.twitter} target="_blank" rel="noreferrer">Twitter</a>
          </div>
          <footer>
            <p>{contact.location} · {t.languagesLabel}</p>
            <p>© {new Date().getFullYear()} Octavio Boggiano</p>
          </footer>
        </div>
      </section>
    </div>
  );
}
