import type { ProjectMotif as Motif } from "@/lib/content";

/**
 * A small thematic, animated SVG/CSS visual that lives at the top of each
 * project card and hints at what the project does. Pure CSS animation, no
 * canvas; all motion is paused under prefers-reduced-motion via globals.css.
 */
export default function ProjectMotif({ motif }: { motif: Motif }) {
  switch (motif) {
    case "scanner":
      return <Scanner />;
    case "ink":
      return <Ink />;
    case "subscriptions":
      return <Subscriptions />;
    case "pitch":
      return <Pitch />;
  }
}

/* CVE Intelligence — a severity matrix being swept by a scan line. */
function Scanner() {
  // Each cell carries a severity that tints its dot (crit / high / med / low).
  const sev = [
    2, 0, 1, 3, 0, 1, 2, 0, 3, 1, 0, 2,
    0, 1, 3, 0, 2, 0, 1, 0, 2, 3, 0, 1,
    1, 3, 0, 2, 0, 1, 0, 3, 0, 1, 2, 0,
  ];
  return (
    <div className="motif motif--scanner" aria-hidden="true">
      <div className="scan-grid">
        {sev.map((s, i) => (
          <span key={i} className={`dot sev-${s}`} style={{ animationDelay: `${(i % 12) * 0.12}s` }} />
        ))}
      </div>
      <span className="scan-line" />
      <span className="scan-tag">CVE-2026-•••• · analyzing</span>
    </div>
  );
}

/* Fantasy Writer — a quill flourish drawing itself, with a blinking caret. */
function Ink() {
  return (
    <div className="motif motif--ink" aria-hidden="true">
      <svg viewBox="0 0 240 80" preserveAspectRatio="xMidYMid meet">
        <path
          className="ink-path"
          d="M10 56 C 30 20, 48 20, 56 44 S 84 70, 96 44 S 128 12, 150 40 C 162 56, 176 56, 188 40 C 198 28, 214 26, 230 38"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="ink-caret" />
    </div>
  );
}

/* Nix it! — subscription rows, one getting struck through and "nixed". */
function Subscriptions() {
  const rows = [
    { label: "Streaming", price: "$12.99" },
    { label: "Cloud drive", price: "$4.99" },
    { label: "News+", price: "$8.00" },
  ];
  return (
    <div className="motif motif--subs" aria-hidden="true">
      {rows.map((r, i) => (
        <div className={`sub-row${i === 1 ? " nixed" : ""}`} key={r.label}>
          <span className="sub-icon" />
          <span className="sub-label">{r.label}</span>
          <span className="sub-price">{r.price}</span>
          <span className="sub-strike" />
        </div>
      ))}
    </div>
  );
}

/* Mundialiten — a pitch with a ball arcing toward goal. */
function Pitch() {
  return (
    <div className="motif motif--pitch" aria-hidden="true">
      <svg viewBox="0 0 240 80" preserveAspectRatio="xMidYMid slice">
        <g className="pitch-lines" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="6" y="8" width="228" height="64" rx="3" />
          <line x1="120" y1="8" x2="120" y2="72" />
          <circle cx="120" cy="40" r="14" />
          <rect x="6" y="22" width="22" height="36" />
          <rect x="212" y="22" width="22" height="36" />
        </g>
        <circle className="pitch-ball" cx="0" cy="0" r="3.4" fill="currentColor" />
      </svg>
    </div>
  );
}
