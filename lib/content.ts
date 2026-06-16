export type Palette = [string, string, string];
export type Lang = "en" | "es";
export type ProjectMotif = "scanner" | "ink" | "subscriptions" | "pitch";

/** A text segment that may be emphasised (italic in titles, bold in prose). */
export type Seg = { t: string; em?: boolean };

export interface Chapter {
  id: string;
  number: string;
  kicker: string;
  title: string;
  narrative: string;
  capabilities: string[];
  featured?: boolean;
}

export interface Job {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  bullets: string[];
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  url: string;
  motif: ProjectMotif;
}

export interface Content {
  nav: { expertise: string; journey: string; work: string; contact: string; cta: string };
  hero: {
    kicker: string;
    lines: Seg[][];
    metaLead: Seg[];
    metaLocation: string;
  };
  scrollHint: string;
  chapters: Chapter[];
  journey: { kicker: string; title: string; educationLabel: string };
  work: { kicker: string; title: string };
  epilogue: { kicker: string; titleLines: string[] };
  experience: Job[];
  projects: Project[];
  education: { degree: string; school: string; location: string; period: string };
  languagesLabel: string;
  ui: { switchTo: string; langName: string };
}

/* ---------- shared, language-neutral data ---------- */

export const contact = {
  email: "boggianooctavio@gmail.com",
  linkedin: "https://linkedin.com/in/octavioboggiano",
  github: "https://github.com/tervaskanto90",
  twitter: "https://x.com/tervaskanto",
  location: "Buenos Aires, Argentina",
};

const projectMeta: Array<Pick<Project, "name" | "stack" | "url" | "motif">> = [
  { name: "CVE Intelligence", url: "https://cve-intelligence.vercel.app", stack: ["TypeScript", "Next.js", "AI", "Security"], motif: "scanner" },
  { name: "Fantasy Writer", url: "https://fantasywriter.vercel.app", stack: ["TypeScript", "Next.js", "LLM", "Creative AI"], motif: "ink" },
  { name: "Nix it!", url: "https://nixit.vercel.app", stack: ["TypeScript", "Next.js", "Productivity"], motif: "subscriptions" },
  { name: "Mundialiten", url: "https://mundialiten.vercel.app", stack: ["TypeScript", "Next.js", "Real-time"], motif: "pitch" },
];

const jobMeta: Array<{ company: string; current?: boolean }> = [
  { company: "AudioCodes", current: true },
  { company: "Faraday Security" },
  { company: "Superintendencia de Seguros de la Nación" },
  { company: "Metrotel Argentina" },
  { company: "TAISA" },
  { company: "Trend Micro" },
];

const chapterMeta: Array<Pick<Chapter, "id" | "number" | "featured">> = [
  { id: "voice", number: "01", featured: true },
  { id: "builder", number: "02" },
  { id: "storyteller", number: "03" },
  { id: "guardian", number: "04" },
  { id: "flow", number: "05" },
];

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

/* ---------- per-language copy ---------- */

type ChapterText = Pick<Chapter, "kicker" | "title" | "narrative" | "capabilities">;
type JobText = Pick<Job, "role" | "location" | "period" | "bullets">;
type ProjectText = Pick<Project, "tagline" | "description">;

interface Strings {
  nav: Content["nav"];
  hero: Content["hero"];
  scrollHint: string;
  chapters: ChapterText[];
  journey: Content["journey"];
  work: Content["work"];
  epilogue: Content["epilogue"];
  experience: JobText[];
  projects: ProjectText[];
  education: Content["education"];
  languagesLabel: string;
  ui: Content["ui"];
}

const EN: Strings = {
  nav: { expertise: "Expertise", journey: "Journey", work: "Work", contact: "Contact", cta: "Let's talk" },
  hero: {
    kicker: "Octavio Boggiano · AI Solutions Architect",
    lines: [
      [{ t: "Designing intelligent" }],
      [{ t: "systems that " }, { t: "listen,", em: true }],
      [{ t: "speak", em: true }, { t: " & act." }],
    ],
    metaLead: [
      { t: "AI Solutions Architect with " },
      { t: "more than a decade", em: true },
      { t: " of experience across voice, cybersecurity and unified communications — designing systems where enterprise communication meets AI." },
    ],
    metaLocation: "Buenos Aires → the world · EN / ES native",
  },
  scrollHint: "scroll to begin the story ↓",
  chapters: [
    {
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
    },
    {
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
  ],
  journey: {
    kicker: "The Journey",
    title: "More than a decade of building, securing & connecting",
    educationLabel: "Education",
  },
  work: { kicker: "Selected Work", title: "Things I've shipped" },
  epilogue: { kicker: "Epilogue", titleLines: ["Every great system starts", "with a conversation."] },
  experience: [
    {
      role: "Solutions Architect · Presales Engineer",
      location: "Remote from Buenos Aires, Argentina",
      period: "2026 — Present",
      bullets: [
        "Architecting Voice AI solutions end to end: conversational agents, voice bots and real-time speech intelligence over enterprise voice.",
        "Owning presales across Argentina, Uruguay, Paraguay, Bolivia and Chile: discovery, high-level design, demos, POC delivery and RFP responses.",
        "Designing architectures where telephony meets real-time AI: voice bots, transcription pipelines and intelligent call routing.",
      ],
    },
    {
      role: "Enterprise Solutions Specialist · Presales Engineer",
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
      location: "Buenos Aires, Argentina · On-site",
      period: "2016 — 2017",
      bullets: [
        "Managed government and public-sector accounts for a telecommunications carrier, selling connectivity, SIP trunking and managed voice services.",
        "Worked with engineering teams on solution feasibility and proposals for enterprise connectivity and voice infrastructure projects.",
      ],
    },
    {
      role: "Account Manager · Presales Engineer — UC & Security",
      location: "Buenos Aires, Argentina · On-site",
      period: "2014 — 2016",
      bullets: [
        "Implemented enterprise solutions across Cisco, Fortinet, Avaya, HP and VMware for healthcare clients, from design to deployment.",
        "Hands-on presales: demos, POC configurations and competitive analysis, translating business objectives into tailored architectures.",
      ],
    },
    {
      role: "Technical Support Specialist",
      location: "Buenos Aires, Argentina · On-site",
      period: "2013 — 2014",
      bullets: [
        "Supported enterprise security and network infrastructure: perimeter security, endpoint protection and network hardening.",
        "Implemented Trend Micro security products across client environments.",
      ],
    },
  ],
  projects: [
    {
      tagline: "AI-powered vulnerability intelligence",
      description:
        "A platform that tracks, enriches and prioritizes CVEs with AI — turning raw vulnerability feeds into actionable intelligence for security teams.",
    },
    {
      tagline: "An AI co-author for fantasy fiction",
      description:
        "A writing studio where AI helps worldbuild, outline and draft fantasy stories — storytelling and LLMs working in the same document.",
    },
    {
      tagline: "Your subscriptions, under control",
      description:
        "An app to track and manage your subscriptions — see exactly what you pay, spot what you no longer use, and nix it before the next renewal.",
    },
    {
      tagline: "The 2026 World Cup, gamified",
      description:
        "A companion app for the 2026 World Cup — fixtures, groups and predictions with friends, shipped just in time for kickoff.",
    },
  ],
  education: {
    degree: "Bachelor of Information Systems",
    school: "Universidad de Belgrano",
    location: "Buenos Aires, Argentina",
    period: "2018 — 2023",
  },
  languagesLabel: "English (Native) · Spanish (Native)",
  ui: { switchTo: "Cambiar a español", langName: "English" },
};

const ES: Strings = {
  nav: { expertise: "Áreas", journey: "Trayectoria", work: "Proyectos", contact: "Contacto", cta: "Hablemos" },
  hero: {
    kicker: "Octavio Boggiano · Arquitecto de Soluciones de IA",
    lines: [
      [{ t: "Diseño sistemas" }],
      [{ t: "inteligentes que " }, { t: "escuchan,", em: true }],
      [{ t: "hablan", em: true }, { t: " y actúan." }],
    ],
    metaLead: [
      { t: "Arquitecto de Soluciones de IA con " },
      { t: "más de una década", em: true },
      { t: " de experiencia en voz, ciberseguridad y comunicaciones unificadas — diseñando sistemas donde la comunicación empresarial se encuentra con la IA." },
    ],
    metaLocation: "Buenos Aires → el mundo · EN / ES nativo",
  },
  scrollHint: "scrolleá para comenzar la historia ↓",
  chapters: [
    {
      kicker: "La Voz",
      title: "IA que habla — y escucha",
      narrative:
        "La voz es la interfaz más antigua que tenemos, y la nueva frontera de la IA. Diseño experiencias de voz conversacional de punta a punta: modelos de habla en tiempo real sobre IP, agentes que mantienen conversaciones telefónicas naturales, asistentes dentro de Microsoft Teams y contact centers — llamadas que entienden la intención en lugar de solo transportar audio.",
      capabilities: [
        "IA de voz y agentes conversacionales",
        "Voice bots para contact centers",
        "Pipelines de speech-to-text / text-to-speech",
        "Transcripción y analítica de voz en tiempo real",
        "Integración con Microsoft Teams",
        "Voz sobre IP a escala enterprise",
      ],
    },
    {
      kicker: "El Constructor",
      title: "De la idea al producto de IA en producción",
      narrative:
        "La arquitectura sin entregar es solo una presentación. Construyo aplicaciones de IA full-stack — frontends en Next.js, backends potenciados por LLMs, pipelines RAG, flujos con agentes — y las llevo hasta producción. Los proyectos de abajo no son maquetas: son productos en vivo que diseñé, construí y deployé.",
      capabilities: [
        "Apps de IA full-stack (Next.js, TypeScript, Python)",
        "Integración de LLMs y arquitectura de prompts",
        "RAG y búsqueda vectorial",
        "Flujos con agentes y MCP",
        "Deploy en la nube (Vercel, AWS, Azure, GCP)",
      ],
    },
    {
      kicker: "El Narrador",
      title: "La narrativa como disciplina de ingeniería",
      narrative:
        "Cada solución que vendí, la vendí con una historia. El storytelling es cómo una arquitectura compleja se vuelve una decisión de negocio — en una demo, una POC, una respuesta a un RFP, o en el propio producto. Aplico ese mismo oficio a la IA: construyo herramientas que generan, estructuran y elevan la narrativa, y presento la tecnología de una forma que los decisores realmente sienten.",
      capabilities: [
        "Storytelling técnico y demos",
        "Herramientas de escritura asistida por IA",
        "Diseño y entrega de POCs",
        "Estrategia de respuesta a RFI / RFP",
        "Venta consultiva de soluciones",
      ],
    },
    {
      kicker: "El Guardián",
      title: "IA del lado de los defensores",
      narrative:
        "Ocho años en ciberseguridad no desaparecen — evolucionan. Llevo la gestión de vulnerabilidades, los marcos de cumplimiento y la mentalidad de seguridad ofensiva a la era de la IA: triage de CVEs asistido por LLMs, scoring inteligente de riesgo, y la protección de los propios sistemas de IA. ISO 27001, NIST CSF, PCI-DSS, SOC 2 y HIPAA no son siglas para mí; fueron mi trabajo diario en finanzas, salud y gobierno.",
      capabilities: [
        "Inteligencia de vulnerabilidades con IA",
        "Arquitectura de seguridad para sistemas de IA",
        "ISO 27001 · NIST CSF · PCI-DSS · SOC 2 · HIPAA",
        "Gestión de vulnerabilidades y pentesting",
        "Faraday, Tenable, Qualys, Burp Suite, CrowdStrike",
      ],
    },
    {
      kicker: "El Flujo",
      title: "Automatización que elimina fricción",
      narrative:
        "Todo flujo de trabajo tiene peso muerto: traspasos, copiar y pegar, esperas. Los persigo y los reemplazo con automatización orquestada — flujos en n8n, agentes en Python, integraciones por API — para que los equipos se muevan a la velocidad de sus decisiones, no de sus herramientas. La eficiencia de flujo es el superpoder silencioso detrás de cada sistema que diseño.",
      capabilities: [
        "Orquestación de flujos (n8n, Zapier)",
        "Automatización en Python y JavaScript",
        "Agentes de IA en procesos de negocio",
        "Integración por API y diseño orientado a eventos",
        "Mapeo de procesos y eficiencia de flujo",
      ],
    },
  ],
  journey: {
    kicker: "La Trayectoria",
    title: "Más de una década construyendo, protegiendo y conectando",
    educationLabel: "Educación",
  },
  work: { kicker: "Proyectos Seleccionados", title: "Cosas que lancé" },
  epilogue: { kicker: "Epílogo", titleLines: ["Todo gran sistema empieza", "con una conversación."] },
  experience: [
    {
      role: "Arquitecto de Soluciones · Ingeniero de Preventa",
      location: "Remoto desde Buenos Aires, Argentina",
      period: "2026 — Presente",
      bullets: [
        "Arquitecturando soluciones de IA de voz de punta a punta: agentes conversacionales, voice bots e inteligencia de habla en tiempo real sobre voz empresarial.",
        "A cargo de la preventa en Argentina, Uruguay, Paraguay, Bolivia y Chile: relevamiento, diseño de alto nivel, demos, entrega de POCs y respuestas a RFP.",
        "Diseñando arquitecturas donde la telefonía se encuentra con la IA en tiempo real: voice bots, pipelines de transcripción y enrutamiento inteligente de llamadas.",
      ],
    },
    {
      role: "Especialista en Soluciones Enterprise · Ingeniero de Preventa",
      location: "Buenos Aires, Argentina · Remoto",
      period: "2022 — 2026",
      bullets: [
        "Lideré la preventa de punta a punta de una plataforma de gestión de vulnerabilidades para clientes enterprise en servicios financieros, salud y gobierno.",
        "Entregué demos y diseños de solución que mapeaban los flujos de vulnerabilidades a los requisitos de cumplimiento de ISO 27001, PCI-DSS, SOC 2 y HIPAA.",
        "Construí casos de uso de evaluación automatizada, scoring de riesgo NIST 800-30 y seguimiento de remediación, acelerando los ciclos de venta de prospectos con auditorías en puerta.",
        "Fui dueño de la relación técnica desde la primera oportunidad hasta la entrega de la POC y el traspaso a los equipos de posventa.",
      ],
    },
    {
      role: "Consultor de Ciberseguridad e Infraestructura de UC",
      location: "Buenos Aires, Argentina · Híbrido",
      period: "2018 — 2021",
      bullets: [
        "Diseñé y desplegué la arquitectura de seguridad de voz y datos de un organismo público: segmentación de VoIP, políticas de QoS y controles de seguridad sobre troncales SIP.",
        "Implementé un programa de gestión de vulnerabilidades alineado con ISO 27001 y los estándares de ciberseguridad del Estado, incluyendo evaluaciones y pruebas de penetración.",
        "Coordiné la evaluación de proveedores de SBC, telefonía IP y plataformas de seguridad, asegurando el cumplimiento regulatorio.",
      ],
    },
    {
      role: "Account Manager · Sector Público",
      location: "Buenos Aires, Argentina · Presencial",
      period: "2016 — 2017",
      bullets: [
        "Gestioné cuentas de gobierno y del sector público para un carrier de telecomunicaciones, vendiendo conectividad, troncales SIP y servicios de voz administrados.",
        "Trabajé con los equipos de ingeniería en la factibilidad de soluciones y propuestas para proyectos de conectividad e infraestructura de voz empresarial.",
      ],
    },
    {
      role: "Account Manager · Ingeniero de Preventa — UC y Seguridad",
      location: "Buenos Aires, Argentina · Presencial",
      period: "2014 — 2016",
      bullets: [
        "Implementé soluciones enterprise con Cisco, Fortinet, Avaya, HP y VMware para clientes del sector salud, desde el diseño hasta el despliegue.",
        "Preventa hands-on: demos, configuración de POCs y análisis competitivo, traduciendo objetivos de negocio en arquitecturas a medida.",
      ],
    },
    {
      role: "Especialista en Soporte Técnico",
      location: "Buenos Aires, Argentina · Presencial",
      period: "2013 — 2014",
      bullets: [
        "Di soporte a infraestructura de seguridad y redes empresariales: seguridad perimetral, protección de endpoints y hardening de red.",
        "Implementé productos de seguridad de Trend Micro en entornos de clientes.",
      ],
    },
  ],
  projects: [
    {
      tagline: "Inteligencia de vulnerabilidades con IA",
      description:
        "Una plataforma que rastrea, enriquece y prioriza CVEs con IA — convirtiendo feeds crudos de vulnerabilidades en inteligencia accionable para equipos de seguridad.",
    },
    {
      tagline: "Un co-autor de IA para ficción fantástica",
      description:
        "Un estudio de escritura donde la IA ayuda a crear mundos, esquematizar y redactar historias de fantasía — storytelling y LLMs trabajando en el mismo documento.",
    },
    {
      tagline: "Tus suscripciones, bajo control",
      description:
        "Una app para controlar y gestionar tus suscripciones — mirá exactamente qué pagás, detectá lo que ya no usás, y cancelalo antes de la próxima renovación.",
    },
    {
      tagline: "El Mundial 2026, gamificado",
      description:
        "Una app companion para el Mundial 2026 — fixture, grupos y predicciones con amigos, lista justo para el pitazo inicial.",
    },
  ],
  education: {
    degree: "Licenciatura en Sistemas de Información",
    school: "Universidad de Belgrano",
    location: "Buenos Aires, Argentina",
    period: "2018 — 2023",
  },
  languagesLabel: "Inglés (nativo) · Español (nativo)",
  ui: { switchTo: "Switch to English", langName: "Español" },
};

const STRINGS: Record<Lang, Strings> = { en: EN, es: ES };

export function getContent(lang: Lang): Content {
  const s = STRINGS[lang];
  return {
    nav: s.nav,
    hero: s.hero,
    scrollHint: s.scrollHint,
    chapters: chapterMeta.map((m, i) => ({ ...m, ...s.chapters[i] })),
    journey: s.journey,
    work: s.work,
    epilogue: s.epilogue,
    experience: jobMeta.map((m, i) => ({ ...m, ...s.experience[i] })),
    projects: projectMeta.map((m, i) => ({ ...m, ...s.projects[i] })),
    education: s.education,
    languagesLabel: s.languagesLabel,
    ui: s.ui,
  };
}
