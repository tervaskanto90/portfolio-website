export type Palette = [string, string, string];

export interface Chapter {
  id: string;
  number: string;
  kicker: string;
  title: string;
  narrative: string;
  capabilities: string[];
  featured?: boolean;
}

export const chapters: Chapter[] = [
  {
    id: "voice",
    number: "01",
    kicker: "The Voice",
    title: "AI that speaks — and listens",
    narrative:
      "Voice is the oldest interface we have, and the newest frontier of AI. I design conversational voice experiences end to end: real-time speech models talking over IP, agents that hold natural phone conversations, assistants living inside Microsoft Teams and contact centers — calls that understand intent instead of just carrying audio.",
    capabilities: [
      "Voice AI & conversational agents",
      "Voice bots for contact centers",
      "Speech-to-text / text-to-speech pipelines",
      "Real-time transcription & speech analytics",
      "Microsoft Teams integration",
      "Voice over IP at enterprise scale",
    ],
    featured: true,
  },
  {
    id: "builder",
    number: "02",
    kicker: "The Builder",
    title: "From idea to deployed AI product",
    narrative:
      "Architecture without shipping is just slideware. I build full-stack AI applications — Next.js frontends, LLM-powered backends, RAG pipelines, agentic workflows — and take them all the way to production. The projects below aren't mockups: they're live products I designed, built and deployed.",
    capabilities: [
      "Full-stack AI apps (Next.js, TypeScript, Python)",
      "LLM integration & prompt architecture",
      "RAG & vector search",
      "Agentic workflows & MCP",
      "Cloud deployment (Vercel, AWS, Azure, GCP)",
    ],
  },
  {
    id: "storyteller",
    number: "03",
    kicker: "The Storyteller",
    title: "Narrative as an engineering discipline",
    narrative:
      "Every solution I've ever sold was sold with a story. Storytelling is how complex architecture becomes a business decision — in a demo, a POC, an RFP response, or a product itself. I apply the same craft to AI: building tools that generate, structure and elevate narrative, and presenting technology in a way decision-makers actually feel.",
    capabilities: [
      "Technical storytelling & demos",
      "AI-assisted writing tools",
      "POC design & delivery",
      "RFI / RFP response strategy",
      "Consultative solution selling",
    ],
  },
  {
    id: "guardian",
    number: "04",
    kicker: "The Guardian",
    title: "AI on the side of the defenders",
    narrative:
      "Eight years in cybersecurity don't disappear — they evolve. I bring vulnerability management, compliance frameworks and offensive-security thinking into the AI era: LLM-assisted CVE triage, intelligent risk scoring, and securing the AI systems themselves. ISO 27001, NIST CSF, PCI-DSS, SOC 2 and HIPAA aren't acronyms to me; they were my day job in finance, healthcare and government.",
    capabilities: [
      "AI-powered vulnerability intelligence",
      "Security architecture for AI systems",
      "ISO 27001 · NIST CSF · PCI-DSS · SOC 2 · HIPAA",
      "Vulnerability management & pentesting",
      "Faraday, Tenable, Qualys, Burp Suite, CrowdStrike",
    ],
  },
  {
    id: "flow",
    number: "05",
    kicker: "The Flow",
    title: "Automation that removes friction",
    narrative:
      "Every workflow has dead weight: handoffs, copy-paste, waiting. I hunt those down and replace them with orchestrated automation — n8n flows, Python agents, API glue — so teams move at the speed of their decisions, not their tooling. Flow efficiency is the quiet superpower behind every system I design.",
    capabilities: [
      "Workflow orchestration (n8n, Zapier)",
      "Python & JavaScript automation",
      "AI agents in business processes",
      "API integration & event-driven design",
      "Process mapping & flow efficiency",
    ],
  },
];

export interface Job {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  bullets: string[];
}

export const experience: Job[] = [
  {
    role: "Solutions Architect · Presales Engineer",
    company: "AudioCodes",
    location: "Remote from Buenos Aires, Argentina",
    period: "2026 — Present",
    current: true,
    bullets: [
      "Architecting Voice AI solutions end to end: conversational agents, voice bots and real-time speech intelligence over enterprise voice.",
      "Owning presales across Argentina, Uruguay, Paraguay, Bolivia and Chile: discovery, high-level design, demos, POC delivery and RFP responses.",
      "Designing architectures where telephony meets real-time AI: voice bots, transcription pipelines and intelligent call routing.",
    ],
  },
  {
    role: "Enterprise Solutions Specialist · Presales Engineer",
    company: "Faraday Security",
    location: "Buenos Aires, Argentina · Remote",
    period: "2022 — 2026",
    bullets: [
      "Led end-to-end presales for a vulnerability management platform serving enterprise clients in financial services, healthcare and government.",
      "Delivered demos and solution designs mapping vulnerability workflows to ISO 27001, PCI-DSS, SOC 2 and HIPAA compliance requirements.",
      "Built use cases around automated assessment, NIST 800-30 risk scoring and remediation tracking, accelerating sales cycles for audit-driven prospects.",
      "Owned the technical relationship from first opportunity through POC delivery and handover to post-sales teams.",
    ],
  },
  {
    role: "Cybersecurity & UC Infrastructure Consultant",
    company: "Superintendencia de Seguros de la Nación",
    location: "Buenos Aires, Argentina · Hybrid",
    period: "2018 — 2021",
    bullets: [
      "Designed and deployed enterprise voice and data security architecture for a government agency: VoIP segmentation, QoS policies and SIP trunk security controls.",
      "Implemented a vulnerability management program aligned with ISO 27001 and government cybersecurity standards, including assessments and penetration testing.",
      "Coordinated vendor evaluation for SBC, IP telephony and security platforms, ensuring regulatory compliance.",
    ],
  },
  {
    role: "Account Manager · Public Sector",
    company: "Metrotel Argentina",
    location: "Buenos Aires, Argentina · On-site",
    period: "2016 — 2017",
    bullets: [
      "Managed government and public-sector accounts for a telecommunications carrier, selling connectivity, SIP trunking and managed voice services.",
      "Worked with engineering teams on solution feasibility and proposals for enterprise connectivity and voice infrastructure projects.",
    ],
  },
  {
    role: "Account Manager · Presales Engineer — UC & Security",
    company: "TAISA",
    location: "Buenos Aires, Argentina · On-site",
    period: "2014 — 2016",
    bullets: [
      "Implemented enterprise solutions across Cisco, Fortinet, Avaya, HP and VMware for healthcare clients, from design to deployment.",
      "Hands-on presales: demos, POC configurations and competitive analysis, translating business objectives into tailored architectures.",
    ],
  },
  {
    role: "Technical Support Specialist",
    company: "Trend Micro",
    location: "Buenos Aires, Argentina · On-site",
    period: "2013 — 2014",
    bullets: [
      "Supported enterprise security and network infrastructure: perimeter security, endpoint protection and network hardening.",
      "Implemented Trend Micro security products across client environments.",
    ],
  },
];

export interface Project {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  url: string;
}

export const projects: Project[] = [
  {
    name: "CVE Intelligence",
    tagline: "AI-powered vulnerability intelligence",
    description:
      "A platform that tracks, enriches and prioritizes CVEs with AI — turning raw vulnerability feeds into actionable intelligence for security teams.",
    stack: ["TypeScript", "Next.js", "AI", "Security"],
    url: "https://cve-intelligence.vercel.app",
  },
  {
    name: "Fantasy Writer",
    tagline: "An AI co-author for fantasy fiction",
    description:
      "A writing studio where AI helps worldbuild, outline and draft fantasy stories — storytelling and LLMs working in the same document.",
    stack: ["TypeScript", "Next.js", "LLM", "Creative AI"],
    url: "https://fantasywriter.vercel.app",
  },
  {
    name: "Nix it!",
    tagline: "Your subscriptions, under control",
    description:
      "An app to track and manage your subscriptions — see exactly what you pay, spot what you no longer use, and nix it before the next renewal.",
    stack: ["TypeScript", "Next.js", "Productivity"],
    url: "https://nixit.vercel.app",
  },
  {
    name: "Mundialiten",
    tagline: "The 2026 World Cup, gamified",
    description:
      "A companion app for the 2026 World Cup — fixtures, groups and predictions with friends, shipped just in time for kickoff.",
    stack: ["TypeScript", "Next.js", "Real-time"],
    url: "https://mundialiten.vercel.app",
  },
];

export const education = {
  degree: "Bachelor of Information Systems",
  school: "Universidad de Belgrano",
  location: "Buenos Aires, Argentina",
  period: "2018 — 2023",
};

export const contact = {
  email: "boggianooctavio@gmail.com",
  linkedin: "https://linkedin.com/in/octavioboggiano",
  github: "https://github.com/tervaskanto90",
  twitter: "https://x.com/", // TODO: confirm X/Twitter handle
  location: "Buenos Aires, Argentina",
  languages: "English (Native) · Spanish (Native)",
};

// One palette per scroll chapter, in document order:
// hero, voice, builder, storyteller, guardian, flow, journey, work, epilogue
export const palettes: Palette[] = [
  ["#06061a", "#1b1b4d", "#4f46e5"], // hero — deep indigo
  ["#160a2e", "#6d28d9", "#f97316"], // voice — violet / ember
  ["#03191c", "#0f766e", "#22d3ee"], // builder — teal / cyan
  ["#1f0c12", "#9f1239", "#f59e0b"], // storyteller — wine / amber
  ["#03140c", "#065f46", "#34d399"], // guardian — emerald on black
  ["#0a1224", "#1d4ed8", "#93c5fd"], // flow — electric blue
  ["#10101c", "#374164", "#a5b4fc"], // journey — slate indigo
  ["#170b22", "#7e22ce", "#f0abfc"], // work — purple / pink
  ["#05050f", "#312e81", "#818cf8"], // epilogue — midnight
];
