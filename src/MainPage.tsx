import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from "react";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface Theme {
    bg: string; surface: string; surfaceAlt: string;
    border: string; borderStrong: string;
    text: string; textMuted: string; textFaint: string;
    cream: string;
}

interface Project {
    id: string; title: string; subtitle: string; description: string;
    tags: string[]; emoji: string; accent: string;
    type: string; year: string; highlights: string[];
}

interface Achievement {
    title: string; org: string; year: string;
    icon: string; cat: keyof typeof CAT_ACCENTS;
}

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const C = {
    forest: "#3D6B52",
    forestDim: "#2F5240",
    forestDeep: "#1E3528",
    sage: "#7FA882",
    sageLight: "#A8C5A0",
    cream: "#E6F0DE",
    creamDark: "#C8DEC0",
    // dark
    dBg: "#0B100D",
    dSurf: "#101810",
    dSurfAlt: "#141E15",
    dBorder: "#1E2E21",
    dBorderSt: "#2A3E2C",
    dText: "#D8ECD2",
    dMuted: "#698C6E",
    dFaint: "#3A5040",
    dCream: "#162019",
    // light
    lBg: "#F2F6EF",
    lSurf: "#FFFFFF",
    lSurfAlt: "#EDF4E8",
    lBorder: "#D0E2C8",
    lBorderSt: "#B8D0AE",
    lText: "#1A2820",
    lMuted: "#527060",
    lFaint: "#A8C5A0",
    lCream: "#E6F0DE",
} as const;

const CAT_ACCENTS = {
    Leadership: "#3A9E6F",
    Technical: "#7359B8",
    Academic: "#A08020",
    Competition: "#B84040",
} as const;

const STACK_CATS = {
    Frontend: C.forest,
    Backend: "#7359B8",
    Database: "#B84040",
    DevOps: "#2E7FA8",
} as const;

const personal = {
    name: "Rendyll Ryan Cabardo",
    email: "rendyllcabardo11@gmail.com",
    bio1: "I'm a 4th-year BSIT student at CRMC and a full-stack developer based in Bogo City, Cebu. I build scalable systems and polished interfaces — from centralized network monitoring tools to inventory platforms.",
    bio2: "My edge is bridging complex backend architecture with clean, intuitive frontends. I care deeply about the details users feel but never consciously see.",
    social: {
        github: "https://github.com/rrndxx",
        linkedin: "https://www.linkedin.com/in/rendyll/",
        facebook: "https://www.facebook.com/rendyllryan.cabardo",
    },
};

const STATS = [
    { num: "21", label: "Years old" },
    { num: "2+", label: "Years coding" },
    { num: "2", label: "Major projects" },
    { num: "4th", label: "Year student" },
];

const TECH: { name: string; cat: keyof typeof STACK_CATS }[] = [
    { name: "HTML", cat: "Frontend" }, { name: "CSS", cat: "Frontend" },
    { name: "JavaScript", cat: "Frontend" }, { name: "TypeScript", cat: "Frontend" },
    { name: "React", cat: "Frontend" }, { name: "Next.js", cat: "Frontend" },
    { name: "Tailwind", cat: "Frontend" }, { name: "ShadcnUI", cat: "Frontend" },
    { name: "Bootstrap", cat: "Frontend" }, { name: "TanStack Query", cat: "Frontend" },
    { name: "Node.js", cat: "Backend" }, { name: "Express", cat: "Backend" },
    { name: "FastAPI", cat: "Backend" }, { name: "PHP", cat: "Backend" },
    { name: "Python", cat: "Backend" },
    { name: "PostgreSQL", cat: "Database" }, { name: "MySQL", cat: "Database" },
    { name: "Redis", cat: "Database" }, { name: "Firebase", cat: "Database" },
    { name: "Supabase", cat: "Database" },
    { name: "Docker", cat: "DevOps" },
];

const PROJECTS: Project[] = [
    {
        id: "netdetect", title: "NetDetect", subtitle: "Network Monitoring System",
        description: "A centralized network monitoring system for CRMC that tackles unauthorized device access, bandwidth usage tracking, and remote admin control. Built to strengthen campus network security and operational efficiency.",
        tags: ["React", "TypeScript", "FastAPI", "Docker", "Redis", "PostgreSQL", "Node", "Express", "Tailwind", "Shadcn"],
        emoji: "🛡️", accent: "#3A9E6F", type: "Capstone Project", year: "2025–2026",
        highlights: ["Real-time device monitoring", "Bandwidth usage analytics", "Remote admin controls", "Unauthorized access detection"],
    },
    {
        id: "everyshelf", title: "Everyshelf", subtitle: "Inventory Management System",
        description: "End-to-end inventory platform for tracking stock batches, dispatching items to customers, monitoring sales performance, and managing raw material supply chains from suppliers.",
        tags: ["Next.js", "Supabase", "TanStack Query", "Tailwind", "Shadcn"],
        emoji: "📦", accent: "#7359B8", type: "Systems Dev Project", year: "2024–2025",
        highlights: ["Stock batch dispatching", "Sales tracking dashboard", "Supplier material tracking", "Real-time inventory sync"],
    },
];

const ACHIEVEMENTS: Achievement[] = [
    { title: "CCSO 2nd Year Representative", org: "Cebu Roosevelt Memorial Colleges", year: "2023–2024", icon: "🎓", cat: "Leadership" },
    { title: "CCSO Vice-President Academics", org: "Cebu Roosevelt Memorial Colleges", year: "2024–2025", icon: "🏛️", cat: "Leadership" },
    { title: "CCSO 4th Year Representative", org: "Cebu Roosevelt Memorial Colleges", year: "2025–2026", icon: "🎓", cat: "Leadership" },
    { title: "Full-Stack Developer — SAD", org: "Systems Analysis & Design", year: "2024–2025", icon: "💻", cat: "Technical" },
    { title: "Full-Stack Developer — Capstone", org: "BSIT Capstone Project", year: "2025–2026", icon: "🚀", cat: "Technical" },
    { title: "Dean's Lister", org: "Cebu Roosevelt Memorial Colleges", year: "2023–2026", icon: "⭐", cat: "Academic" },
    { title: "CESAFI Computer Quiz Bowl — 5th Place", org: "CESAFI Inter-School Competition", year: "2024–2025", icon: "🏆", cat: "Competition" },
    { title: "National ISITE Quiz Bowl — 5th Place", org: "National ISITE Competition", year: "2024–2025", icon: "🏆", cat: "Competition" },
];

const NAV_LINKS = ["Home", "Projects", "About", "Achievements", "Contact"];

const MARQUEE = [
    "React ✦", "TypeScript ✦", "Next.js ✦", "FastAPI ✦",
    "PostgreSQL ✦", "Docker ✦", "Supabase ✦", "TanStack Query ✦",
    "Node.js ✦", "Tailwind CSS ✦", "Redis ✦", "ShadcnUI ✦",
];

// ─────────────────────────────────────────────
// THEME
// ─────────────────────────────────────────────

const makeTheme = (dark: boolean): Theme => dark
    ? {
        bg: C.dBg, surface: C.dSurf, surfaceAlt: C.dSurfAlt,
        border: C.dBorder, borderStrong: C.dBorderSt,
        text: C.dText, textMuted: C.dMuted, textFaint: C.dFaint, cream: C.dCream
    }
    : {
        bg: C.lBg, surface: C.lSurf, surfaceAlt: C.lSurfAlt,
        border: C.lBorder, borderStrong: C.lBorderSt,
        text: C.lText, textMuted: C.lMuted, textFaint: C.lFaint, cream: C.lCream
    };

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────

function useInView(threshold = 0.12): [React.RefObject<HTMLDivElement | null>, boolean] {
    const ref = useRef<HTMLDivElement>(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVis(true); },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, vis];
}

// ─────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────

interface FadeProps {
    children: ReactNode; delay?: number; y?: number;
    className?: string; style?: CSSProperties;
}
function Fade({ children, delay = 0, y = 22, className, style: s }: FadeProps) {
    const [ref, vis] = useInView();
    return (
        <div ref={ref} className={className} style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : `translateY(${y}px)`,
            transition: `opacity .65s ease ${delay}s, transform .65s ease ${delay}s`,
            ...s,
        }}>{children}</div>
    );
}

function Label({ children, light }: { children: ReactNode; light?: boolean }) {
    return (
        <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 10,
            fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
            color: light ? C.sageLight : C.sage, fontFamily: "var(--mono)",
        }}>
            <span style={{ width: 18, height: 1.5, background: "currentColor", display: "block", borderRadius: 1 }} />
            {children}
        </div>
    );
}

function Tag({ children, accent }: { children: ReactNode; accent?: string }) {
    return (
        <span style={{
            display: "inline-block",
            fontSize: 9, fontWeight: 700, padding: "3px 9px", borderRadius: 4,
            letterSpacing: "0.07em", textTransform: "uppercase", fontFamily: "var(--mono)",
            background: accent ? `${accent}18` : `${C.forest}18`,
            color: accent ?? C.forest,
            border: `1px solid ${accent ? `${accent}35` : `${C.forest}30`}`,
        }}>{children}</span>
    );
}

// Consistent section wrapper
const W = 1020; // max content width
function Wrap({ children, style: s }: { children: ReactNode; style?: CSSProperties }) {
    return (
        <div style={{ maxWidth: W, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)", ...s }}>
            {children}
        </div>
    );
}

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────

function Navbar({ dark, setDark, theme }: { dark: boolean; setDark: (v: boolean) => void; theme: Theme }) {
    const [menu, setMenu] = useState(false);
    const [active, setActive] = useState("Home");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <nav style={{
            position: "sticky", top: 0, zIndex: 100,
            background: dark
                ? `rgba(11,16,13,${scrolled ? "0.97" : "0.88"})`
                : `rgba(242,246,239,${scrolled ? "0.97" : "0.88"})`,
            backdropFilter: "blur(20px) saturate(1.4)",
            borderBottom: `1px solid ${scrolled ? theme.borderStrong : theme.border}`,
            transition: "background .3s, border-color .3s",
        }}>
            <Wrap>
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    height: 58,
                }}>
                    {/* Logo */}
                    <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 9 }}>
                        <div style={{
                            width: 33, height: 33, background: C.forest, borderRadius: 8,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: "var(--mono)", fontSize: 9.5, fontWeight: 700, color: C.cream,
                            letterSpacing: "0.04em", flexShrink: 0,
                        }}>RRC</div>
                        <span style={{ fontWeight: 700, fontSize: 14, color: theme.text, letterSpacing: "-0.01em", fontFamily: "var(--sans)" }}>
                            Rendyll<span style={{ color: C.forest }}>.dev</span>
                        </span>
                    </a>

                    {/* Desktop links */}
                    <div className="d-nav" style={{ display: "flex", gap: 1, alignItems: "center" }}>
                        {NAV_LINKS.map(l => (
                            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setActive(l)} style={{
                                textDecoration: "none", fontSize: 12.5, fontWeight: 600,
                                padding: "6px 12px", borderRadius: 6, fontFamily: "var(--sans)",
                                color: active === l ? C.forest : theme.textMuted,
                                background: active === l ? (dark ? `${C.forest}22` : C.cream) : "transparent",
                                transition: "all .18s",
                            }}>{l}</a>
                        ))}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {/* Dark toggle */}
                        <button onClick={() => setDark(!dark)} aria-label="Toggle theme" style={{
                            width: 38, height: 21, borderRadius: 11,
                            background: dark ? C.forest : theme.borderStrong,
                            border: "none", cursor: "pointer", position: "relative",
                            transition: "background .3s", flexShrink: 0,
                        }}>
                            <div style={{
                                width: 15, height: 15, borderRadius: "50%", background: "#fff",
                                position: "absolute", top: 3, left: dark ? 19 : 3, transition: "left .3s",
                            }} />
                        </button>

                        <a href="#contact" style={{
                            textDecoration: "none", fontSize: 12, fontWeight: 700,
                            padding: "7px 15px", borderRadius: 7,
                            background: C.forest, color: C.cream,
                            fontFamily: "var(--sans)", letterSpacing: "0.02em", whiteSpace: "nowrap",
                        }}>Hire Me</a>

                        <button className="mob-btn" onClick={() => setMenu(m => !m)} style={{
                            display: "none", background: "none", border: "none",
                            cursor: "pointer", color: theme.text, fontSize: 18, padding: 4, flexShrink: 0,
                        }}>{menu ? "✕" : "☰"}</button>
                    </div>
                </div>
            </Wrap>

            {menu && (
                <div style={{ borderTop: `1px solid ${theme.border}`, padding: "6px 0 10px" }}>
                    {NAV_LINKS.map(l => (
                        <a key={l} href={`#${l.toLowerCase()}`}
                            onClick={() => { setActive(l); setMenu(false); }} style={{
                                display: "block", textDecoration: "none",
                                fontSize: 14.5, fontWeight: 600, fontFamily: "var(--sans)",
                                padding: "10px clamp(1.25rem,5vw,2.5rem)",
                                color: active === l ? C.forest : theme.textMuted,
                            }}>{l}</a>
                    ))}
                </div>
            )}
        </nav>
    );
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────

function Hero({ dark, theme }: { dark: boolean; theme: Theme }) {
    return (
        <div id="home" style={{ padding: "clamp(3.5rem,9vw,6.5rem) 0 clamp(2.5rem,7vw,5rem)" }}>
            <Wrap>
                <div className="hero-grid" style={{
                    display: "grid", gridTemplateColumns: "1fr auto",
                    gap: "clamp(2rem,5vw,3.5rem)", alignItems: "center",
                }}>
                    {/* Left */}
                    <div style={{ minWidth: 0 }}>
                        <Fade delay={0}>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 7,
                                background: dark ? `${C.forest}22` : C.cream,
                                border: `1px solid ${C.forest}40`, borderRadius: 99,
                                padding: "5px 14px 5px 10px", marginBottom: 24,
                                fontSize: 10.5, fontWeight: 700, color: C.forest,
                                letterSpacing: "0.08em", textTransform: "uppercase",
                                fontFamily: "var(--mono)",
                            }}>
                                <span style={{
                                    width: 7, height: 7, borderRadius: "50%", background: C.sage,
                                    display: "inline-block", animation: "blink 2.4s ease infinite",
                                    flexShrink: 0,
                                }} />
                                Available for projects & roles
                            </div>
                        </Fade>

                        <Fade delay={0.08}>
                            <h1 style={{
                                fontFamily: "var(--display)",
                                fontSize: "clamp(2.6rem, 6.5vw, 5rem)",
                                fontWeight: 800, lineHeight: 1.0,
                                letterSpacing: "-0.04em", margin: "0 0 18px", color: theme.text,
                            }}>
                                Hey, I'm<br />
                                <span style={{ color: C.forest, position: "relative", display: "inline-block" }}>
                                    Rendyll.
                                    <svg style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 7 }} viewBox="0 0 200 7" preserveAspectRatio="none">
                                        <path d="M0 5 Q50 2 100 5 Q150 8 200 5" stroke={C.sage} strokeWidth="1.8" fill="none" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </h1>
                        </Fade>

                        <Fade delay={0.15}>
                            <p style={{
                                fontFamily: "var(--sans)", fontSize: "clamp(.9rem, 1.7vw, 1.05rem)",
                                lineHeight: 1.78, color: theme.textMuted,
                                maxWidth: 460, margin: "0 0 28px", fontWeight: 400,
                            }}>
                                Full-stack developer & 4th-year BSIT student at{" "}
                                <strong style={{ color: theme.text, fontWeight: 600 }}>CRMC</strong>.
                                I build performant systems and polished interfaces — from real-time network monitors to inventory platforms.
                            </p>
                        </Fade>

                        <Fade delay={0.2}>
                            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
                                <a href="#projects" style={{
                                    textDecoration: "none", fontWeight: 700, fontSize: 13,
                                    padding: "10px 22px", borderRadius: 8, fontFamily: "var(--sans)",
                                    background: C.forest, color: C.cream, letterSpacing: "0.01em",
                                    transition: "transform .2s, box-shadow .2s",
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${C.forest}44`; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                                    View Projects →
                                </a>
                                <a href="#contact" style={{
                                    textDecoration: "none", fontWeight: 700, fontSize: 13,
                                    padding: "9px 20px", borderRadius: 8, fontFamily: "var(--sans)",
                                    border: `1.5px solid ${theme.borderStrong}`, color: theme.text,
                                    transition: "border-color .2s, color .2s",
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.forest; e.currentTarget.style.color = C.forest; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = theme.borderStrong; e.currentTarget.style.color = theme.text; }}>
                                    Get In Touch
                                </a>
                            </div>
                        </Fade>

                        <Fade delay={0.27}>
                            <div style={{ display: "flex", gap: "clamp(18px,4vw,32px)", flexWrap: "wrap" }}>
                                {STATS.map(({ num, label }) => (
                                    <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                        <span style={{
                                            fontFamily: "var(--display)", fontSize: "clamp(1.5rem, 2.8vw, 1.9rem)",
                                            fontWeight: 800, color: C.forest, letterSpacing: "-0.04em", lineHeight: 1,
                                        }}>{num}</span>
                                        <span style={{
                                            fontFamily: "var(--mono)", fontSize: 8.5, color: theme.textMuted,
                                            fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
                                        }}>{label}</span>
                                    </div>
                                ))}
                            </div>
                        </Fade>
                    </div>

                    {/* Hero card */}
                    <Fade delay={0.18} className="hero-card-wrap" style={{ flexShrink: 0 }}>
                        <div style={{ position: "relative", width: 248, height: 316 }}>
                            <div style={{
                                width: 212, height: 276, position: "absolute", top: 0, left: 18,
                                background: dark ? "#12201A" : C.cream,
                                border: `1.5px solid ${theme.borderStrong}`, borderRadius: 18, overflow: "hidden",
                                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                            }}>
                                <div style={{
                                    position: "absolute", inset: 0,
                                    backgroundImage: `linear-gradient(${theme.border} 1px, transparent 1px), linear-gradient(90deg, ${theme.border} 1px, transparent 1px)`,
                                    backgroundSize: "22px 22px", opacity: 0.55,
                                }} />
                                <div style={{ position: "absolute", top: -32, right: -32, width: 110, height: 110, borderRadius: "50%", background: `${C.forest}15`, border: `1.5px solid ${C.forest}20` }} />
                                <div style={{ position: "relative", textAlign: "center", padding: "0 22px" }}>
                                    <div style={{ fontSize: 50, marginBottom: 12, lineHeight: 1 }}>👨‍💻</div>
                                    <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 13, color: theme.text, letterSpacing: "-0.01em" }}>Design × Code</div>
                                    <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: theme.textMuted, marginTop: 5, fontWeight: 600 }}>Bogo City, Cebu 🇵🇭</div>
                                </div>
                                <div style={{ display: "flex", gap: 5, position: "absolute", bottom: 16 }}>
                                    {["React", "FastAPI", "Next.js"].map(t => (
                                        <span key={t} style={{
                                            fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700,
                                            padding: "3px 7px", borderRadius: 4,
                                            background: dark ? `${C.forest}28` : `${C.forest}18`, color: C.forest,
                                        }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                            {/* Accent badge */}
                            <div style={{
                                position: "absolute", bottom: 0, right: 0, width: 110, height: 64,
                                background: C.forest, borderRadius: 13,
                                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
                            }}>
                                <div style={{ fontSize: 14 }}>⚡</div>
                                <div style={{ fontFamily: "var(--mono)", fontSize: 7.5, fontWeight: 800, color: C.cream, letterSpacing: "0.08em" }}>4TH YEAR BSIT</div>
                                <div style={{ fontFamily: "var(--mono)", fontSize: 7, color: `${C.cream}80`, fontWeight: 600 }}>CRMC · CEBU, PH</div>
                            </div>
                        </div>
                    </Fade>
                </div>
            </Wrap>
        </div>
    );
}

// ─────────────────────────────────────────────
// MARQUEE
// ─────────────────────────────────────────────

function Marquee() {
    const items = [...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE];
    return (
        <div style={{ background: C.forest, padding: "11px 0", overflow: "hidden", borderTop: `1px solid ${C.sage}35`, borderBottom: `1px solid ${C.sage}35` }}>
            <div style={{
                display: "flex", gap: 48, animation: "marquee 26s linear infinite",
                width: "max-content", fontFamily: "var(--mono)",
                fontSize: 9, fontWeight: 700, color: C.cream,
                letterSpacing: "0.18em", textTransform: "uppercase",
            }}>
                {items.map((item, i) => <span key={i}>{item}</span>)}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────

function Projects({ theme }: { theme: Theme }) {
    return (
        <div id="projects" style={{ padding: "clamp(3rem,7vw,5.5rem) 0" }}>
            <Wrap>
                <Fade>
                    <Label>Selected Work</Label>
                    <h2 style={{
                        fontFamily: "var(--display)",
                        fontSize: "clamp(1.8rem, 3.8vw, 2.8rem)", fontWeight: 800,
                        letterSpacing: "-0.04em", margin: "0 0 clamp(1.75rem,4vw,3rem)", color: theme.text,
                    }}>Projects</h2>
                </Fade>

                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem,2.5vw,1.5rem)" }}>
                    {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} i={i} theme={theme} />)}
                </div>
            </Wrap>
        </div>
    );
}

function ProjectCard({ p, i, theme }: { p: Project; i: number; theme: Theme }) {
    const [hov, setHov] = useState(false);

    return (
        <Fade delay={i * 0.08}>
            <div
                className="proj-card"
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{
                    display: "grid", gridTemplateColumns: "1fr 260px",
                    borderRadius: 16, border: `1.5px solid ${hov ? `${p.accent}55` : theme.border}`,
                    background: theme.surface, overflow: "hidden",
                    transform: hov ? "translateY(-3px)" : "none",
                    boxShadow: hov ? `0 16px 48px ${p.accent}18` : "none",
                    transition: "all .28s cubic-bezier(.25,.46,.45,.94)",
                }}>

                {/* Text */}
                <div style={{ padding: "clamp(1.25rem,3.5vw,2rem)", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
                        <span style={{
                            fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700,
                            letterSpacing: "0.12em", textTransform: "uppercase",
                            color: p.accent, padding: "3px 8px", borderRadius: 4,
                            background: `${p.accent}18`, border: `1px solid ${p.accent}28`,
                        }}>{p.type}</span>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: theme.textMuted }}>{p.year}</span>
                    </div>

                    <h3 style={{
                        fontFamily: "var(--display)",
                        fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 800,
                        letterSpacing: "-0.04em", color: theme.text, margin: "0 0 4px", lineHeight: 1.05,
                    }}>{p.title}</h3>
                    <p style={{ fontFamily: "var(--sans)", fontSize: 12.5, fontWeight: 600, color: p.accent, margin: "0 0 12px" }}>{p.subtitle}</p>
                    <p style={{ fontFamily: "var(--sans)", fontSize: 13.5, color: theme.textMuted, lineHeight: 1.75, margin: "0 0 16px" }}>{p.description}</p>

                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 5 }}>
                        {p.highlights.map(h => (
                            <li key={h} style={{ fontFamily: "var(--sans)", fontSize: 12.5, color: theme.textMuted, display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ color: p.accent, fontSize: 7, flexShrink: 0 }}>◆</span>{h}
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 20, marginTop: "auto" }}>
                        {p.tags.map(t => <Tag key={t} accent={p.accent}>{t}</Tag>)}
                    </div>

                    <button style={{
                        fontFamily: "var(--sans)", alignSelf: "flex-start",
                        padding: "8px 18px", borderRadius: 7, fontWeight: 700, fontSize: 12,
                        background: hov ? p.accent : "transparent",
                        color: hov ? "#fff" : theme.text,
                        border: `1.5px solid ${hov ? p.accent : theme.borderStrong}`,
                        cursor: "pointer", transition: "all .22s",
                    }}>View Project →</button>
                </div>

                {/* Visual */}
                <div className="proj-card-visual" style={{
                    background: `linear-gradient(160deg, ${p.accent}10 0%, ${p.accent}22 100%)`,
                    borderLeft: `1.5px solid ${theme.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", overflow: "hidden",
                }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${p.accent}10 1px, transparent 1px), linear-gradient(90deg, ${p.accent}10 1px, transparent 1px)`, backgroundSize: "26px 26px" }} />
                    <div style={{ position: "absolute", top: -48, right: -48, width: 150, height: 150, borderRadius: "50%", background: `${p.accent}0E`, border: `1.5px solid ${p.accent}18` }} />
                    <div style={{ position: "absolute", bottom: -30, left: -30, width: 90, height: 90, borderRadius: "50%", background: `${p.accent}08`, border: `1.5px solid ${p.accent}12` }} />
                    <div style={{ position: "relative", textAlign: "center" }}>
                        <div style={{ fontSize: 60, lineHeight: 1 }}>{p.emoji}</div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700, color: p.accent, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 10, opacity: 0.65 }}>{p.id.toUpperCase()}</div>
                    </div>
                </div>
            </div>
        </Fade>
    );
}

// ─────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────

function About({ dark, theme }: { dark: boolean; theme: Theme }) {
    return (
        <div id="about" style={{ padding: "clamp(3rem,7vw,5.5rem) 0" }}>
            <Wrap>
                <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,4.5rem)", alignItems: "start" }}>

                    <Fade>
                        <Label>About Me</Label>
                        <h2 style={{
                            fontFamily: "var(--display)",
                            fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)", fontWeight: 800,
                            letterSpacing: "-0.04em", margin: "0 0 18px", color: theme.text, lineHeight: 1.1,
                        }}>
                            Crafting digital<br />experiences that<br />
                            <span style={{ color: C.forest }}>actually matter.</span>
                        </h2>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 14, color: theme.textMuted, lineHeight: 1.8, margin: "0 0 12px" }}>{personal.bio1}</p>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 14, color: theme.textMuted, lineHeight: 1.8, margin: "0 0 28px" }}>{personal.bio2}</p>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                            {[
                                { label: "Age", value: "21 years old" },
                                { label: "Location", value: "Bogo City, Cebu" },
                                { label: "School", value: "CRMC" },
                                { label: "Course", value: "BSIT — 4th Year" },
                                { label: "Email", value: personal.email, small: true },
                                { label: "Status", value: "Open to Work 🟢" },
                            ].map(({ label, value, small }) => (
                                <div key={label} style={{
                                    padding: "11px 13px", borderRadius: 9,
                                    border: `1.5px solid ${theme.border}`, background: theme.surfaceAlt,
                                }}>
                                    <div style={{ fontFamily: "var(--mono)", fontSize: 7.5, fontWeight: 700, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>{label}</div>
                                    <div style={{ fontFamily: "var(--sans)", fontSize: small ? 10 : 12, fontWeight: 600, color: theme.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
                                </div>
                            ))}
                        </div>
                    </Fade>

                    <Fade delay={0.1}>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 7.5, fontWeight: 700, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 16 }}>Tech Stack</div>

                        {(Object.keys(STACK_CATS) as Array<keyof typeof STACK_CATS>).map(cat => (
                            <div key={cat} style={{ marginBottom: 18 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: STACK_CATS[cat], display: "inline-block", flexShrink: 0 }} />
                                    <span style={{ fontFamily: "var(--mono)", fontSize: 7.5, fontWeight: 700, color: STACK_CATS[cat], textTransform: "uppercase", letterSpacing: "0.1em" }}>{cat}</span>
                                </div>
                                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                                    {TECH.filter(t => t.cat === cat).map(({ name }) => (
                                        <span key={name} style={{
                                            fontFamily: "var(--sans)", fontSize: 11.5, fontWeight: 600,
                                            padding: "4px 10px", borderRadius: 6,
                                            border: `1.5px solid ${theme.border}`, color: theme.text,
                                            background: dark ? `${STACK_CATS[cat]}0A` : `${STACK_CATS[cat]}07`,
                                            transition: "border-color .18s", cursor: "default",
                                        }}
                                            onMouseEnter={e => (e.currentTarget.style.borderColor = STACK_CATS[cat])}
                                            onMouseLeave={e => (e.currentTarget.style.borderColor = theme.border)}>
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* ID card */}
                        <div style={{
                            marginTop: 22, borderRadius: 13,
                            background: dark ? C.dCream : C.cream,
                            border: `1.5px solid ${theme.borderStrong}`,
                            padding: "18px", display: "flex", alignItems: "center", gap: 14,
                        }}>
                            <div style={{
                                width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
                                background: `${C.forest}25`, border: `2px solid ${C.forest}40`,
                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                            }}>👨‍💻</div>
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 14.5, color: theme.text, letterSpacing: "-0.02em" }}>Rendyll Ryan Cabardo</div>
                                <div style={{ fontFamily: "var(--sans)", fontSize: 12, color: theme.textMuted, marginTop: 2 }}>Full-Stack Developer · CRMC</div>
                                <div style={{ fontFamily: "var(--mono)", fontSize: 8, color: C.forest, marginTop: 5, fontWeight: 700, letterSpacing: "0.06em" }}>BOGO CITY, CEBU 🇵🇭 · UTC+8</div>
                            </div>
                        </div>
                    </Fade>
                </div>
            </Wrap>
        </div>
    );
}

// ─────────────────────────────────────────────
// ACHIEVEMENTS
// ─────────────────────────────────────────────

function Achievements({ dark, theme }: { dark: boolean; theme: Theme }) {
    return (
        <div id="achievements" style={{
            background: dark ? C.dSurfAlt : C.lSurfAlt,
            borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`,
            padding: "clamp(3rem,7vw,5.5rem) 0",
        }}>
            <Wrap>
                <Fade>
                    <Label>Recognition</Label>
                    <h2 style={{
                        fontFamily: "var(--display)",
                        fontSize: "clamp(1.8rem, 3.8vw, 2.8rem)", fontWeight: 800,
                        letterSpacing: "-0.04em", margin: "0 0 clamp(1.75rem,4vw,2.75rem)", color: theme.text,
                    }}>Awards & Achievements</h2>
                </Fade>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 250px), 1fr))", gap: 10 }}>
                    {ACHIEVEMENTS.map((a, i) => <AchievCard key={a.title} a={a} i={i} theme={theme} />)}
                </div>
            </Wrap>
        </div>
    );
}

function AchievCard({ a, i, theme }: { a: Achievement; i: number; theme: Theme }) {
    const acc = CAT_ACCENTS[a.cat];
    return (
        <Fade delay={i * 0.045}>
            <div style={{
                padding: "18px", borderRadius: 13,
                border: `1.5px solid ${theme.border}`, background: theme.surface,
                position: "relative", overflow: "hidden", height: "100%", boxSizing: "border-box",
                transition: "transform .2s, border-color .2s, box-shadow .2s",
            }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = acc; e.currentTarget.style.boxShadow = `0 8px 28px ${acc}18`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.boxShadow = ""; }}>

                <div style={{ position: "absolute", top: 0, right: 0, width: 46, height: 46, borderRadius: "0 13px 0 46px", background: `${acc}0C` }} />

                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 13,
                    fontFamily: "var(--mono)", fontSize: 7, fontWeight: 700, letterSpacing: "0.12em",
                    textTransform: "uppercase", color: acc, padding: "3px 7px", borderRadius: 4,
                    background: `${acc}14`,
                }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: acc, display: "inline-block" }} />
                    {a.cat}
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 11 }}>
                    <div style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>{a.icon}</div>
                    <div style={{ minWidth: 0 }}>
                        <h3 style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 12.5, color: theme.text, margin: "0 0 3px", lineHeight: 1.4 }}>{a.title}</h3>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 11, color: theme.textMuted, margin: "0 0 6px", lineHeight: 1.45 }}>{a.org}</p>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 7.5, fontWeight: 700, color: acc, letterSpacing: "0.06em" }}>{a.year}</span>
                    </div>
                </div>
            </div>
        </Fade>
    );
}

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────

function Contact() {
    const [focused, setFocused] = useState<string | null>(null);
    const [sent, setSent] = useState(false);

    const iStyle = (id: string): CSSProperties => ({
        fontFamily: "var(--sans)", width: "100%",
        padding: "10px 13px", borderRadius: 7, fontSize: 13,
        border: `1.5px solid ${focused === id ? `${C.sageLight}90` : `${C.sage}38`}`,
        background: `rgba(232,240,222,0.07)`, color: C.cream, outline: "none",
        boxSizing: "border-box", fontWeight: 500, transition: "border-color .18s",
    });

    return (
        <div id="contact" style={{ background: C.forestDeep, padding: "clamp(3rem,7vw,5.5rem) 0" }}>
            <Wrap>
                <Fade>
                    <div style={{ textAlign: "center", marginBottom: 40 }}>
                        <Label light>Let's Connect</Label>
                        <h2 style={{
                            fontFamily: "var(--display)",
                            fontSize: "clamp(1.9rem, 5vw, 3.2rem)", fontWeight: 800,
                            letterSpacing: "-0.04em", margin: "8px 0 14px", color: C.cream, lineHeight: 1.05,
                        }}>Got a project<br />in mind?</h2>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 14.5, color: `${C.cream}75`, lineHeight: 1.75, maxWidth: 380, margin: "0 auto" }}>
                            Open to freelance projects, internships, and full-time roles.
                        </p>
                    </div>

                    {/* Social links */}
                    <div style={{ display: "flex", justifyContent: "center", gap: 7, marginBottom: 32, flexWrap: "wrap" }}>
                        {Object.entries(personal.social).map(([key, href]) => (
                            <a key={key} href={href} target="_blank" rel="noreferrer" style={{
                                fontFamily: "var(--sans)", textDecoration: "none", fontSize: 12, fontWeight: 600,
                                color: `${C.cream}70`, padding: "7px 15px", borderRadius: 7,
                                border: `1px solid ${C.sage}38`, transition: "all .18s", textTransform: "capitalize",
                            }}
                                onMouseEnter={e => { e.currentTarget.style.color = C.cream; e.currentTarget.style.borderColor = `${C.sage}75`; e.currentTarget.style.background = `rgba(232,240,222,0.07)`; }}
                                onMouseLeave={e => { e.currentTarget.style.color = `${C.cream}70`; e.currentTarget.style.borderColor = `${C.sage}38`; e.currentTarget.style.background = "transparent"; }}>
                                {key}
                            </a>
                        ))}
                    </div>

                    {/* Form */}
                    <div style={{ maxWidth: 600, margin: "0 auto" }}>
                        <div style={{ background: `rgba(232,240,222,0.05)`, border: `1.5px solid ${C.sage}28`, borderRadius: 14, padding: "clamp(1.25rem,4vw,1.75rem)" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 9 }} className="form-grid">
                                {[{ id: "name", ph: "Your Name", type: "text" }, { id: "email", ph: "Your Email", type: "email" }].map(({ id, ph, type }) => (
                                    <input key={id} type={type} placeholder={ph}
                                        onFocus={() => setFocused(id)} onBlur={() => setFocused(null)}
                                        style={iStyle(id)} />
                                ))}
                            </div>
                            <input type="text" placeholder="Subject"
                                onFocus={() => setFocused("sub")} onBlur={() => setFocused(null)}
                                style={{ ...iStyle("sub"), marginBottom: 9 }} />
                            <textarea rows={4} placeholder="Tell me about your project or opportunity..."
                                onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)}
                                style={{ ...iStyle("msg"), resize: "vertical", marginBottom: 14 }} />
                            <button onClick={() => { setSent(true); setTimeout(() => setSent(false), 3000); }} style={{
                                fontFamily: "var(--sans)", width: "100%", padding: "12px",
                                borderRadius: 8, fontWeight: 800, fontSize: 13,
                                border: "none", background: sent ? C.sage : C.cream,
                                color: sent ? "#fff" : C.forestDeep,
                                cursor: "pointer", transition: "all .22s",
                            }}>
                                {sent ? "Message Sent! ✓" : "Send Message ✦"}
                            </button>
                        </div>
                        <p style={{ fontFamily: "var(--sans)", textAlign: "center", marginTop: 16, fontSize: 12.5, color: `${C.cream}45` }}>
                            Or email me at{" "}
                            <a href={`mailto:${personal.email}`} style={{ color: `${C.cream}90`, fontWeight: 700, textDecoration: "none" }}>{personal.email}</a>
                        </p>
                    </div>
                </Fade>
            </Wrap>
        </div>
    );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

function Footer({ dark }: { dark: boolean }) {
    return (
        <footer style={{ background: dark ? "#080D09" : "#192B1D", padding: "24px 0", borderTop: "1px solid #182418" }}>
            <Wrap>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 28, height: 28, background: C.forest, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 8.5, fontWeight: 700, color: C.cream }}>RRC</div>
                        <span style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 600, color: `${C.cream}45` }}>Rendyll Ryan Cabardo © 2026</span>
                    </div>
                    <div style={{ display: "flex", gap: 5 }}>
                        {Object.entries(personal.social).map(([key, href]) => (
                            <a key={key} href={href} target="_blank" rel="noreferrer" style={{
                                fontFamily: "var(--sans)", textDecoration: "none",
                                fontSize: 11, fontWeight: 600, padding: "5px 10px", borderRadius: 6,
                                border: "1px solid #1E2C1E", color: `${C.cream}42`, transition: "all .18s",
                                textTransform: "capitalize",
                            }}
                                onMouseEnter={e => { e.currentTarget.style.color = C.cream; e.currentTarget.style.borderColor = C.sage; }}
                                onMouseLeave={e => { e.currentTarget.style.color = `${C.cream}42`; e.currentTarget.style.borderColor = "#1E2C1E"; }}>
                                {key}
                            </a>
                        ))}
                    </div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 7.5, color: `${C.cream}25`, fontWeight: 600, letterSpacing: "0.06em" }}>BUILT WITH REACT + TS ✦</div>
                </div>
            </Wrap>
        </footer>
    );
}

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────

export default function Portfolio() {
    const [dark, setDark] = useState(false);
    const theme = makeTheme(dark);

    return (
        <div style={{ fontFamily: "var(--sans)", background: theme.bg, color: theme.text, minHeight: "100vh", transition: "background .3s, color .3s" }}>
            <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet" />

            <style>{`
        :root {
          --display: 'Syne', sans-serif;
          --sans:    'DM Sans', sans-serif;
          --mono:    'JetBrains Mono', monospace;
        }
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; overflow-x: hidden; }

        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes blink   { 0%,100% { opacity:1 } 50% { opacity:.28 } }

        @media (max-width: 820px) {
          .d-nav             { display: none !important; }
          .mob-btn           { display: flex !important; }
          .hero-grid         { grid-template-columns: 1fr !important; }
          .hero-card-wrap    { display: none !important; }
          .about-grid        { grid-template-columns: 1fr !important; }
          .proj-card         { grid-template-columns: 1fr !important; }
          .proj-card-visual  { display: none !important; }
          .form-grid         { grid-template-columns: 1fr !important; }
        }

        ::-webkit-scrollbar       { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #3D6B5235; border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: #3D6B5260; }

        ::selection { background: #3D6B5228; }
        :focus-visible { outline: 2px solid #3D6B52; outline-offset: 3px; border-radius: 4px; }

        input::placeholder,
        textarea::placeholder { color: rgba(232,240,222,0.32); }
      `}</style>

            <Navbar dark={dark} setDark={setDark} theme={theme} />
            <Hero dark={dark} theme={theme} />
            <Marquee />
            <Projects theme={theme} />
            <About dark={dark} theme={theme} />
            <Achievements dark={dark} theme={theme} />
            <Contact />
            <Footer dark={dark} />
        </div>
    );
}