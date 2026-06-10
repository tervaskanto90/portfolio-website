"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  chapters,
  experience,
  projects,
  education,
  contact,
} from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const root = useRef<HTMLDivElement>(null);

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
        <a href="#top" className="monogram">OB</a>
        <nav>
          <a href="#voice">Expertise</a>
          <a href="#journey">Journey</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="nav-cta" href={`mailto:${contact.email}`}>
          Let&apos;s talk
        </a>
      </header>

      {/* CH 0 — HERO */}
      <section className="hero" id="top" data-chapter="0">
        <div className="hero-inner">
          <p className="hero-kicker">Octavio Boggiano · AI Solutions Architect</p>
          <h1 className="hero-title">
            <span className="mask"><span className="line">I architect intelligent</span></span>
            <span className="mask"><span className="line">systems that <em>listen,</em></span></span>
            <span className="mask"><span className="line"><em>speak</em> &amp; act.</span></span>
          </h1>
          <div className="hero-meta">
            <p>
              Solutions Architect at <strong>AudioCodes</strong> — designing where
              enterprise voice meets AI. 10+ years across presales engineering,
              cybersecurity and unified communications.
            </p>
            <p className="hero-location">Buenos Aires → the world · EN / ES native</p>
          </div>
        </div>
        <div className="scroll-hint">scroll to begin the story ↓</div>
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
          <p className="kicker" data-reveal>The Journey</p>
          <h2 data-reveal>A decade of building, securing &amp; connecting</h2>
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
            <span className="kicker-inline">Education</span> {education.degree} ·{" "}
            {education.school}, {education.location} · {education.period}
          </p>
        </div>
      </section>

      {/* WORK */}
      <section className="work" id="work" data-chapter={chapters.length + 2}>
        <span className="chapter-number" aria-hidden="true">07</span>
        <div className="chapter-body wide">
          <p className="kicker" data-reveal>Selected Work</p>
          <h2 data-reveal>Things I&apos;ve shipped</h2>
          <div className="project-grid" data-reveal-group>
            {projects.map((p) => (
              <a className="project-card" key={p.name} href={p.url} target="_blank" rel="noreferrer">
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
          <p className="kicker" data-reveal>Epilogue</p>
          <h2 data-reveal>
            Every great system starts<br />with a conversation.
          </h2>
          <a className="big-mail" href={`mailto:${contact.email}`} data-reveal>
            {contact.email}
          </a>
          <div className="socials" data-reveal-group>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={`mailto:${contact.email}`}>Email</a>
          </div>
          <footer>
            <p>{contact.location} · {contact.languages}</p>
            <p>© {new Date().getFullYear()} Octavio Boggiano</p>
          </footer>
        </div>
      </section>
    </div>
  );
}
