"use client";

import { contact } from "@/lib/content";
import { useI18n, LangToggle } from "@/components/LanguageProvider";

/**
 * Lives outside the frosted language wrapper on purpose: a filtered or
 * transformed ancestor would turn this position:fixed bar into one that
 * scrolls away with the page.
 */
export default function SiteNav() {
  const { content, navRef } = useI18n();
  const { nav } = content;
  return (
    <header className="site-nav" ref={navRef}>
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
  );
}
