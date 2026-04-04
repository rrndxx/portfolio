import {
    useState, useEffect, useRef, useCallback,
    type ReactNode, type CSSProperties,
    startTransition,
} from "react";
import corporate from "./assets/corporate.png";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

interface Project {
    id: string; title: string; subtitle: string; description: string;
    tags: string[]; emoji: string; accent: string;
    type: string; year: string; highlights: string[]; number: string;
}
interface Achievement {
    title: string; org: string; year: string;
    icon: string; cat: keyof typeof CAT_ACC;
}

// ─────────────────────────────────────────────────────────────────
// PALETTE — Warm editorial dark
// ─────────────────────────────────────────────────────────────────

const C = {
    gold: "#C9A84C",
    goldBright: "#F0C060",
    goldDim: "#8A6E30",
    goldDeep: "#3A2A10",
    cream: "#F5EDD8",
    creamDim: "#C8B898",
    bg: "#0A0906",
    bgAlt: "#0F0D09",
    bgCard: "#141008",
    border: "#1E1A10",
    borderHi: "#2E2818",
    textMain: "#EDE8DC",
    textSub: "#8C8070",
    textFaint: "#2A2418",
    red: "#C0504A",
    teal: "#4A9C8C",
    lilac: "#9880C8",
} as const;

const CAT_ACC = {
    Leadership: C.gold,
    Technical: C.teal,
    Academic: C.goldBright,
    Competition: C.red,
} as const;

const STACK_ACC = {
    Frontend: C.gold,
    Backend: C.teal,
    Database: C.red,
    DevOps: C.lilac,
} as const;

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────

const personal = {
    name: "Rendyll Ryan Cabardo",
    email: "rendyllcabardo11@gmail.com",
    location: "Bogo City, Cebu · PH",
    bio: "I build scalable systems and polished interfaces — from real-time network monitors to inventory platforms. My edge is bridging complex backend architecture with clean, intuitive frontends.",
    bio2: "Based in Bogo City, Cebu. I approach every project with a systems-thinking mindset — whether architecting a real-time monitoring platform or building an inventory system from scratch.",
    social: {
        github: { label: "GitHub", href: "https://github.com/rrndxx" },
        linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/rendyll/" },
        facebook: { label: "Facebook", href: "https://www.facebook.com/rendyllryan.cabardo" },
    },
};

const STATS = [
    { num: "21", label: "Years Old", sub: "Apr 16, 2004" },
    { num: "2+", label: "Years Exp", sub: "Full-stack" },
    { num: "2", label: "Shipped", sub: "Projects" },
    { num: "4th", label: "Year", sub: "BSIT · CRMC" },
];

const TECH: { name: string; cat: keyof typeof STACK_ACC }[] = [
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
        id: "netdetect", number: "01",
        title: "NetDetect", subtitle: "Network Monitoring System",
        description: "Centralized network monitoring for CRMC — tackling unauthorized device access, bandwidth tracking, and remote admin control. Strengthens campus security and operational efficiency.",
        tags: ["React", "TypeScript", "FastAPI", "Docker", "Redis", "PostgreSQL", "Express", "Tailwind"],
        emoji: "🛡️", accent: C.gold, type: "Capstone", year: "2025–26",
        highlights: ["Real-time device monitoring", "Bandwidth analytics", "Remote admin panel", "Intrusion detection"],
    },
    {
        id: "everyshelf", number: "02",
        title: "Everyshelf", subtitle: "Inventory Management System",
        description: "End-to-end inventory platform — tracking stock batches, dispatching to customers, monitoring sales, and managing raw material supply from suppliers.",
        tags: ["Next.js", "Supabase", "TanStack Query", "Tailwind", "Shadcn"],
        emoji: "📦", accent: C.teal, type: "Systems Dev", year: "2024–25",
        highlights: ["Batch dispatching", "Sales dashboard", "Supplier tracking", "Live inventory sync"],
    },
];

const ACHIEVEMENTS: Achievement[] = [
    { title: "CCSO 2nd Year Representative", org: "CRMC", year: "2023–24", icon: "🎓", cat: "Leadership" },
    { title: "CCSO VP Academics", org: "CRMC", year: "2024–25", icon: "🏛️", cat: "Leadership" },
    { title: "CCSO 4th Year Representative", org: "CRMC", year: "2025–26", icon: "🎓", cat: "Leadership" },
    { title: "Full-Stack Dev — SAD", org: "CRMC", year: "2024–25", icon: "💻", cat: "Technical" },
    { title: "Full-Stack Dev — Capstone", org: "CRMC", year: "2025–26", icon: "🚀", cat: "Technical" },
    { title: "Dean's Lister", org: "CRMC", year: "2023–26", icon: "⭐", cat: "Academic" },
    { title: "CESAFI Quiz Bowl — 5th", org: "CESAFI", year: "2024–25", icon: "🏆", cat: "Competition" },
    { title: "ISITE Quiz Bowl — 5th", org: "ISITE", year: "2024–25", icon: "🏆", cat: "Competition" },
];

const NAV = ["Home", "Projects", "About", "Achievements", "Contact"];
const ROLES = ["Software Developer", "Frontend Engineer", "FastAPI Builder", "UI/UX Craftsman", "System Architect", "Tech-Solver"];
const MARQUEE = ["React", "TypeScript", "Next.js", "FastAPI", "PostgreSQL", "Docker", "Supabase", "TanStack Query", "Node.js", "Tailwind", "Redis", "Python", "Express", "MySQL", "ShadcnUI"];

// ─────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────

function useInView(threshold = 0.06): [React.RefObject<HTMLDivElement | null>, boolean] {
    const ref = useRef<HTMLDivElement>(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, vis];
}

function useMouse() {
    const [pos, setPos] = useState({ x: -999, y: -999 });
    useEffect(() => {
        const fn = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", fn, { passive: true });
        return () => window.removeEventListener("mousemove", fn);
    }, []);
    return pos;
}

function useTypewriter(words: string[], pause = 2000) {
    const [idx, setIdx] = useState(0);
    const [sub, setSub] = useState(0);
    const [del, setDel] = useState(false);
    useEffect(() => {
        const word = words[idx];
        if (!del && sub === word.length) {
            const t = setTimeout(() => setDel(true), pause);
            return () => clearTimeout(t);
        }
        if (del && sub === 0) {
            startTransition(() => { setDel(false); setIdx(i => (i + 1) % words.length); });
            return;
        }
        const t = setTimeout(() => setSub(s => del ? s - 1 : s + 1), del ? 35 : 75);
        return () => clearTimeout(t);
    }, [sub, del, idx, words, pause]);
    return words[idx].slice(0, sub);
}

function useScrollY() {
    const [y, setY] = useState(0);
    useEffect(() => {
        const fn = () => setY(window.scrollY);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);
    return y;
}

// ─────────────────────────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, y = 40, x = 0, className, style: s }: {
    children: ReactNode; delay?: number; y?: number; x?: number; className?: string; style?: CSSProperties;
}) {
    const [ref, vis] = useInView();
    return (
        <div ref={ref} className={className} style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : `translate(${x}px,${y}px)`,
            transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}s, transform .9s cubic-bezier(.16,1,.3,1) ${delay}s`,
            ...s,
        }}>{children}</div>
    );
}

function W({ children, style: s, id, className }: { children: ReactNode; style?: CSSProperties; id?: string; className?: string }) {
    return (
        <div id={id} className={className} style={{ maxWidth: 1140, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", ...s }}>
            {children}
        </div>
    );
}

function EyebrowLabel({ children, accent = C.gold }: { children: ReactNode; accent?: string }) {
    return (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ width: 1.5, height: 32, background: `linear-gradient(to bottom, transparent, ${accent})`, borderRadius: 1 }} />
            <span style={{ fontFamily: "var(--mono)", fontSize: 9, fontWeight: 700, color: accent, letterSpacing: "0.28em", textTransform: "uppercase" }}>
                {children}
            </span>
        </div>
    );
}

function Tag({ children, accent = C.gold }: { children: ReactNode; accent?: string }) {
    return (
        <span style={{
            display: "inline-block", fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700,
            padding: "3px 10px", borderRadius: 3,
            letterSpacing: "0.1em", textTransform: "uppercase",
            background: `${accent}12`, color: accent, border: `1px solid ${accent}28`,
        }}>{children}</span>
    );
}

// ─────────────────────────────────────────────────────────────────
// CURSOR
// ─────────────────────────────────────────────────────────────────

function Cursor() {
    const { x, y } = useMouse();
    return (
        <>
            {/* Soft radial aura */}
            <div style={{
                position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 998,
                width: 700, height: 700, borderRadius: "50%",
                background: `radial-gradient(circle, ${C.gold}05 0%, transparent 60%)`,
                transform: `translate(${x - 350}px, ${y - 350}px)`,
                transition: "transform .08s linear",
            }} />
            {/* Dot */}
            <div style={{
                position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 999,
                width: 6, height: 6, borderRadius: "50%", background: C.gold,
                transform: `translate(${x - 3}px, ${y - 3}px)`,
                transition: "transform .04s linear",
                boxShadow: `0 0 12px ${C.gold}`,
            }} />
        </>
    );
}

// ─────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────

function Navbar() {
    const [menu, setMenu] = useState(false);
    const [active, setActive] = useState("Home");
    const scrollY = useScrollY();
    const scrolled = scrollY > 60;

    useEffect(() => {
        const sections = NAV.map(n => document.getElementById(n.toLowerCase()));
        const fn = () => {
            const current = sections.findIndex(s => {
                if (!s) return false;
                const r = s.getBoundingClientRect();
                return r.top <= 100 && r.bottom > 100;
            });
            if (current !== -1) setActive(NAV[current]);
        };
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const progress = Math.min((scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)) * 100, 100);

    return (
        <nav style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
            background: scrolled ? "rgba(10,9,6,.95)" : "transparent",
            backdropFilter: scrolled ? "blur(32px)" : "none",
            borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
            transition: "all .45s cubic-bezier(.16,1,.3,1)",
        }}>
            <W style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
                {/* Logo */}
                <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                        width: 38, height: 38, borderRadius: 0,
                        background: `linear-gradient(135deg, ${C.goldDeep} 0%, ${C.goldDim} 100%)`,
                        border: `1px solid ${C.gold}40`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--display)", fontSize: 11, fontWeight: 700,
                        color: C.gold, letterSpacing: "0.06em",
                        boxShadow: `0 0 24px ${C.gold}18, inset 0 1px 0 ${C.gold}20`,
                        flexShrink: 0,
                    }}>RRC</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <span style={{
                            fontFamily: "var(--display)",
                            fontWeight: 700,
                            fontSize: 14,
                            color: C.textMain,
                            letterSpacing: "-0.01em",
                            lineHeight: 1
                        }}>
                            rendyll
                        </span>
                        <span style={{
                            fontFamily: "var(--mono)",
                            fontSize: 7.5,
                            color: C.gold,
                            letterSpacing: "0.22em"
                        }}>
                            .dev
                        </span>
                    </div>
                </a>

                {/* Desktop links */}
                <div className="d-nav" style={{ display: "flex", gap: 0, alignItems: "center" }}>
                    {NAV.map(l => (
                        <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setActive(l)} style={{
                            textDecoration: "none", fontSize: 11.5, fontWeight: 600,
                            padding: "8px 16px", fontFamily: "var(--sans)",
                            color: active === l ? C.gold : C.textSub,
                            position: "relative", transition: "color .2s",
                            letterSpacing: "0.03em",
                        }}>
                            {l}
                            {active === l && <div style={{
                                position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
                                width: 4, height: 4, borderRadius: "50%", background: C.gold,
                                boxShadow: `0 0 8px ${C.gold}`,
                            }} />}
                        </a>
                    ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <a href="#contact" style={{
                        textDecoration: "none", fontFamily: "var(--mono)", fontSize: 10, fontWeight: 700,
                        padding: "9px 22px", letterSpacing: "0.12em", textTransform: "uppercase",
                        border: `1px solid ${C.gold}50`, color: C.gold,
                        background: "transparent", borderRadius: 0,
                        transition: "all .2s",
                        boxShadow: `inset 0 0 0 0 ${C.gold}`,
                    }}
                        onMouseEnter={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.bg; e.currentTarget.style.boxShadow = `0 0 32px ${C.gold}40`; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.gold; e.currentTarget.style.boxShadow = ""; }}>
                        Hire Me
                    </a>
                    <button className="mob-btn" onClick={() => setMenu(m => !m)} style={{
                        display: "none", background: "none", border: "none",
                        cursor: "pointer", color: C.textMain, fontSize: 20, padding: 4, flexShrink: 0,
                    }}>{menu ? "✕" : "☰"}</button>
                </div>
            </W>

            {/* Gold progress bar */}
            <div style={{
                height: 1.5,
                background: `linear-gradient(90deg, ${C.goldDim}, ${C.goldBright}, ${C.goldDim})`,
                width: `${progress}%`,
                transition: "width .12s linear",
                boxShadow: `0 0 10px ${C.gold}70`,
            }} />

            {menu && (
                <div style={{
                    background: "rgba(10,9,6,.98)", backdropFilter: "blur(24px)",
                    borderTop: `1px solid ${C.border}`, padding: "8px 0 18px",
                }}>
                    {NAV.map(l => (
                        <a key={l} href={`#${l.toLowerCase()}`} onClick={() => { setActive(l); setMenu(false); }} style={{
                            display: "block", textDecoration: "none", fontFamily: "var(--sans)",
                            fontSize: 16, fontWeight: 600, padding: "14px clamp(1.25rem,5vw,3rem)",
                            color: active === l ? C.gold : C.textSub,
                            borderLeft: active === l ? `2px solid ${C.gold}` : "2px solid transparent",
                            transition: "all .15s",
                        }}>{l}</a>
                    ))}
                </div>
            )}
        </nav>
    );
}

// ─────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────

function TypeRole() {
    const word = useTypewriter(ROLES);
    const LONGEST = "Full-Stack Developer";
    return (
        <span style={{ color: C.gold, position: "relative", display: "block" }}>
            <span aria-hidden style={{ visibility: "hidden", userSelect: "none" }}>{LONGEST}</span>
            <span style={{ position: "absolute", left: 0, top: 0, display: "inline-flex", alignItems: "baseline", gap: 1 }}>
                {word}
                <span style={{ animation: "blink .75s step-end infinite", lineHeight: 1, marginLeft: 2 }}>|</span>
            </span>
        </span>
    );
}

function Hero() {
    const scrollY = useScrollY();

    return (
        <div id="home" style={{ minHeight: "100svh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 68 }}>

            {/* Decorative BG */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                {/* Large warm vignette top */}
                <div style={{ position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)", width: 1200, height: 800, background: `radial-gradient(ellipse, ${C.gold}06 0%, transparent 55%)`, pointerEvents: "none" }} />
                {/* Fine grain texture via repeating */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${C.gold}03 1px, transparent 1px)`, backgroundSize: "32px 32px", pointerEvents: "none" }} />
                {/* Diagonal gold line accent */}
                <div style={{ position: "absolute", top: 0, right: "12%", width: 1, height: "65%", background: `linear-gradient(to bottom, transparent, ${C.gold}15, transparent)` }} />
                <div style={{ position: "absolute", top: 0, right: "calc(12% + 6px)", width: 1, height: "40%", background: `linear-gradient(to bottom, transparent, ${C.gold}08, transparent)` }} />
                {/* Bottom corner accent */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}20 40%, ${C.gold}20 60%, transparent)` }} />
            </div>

            <W style={{ position: "relative", zIndex: 1, padding: "clamp(3rem,8vw,6rem) clamp(1.25rem,5vw,3rem)" }}>
                <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "clamp(3rem,6vw,6rem)", alignItems: "center" }}>

                    {/* LEFT */}
                    <div>
                        {/* Status */}
                        <Reveal delay={0}>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 32,
                                background: `${C.gold}0A`, border: `1px solid ${C.gold}25`,
                                padding: "7px 16px 7px 12px", borderRadius: 0,
                            }}>
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 8px #4ADE80", animation: "pulse 2s ease infinite", display: "inline-block" }} />
                                <span style={{ fontFamily: "var(--mono)", fontSize: 9, fontWeight: 700, color: C.creamDim, letterSpacing: "0.16em", textTransform: "uppercase" }}>Available for projects & roles</span>
                            </div>
                        </Reveal>

                        {/* Name badge */}
                        <Reveal delay={0.05}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                                <div style={{ height: 1, width: 40, background: C.gold, opacity: 0.6 }} />
                                <span style={{ fontFamily: "var(--mono)", fontSize: 9, fontWeight: 700, color: C.textSub, letterSpacing: "0.2em", textTransform: "uppercase" }}>Rendyll Ryan Cabardo</span>
                            </div>
                        </Reveal>

                        {/* Main heading */}
                        <Reveal delay={0.1}>
                            <h1 style={{
                                fontFamily: "var(--display)",
                                fontSize: "clamp(3.2rem,8vw,5.8rem)",
                                fontWeight: 700, lineHeight: 0.92, letterSpacing: "-0.04em",
                                margin: "0 0 28px", color: C.textMain,
                                width: "max-content", maxWidth: "100%",
                            }}>
                                Building<br />
                                <TypeRole />
                            </h1>
                        </Reveal>

                        {/* Bio */}
                        <Reveal delay={0.16}>
                            <p style={{ fontFamily: "var(--sans)", fontSize: "clamp(.95rem,1.5vw,1.05rem)", lineHeight: 1.85, color: C.textSub, maxWidth: 480, margin: "0 0 38px" }}>
                                {personal.bio}
                            </p>
                        </Reveal>

                        {/* CTAs */}
                        <Reveal delay={0.22}>
                            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 56 }}>
                                <a href="#projects" style={{
                                    textDecoration: "none", fontFamily: "var(--mono)", fontWeight: 700,
                                    fontSize: 10, padding: "14px 32px", letterSpacing: "0.14em", textTransform: "uppercase",
                                    background: C.gold, color: C.bg, border: `1px solid ${C.gold}`,
                                    transition: "all .25s",
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.gold; e.currentTarget.style.boxShadow = `0 0 32px ${C.gold}30`; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.bg; e.currentTarget.style.boxShadow = ""; }}>
                                    View Work
                                </a>
                                <a href="#contact" style={{
                                    textDecoration: "none", fontFamily: "var(--mono)", fontWeight: 700,
                                    fontSize: 10, padding: "13px 30px", letterSpacing: "0.14em", textTransform: "uppercase",
                                    border: `1px solid ${C.borderHi}`, color: C.textSub,
                                    transition: "all .25s",
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.gold}60`; e.currentTarget.style.color = C.gold; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderHi; e.currentTarget.style.color = C.textSub; }}>
                                    Get In Touch
                                </a>
                            </div>
                        </Reveal>

                        {/* Stats */}
                        <Reveal delay={0.28}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 0, borderTop: `1px solid ${C.border}`, paddingTop: 28 }}>
                                {STATS.map(({ num, label, sub }, i) => (
                                    <div key={label} style={{
                                        padding: i === 0 ? "0 36px 0 0" : "0 36px",
                                        borderRight: i < STATS.length - 1 ? `1px solid ${C.border}` : "none",
                                    }}>
                                        <div style={{ fontFamily: "var(--display)", fontSize: "clamp(1.6rem,2.8vw,2.4rem)", fontWeight: 700, color: C.gold, letterSpacing: "-0.04em", lineHeight: 1 }}>{num}</div>
                                        <div style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 600, color: C.textMain, marginTop: 5 }}>{label}</div>
                                        <div style={{ fontFamily: "var(--mono)", fontSize: 8, color: C.textSub, marginTop: 2, letterSpacing: "0.1em" }}>{sub}</div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* RIGHT — Photo */}
                    <Reveal delay={0.12} className="hero-photo">
                        <HeroPhoto scrollY={scrollY} />
                    </Reveal>
                </div>

                {/* Scroll cue */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginTop: 80, opacity: scrollY > 100 ? 0 : 0.6, transition: "opacity .4s" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 7.5, color: C.textSub, letterSpacing: "0.24em", textTransform: "uppercase" }}>Scroll</span>
                    <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${C.gold}, transparent)`, animation: "scrollBar 2.2s ease infinite" }} />
                </div>
            </W>
        </div>
    );
}

function HeroPhoto({ scrollY }: { scrollY: number }) {
    const parallax = scrollY * 0.12;
    return (
        <div style={{ position: "relative", width: 300, margin: "0 auto" }}>
            {/* Decorative frame lines */}
            <div style={{ position: "absolute", top: -16, left: -16, width: 60, height: 60, borderTop: `1.5px solid ${C.gold}60`, borderLeft: `1.5px solid ${C.gold}60`, zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -16, right: -16, width: 60, height: 60, borderBottom: `1.5px solid ${C.gold}60`, borderRight: `1.5px solid ${C.gold}60`, zIndex: 2, pointerEvents: "none" }} />

            {/* Gold glow behind */}
            <div style={{ position: "absolute", inset: -30, background: `radial-gradient(ellipse, ${C.gold}12 0%, transparent 65%)`, filter: "blur(20px)", zIndex: 0 }} />

            {/* Main image */}
            <div style={{
                position: "relative", zIndex: 1,
                border: `1px solid ${C.gold}22`,
                overflow: "hidden",
                boxShadow: `0 40px 100px rgba(0,0,0,.7), 0 0 0 1px ${C.gold}10`,
                transform: `translateY(${-parallax}px)`,
                transition: "transform .05s linear",
            }}>
                <img src={corporate} alt="Rendyll Ryan Cabardo" style={{ width: "100%", display: "block", filter: "brightness(0.95) contrast(1.05)" }} />

                {/* Warm photo overlay tint */}
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 50%, ${C.bg}CC)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.gold}04, transparent 50%)`, pointerEvents: "none" }} />

                {/* Bottom status overlay */}
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "rgba(10,9,6,.92)", backdropFilter: "blur(20px)",
                    borderTop: `1px solid ${C.border}`,
                    padding: "14px 18px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                    <div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 7, color: C.gold, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 3 }}>Status</div>
                        <div style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 700, color: C.textMain, display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ADE80", display: "inline-block", boxShadow: "0 0 6px #4ADE80" }} />
                            Open to Work
                        </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 7, color: C.textSub, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 3 }}>Location</div>
                        <div style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 700, color: C.textMain }}>Cebu, PH 🇵🇭</div>
                    </div>
                </div>
            </div>

            {/* Floating badge: BSIT */}
            <div style={{
                position: "absolute", top: -20, right: -24, zIndex: 3,
                background: C.bgCard, border: `1px solid ${C.gold}35`,
                padding: "10px 15px",
                boxShadow: `0 8px 32px rgba(0,0,0,.7), 0 0 20px ${C.gold}15`,
                animation: "floatA 4.5s ease-in-out infinite",
            }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 7, color: C.gold, letterSpacing: "0.14em", textTransform: "uppercase" }}>BSIT</div>
                <div style={{ fontFamily: "var(--display)", fontSize: 15, fontWeight: 700, color: C.textMain, marginTop: 2 }}>4th Year</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 7.5, color: C.textSub, marginTop: 2 }}>CRMC</div>
            </div>

            {/* Floating badge: Dean's Lister */}
            <div style={{
                position: "absolute", left: -28, top: "44%", zIndex: 3, transform: "translateY(-50%)",
                background: C.bgCard, border: `1px solid ${C.gold}30`,
                padding: "10px 14px",
                boxShadow: `0 8px 28px rgba(0,0,0,.65), 0 0 16px ${C.gold}12`,
                animation: "floatB 5.5s ease-in-out infinite",
            }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 7, color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase" }}>Dean's Lister</div>
                <div style={{ fontFamily: "var(--display)", fontSize: 13, fontWeight: 700, color: C.textMain, marginTop: 2 }}>2023–2026 ⭐</div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────
// MARQUEE
// ─────────────────────────────────────────────────────────────────

function MarqueeBanner() {
    const items = [...MARQUEE, ...MARQUEE, ...MARQUEE];
    const row = (rev: boolean, dim?: boolean) => (
        <div style={{ overflow: "hidden", padding: "9px 0" }}>
            <div style={{
                display: "flex", gap: 56, width: "max-content",
                animation: `${rev ? "mRev" : "mFwd"} 38s linear infinite`,
                fontFamily: "var(--mono)", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: dim ? `${C.gold}35` : `${C.gold}65`,
            }}>
                {items.map((item, i) => (
                    <span key={i} style={{ display: "flex", alignItems: "center", gap: 56 }}>
                        {item}<span style={{ fontSize: 4, opacity: 0.3 }}>✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
    return (
        <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.bgAlt }}>
            {row(false)}
            <div style={{ height: 1, background: `${C.gold}10` }} />
            {row(true, true)}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────────

function Projects() {
    return (
        <div id="projects" style={{ padding: "clamp(5rem,10vw,8rem) 0" }}>
            <W>
                <Reveal>
                    <EyebrowLabel>02 · Selected Work</EyebrowLabel>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(2.5rem,5vw,4rem)", flexWrap: "wrap", gap: 16 }}>
                        <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 700, letterSpacing: "-0.04em", margin: 0, color: C.textMain, lineHeight: 1 }}>
                            Projects
                        </h2>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 8.5, color: C.textSub, letterSpacing: "0.18em", textTransform: "uppercase" }}>{PROJECTS.length} shipped</span>
                    </div>
                </Reveal>

                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {PROJECTS.map((p, i) => <ProjectRow key={p.id} p={p} i={i} />)}
                </div>
            </W>
        </div>
    );
}

function ProjectRow({ p, i }: { p: Project; i: number }) {
    const [hov, setHov] = useState(false);
    const isEven = i % 2 === 0;

    return (
        <Reveal delay={i * 0.08}>
            <div
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                className="proj-row"
                style={{
                    display: "grid",
                    gridTemplateColumns: isEven ? "1fr 380px" : "380px 1fr",
                    borderTop: `1px solid ${hov ? `${p.accent}30` : C.border}`,
                    transition: "border-color .3s",
                    padding: "clamp(2.5rem,5vw,4rem) 0",
                    gap: "clamp(2rem,4vw,5rem)",
                    alignItems: "center",
                    cursor: "default",
                }}>

                {/* Visual panel */}
                {!isEven && (
                    <div className="proj-visual" style={{
                        position: "relative", height: 280, overflow: "hidden",
                        border: `1px solid ${hov ? `${p.accent}40` : C.border}`,
                        transition: "all .4s cubic-bezier(.16,1,.3,1)",
                        transform: hov ? "scale(1.01)" : "scale(1)",
                    }}>
                        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${p.accent}10, ${p.accent}1A)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: 72, filter: `drop-shadow(0 0 28px ${p.accent}60)`, lineHeight: 1 }}>{p.emoji}</div>
                                <div style={{ fontFamily: "var(--mono)", fontSize: 8, color: p.accent, letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 16, opacity: 0.7 }}>{p.type} · {p.year}</div>
                            </div>
                        </div>
                        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${p.accent}08 1px, transparent 1px), linear-gradient(90deg, ${p.accent}08 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
                        {/* Big number watermark */}
                        <div style={{ position: "absolute", bottom: -20, right: 16, fontFamily: "var(--display)", fontSize: 120, fontWeight: 700, color: `${p.accent}06`, lineHeight: 1, userSelect: "none" }}>{p.number}</div>
                    </div>
                )}

                {/* Text content */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                        <span style={{ fontFamily: "var(--display)", fontSize: "clamp(2.5rem,4.5vw,4rem)", fontWeight: 700, color: `${p.accent}16`, letterSpacing: "-0.06em", lineHeight: 1 }}>{p.number}</span>
                        <div>
                            <Tag accent={p.accent}>{p.type}</Tag>
                            <div style={{ fontFamily: "var(--mono)", fontSize: 8.5, color: C.textSub, marginTop: 4 }}>{p.year}</div>
                        </div>
                    </div>

                    <h3 style={{ fontFamily: "var(--display)", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, letterSpacing: "-0.04em", color: hov ? p.accent : C.textMain, margin: "0 0 6px", transition: "color .3s" }}>{p.title}</h3>
                    <p style={{ fontFamily: "var(--sans)", fontSize: 13, fontWeight: 600, color: p.accent, margin: "0 0 18px", opacity: 0.8 }}>{p.subtitle}</p>
                    <p style={{ fontFamily: "var(--sans)", fontSize: 14, color: C.textSub, lineHeight: 1.8, margin: "0 0 20px" }}>{p.description}</p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px", marginBottom: 22 }}>
                        {p.highlights.map(h => (
                            <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontFamily: "var(--sans)", fontSize: 12.5, color: C.textSub }}>
                                <span style={{ color: p.accent, marginTop: 3, fontSize: 6, flexShrink: 0 }}>◆</span>{h}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 24 }}>
                        {p.tags.map(t => <Tag key={t} accent={p.accent}>{t}</Tag>)}
                    </div>

                    <button style={{
                        fontFamily: "var(--mono)", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
                        textTransform: "uppercase", padding: "10px 24px",
                        background: hov ? p.accent : "transparent",
                        color: hov ? C.bg : C.textSub,
                        border: `1px solid ${hov ? p.accent : C.borderHi}`,
                        cursor: "pointer", transition: "all .22s",
                        boxShadow: hov ? `0 0 24px ${p.accent}35` : "none",
                    }}>View Project →</button>
                </div>

                {/* Visual panel (even rows on right) */}
                {isEven && (
                    <div className="proj-visual" style={{
                        position: "relative", height: 280, overflow: "hidden",
                        border: `1px solid ${hov ? `${p.accent}40` : C.border}`,
                        transition: "all .4s cubic-bezier(.16,1,.3,1)",
                        transform: hov ? "scale(1.01)" : "scale(1)",
                    }}>
                        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${p.accent}10, ${p.accent}1A)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: 72, filter: `drop-shadow(0 0 28px ${p.accent}60)`, lineHeight: 1 }}>{p.emoji}</div>
                                <div style={{ fontFamily: "var(--mono)", fontSize: 8, color: p.accent, letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 16, opacity: 0.7 }}>{p.type} · {p.year}</div>
                            </div>
                        </div>
                        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${p.accent}08 1px, transparent 1px), linear-gradient(90deg, ${p.accent}08 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
                        <div style={{ position: "absolute", bottom: -20, right: 16, fontFamily: "var(--display)", fontSize: 120, fontWeight: 700, color: `${p.accent}06`, lineHeight: 1, userSelect: "none" }}>{p.number}</div>
                    </div>
                )}
            </div>
        </Reveal>
    );
}

// ─────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────

function About() {
    const cats = Object.keys(STACK_ACC) as Array<keyof typeof STACK_ACC>;
    return (
        <div id="about" style={{ background: C.bgAlt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "clamp(5rem,10vw,8rem) 0", position: "relative", overflow: "hidden" }}>
            {/* BG accents */}
            <div style={{ position: "absolute", top: "15%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(ellipse, ${C.gold}04, transparent 60%)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 380, height: 380, borderRadius: "50%", background: `radial-gradient(ellipse, ${C.teal}04, transparent 60%)`, pointerEvents: "none" }} />

            <W style={{ position: "relative", zIndex: 1 }}>
                <Reveal>
                    <EyebrowLabel>03 · About Me</EyebrowLabel>
                    <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 700, letterSpacing: "-0.04em", margin: "0 0 clamp(2.5rem,5vw,4.5rem)", color: C.textMain, lineHeight: 1.05 }}>
                        The person behind<br /><span style={{ color: C.gold }}>the code.</span>
                    </h2>
                </Reveal>

                <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,6vw,6rem)", alignItems: "start" }}>
                    {/* Left */}
                    <Reveal>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 15, color: C.textSub, lineHeight: 1.9, marginBottom: 20 }}>{personal.bio}</p>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 15, color: C.textSub, lineHeight: 1.9, marginBottom: 38 }}>{personal.bio2}</p>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 32 }}>
                            {[
                                { k: "Age", v: "21 years old" }, { k: "Location", v: "Bogo City, Cebu" },
                                { k: "School", v: "CRMC" }, { k: "Course", v: "BSIT — 4th Year" },
                                { k: "Email", v: personal.email, sm: true }, { k: "Status", v: "Open to Work 🟢" },
                            ].map(({ k, v, sm }) => (
                                <div key={k} style={{
                                    padding: "13px 15px",
                                    border: `1px solid ${C.border}`, background: C.bgCard,
                                    transition: "border-color .2s, transform .2s",
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.gold}40`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = ""; }}>
                                    <div style={{ fontFamily: "var(--mono)", fontSize: 7, fontWeight: 700, color: C.gold, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 5 }}>{k}</div>
                                    <div style={{ fontFamily: "var(--sans)", fontSize: sm ? 10.5 : 13, fontWeight: 600, color: C.textMain, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {Object.values(personal.social).map(({ label, href }) => (
                                <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                                    textDecoration: "none", fontFamily: "var(--mono)", fontSize: 9, fontWeight: 700,
                                    padding: "10px 20px", letterSpacing: "0.1em", textTransform: "uppercase",
                                    border: `1px solid ${C.borderHi}`, color: C.textSub, transition: "all .18s",
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.gold}55`; e.currentTarget.style.color = C.gold; e.currentTarget.style.background = `${C.gold}08`; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderHi; e.currentTarget.style.color = C.textSub; e.currentTarget.style.background = "transparent"; }}>
                                    {label} ↗
                                </a>
                            ))}
                        </div>
                    </Reveal>

                    {/* Right: Tech */}
                    <Reveal delay={0.1}>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700, color: C.textSub, textTransform: "uppercase", letterSpacing: "0.22em", marginBottom: 24 }}>Tech Stack</div>
                        {cats.map(cat => (
                            <div key={cat} style={{ marginBottom: 24 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                                    <div style={{ width: 1, height: 20, background: STACK_ACC[cat] }} />
                                    <span style={{ fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700, color: STACK_ACC[cat], textTransform: "uppercase", letterSpacing: "0.14em" }}>{cat}</span>
                                </div>
                                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                    {TECH.filter(t => t.cat === cat).map(({ name }) => (
                                        <span key={name} style={{
                                            fontFamily: "var(--sans)", fontSize: 12.5, fontWeight: 600,
                                            padding: "5px 13px",
                                            border: `1px solid ${C.border}`, color: C.textSub,
                                            background: `${STACK_ACC[cat]}06`,
                                            cursor: "default", transition: "all .18s",
                                        }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = `${STACK_ACC[cat]}55`; e.currentTarget.style.color = STACK_ACC[cat]; e.currentTarget.style.background = `${STACK_ACC[cat]}12`; e.currentTarget.style.transform = "translateY(-1px)"; }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSub; e.currentTarget.style.background = `${STACK_ACC[cat]}06`; e.currentTarget.style.transform = ""; }}>
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </W>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────
// ACHIEVEMENTS
// ─────────────────────────────────────────────────────────────────

function Achievements() {
    const [filter, setFilter] = useState<string>("All");
    const cats = ["All", ...Array.from(new Set(ACHIEVEMENTS.map(a => a.cat)))];
    const filtered = filter === "All" ? ACHIEVEMENTS : ACHIEVEMENTS.filter(a => a.cat === filter);

    return (
        <div id="achievements" style={{ padding: "clamp(5rem,10vw,8rem) 0" }}>
            <W>
                <Reveal>
                    <EyebrowLabel>04 · Recognition</EyebrowLabel>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(2rem,4vw,3.5rem)", flexWrap: "wrap", gap: 16 }}>
                        <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 700, letterSpacing: "-0.04em", margin: 0, color: C.textMain }}>Awards &<br />Achievements</h2>
                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                            {cats.map(c => {
                                const isActive = filter === c;
                                const acc = c === "All" ? C.gold : CAT_ACC[c as keyof typeof CAT_ACC];
                                return (
                                    <button key={c} onClick={() => setFilter(c)} style={{
                                        fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700,
                                        padding: "6px 14px", letterSpacing: "0.1em", textTransform: "uppercase",
                                        background: isActive ? acc : "transparent",
                                        color: isActive ? C.bg : C.textSub,
                                        border: `1px solid ${isActive ? acc : C.border}`,
                                        cursor: "pointer", transition: "all .18s",
                                    }}>{c}</button>
                                );
                            })}
                        </div>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,250px),1fr))", gap: 1, border: `1px solid ${C.border}` }}>
                    {filtered.map((a, i) => <AchievCard key={a.title} a={a} i={i} />)}
                </div>
            </W>
        </div>
    );
}

function AchievCard({ a, i }: { a: Achievement; i: number }) {
    const acc = CAT_ACC[a.cat];
    return (
        <Reveal delay={i * 0.035}>
            <div style={{
                padding: "22px 24px",
                background: C.bgCard,
                position: "relative", overflow: "hidden",
                borderRight: `1px solid ${C.border}`,
                transition: "background .22s",
                height: "100%", boxSizing: "border-box",
            }}
                onMouseEnter={e => { e.currentTarget.style.background = `${acc}06`; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.bgCard; }}>

                {/* Top accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `${acc}40` }} />

                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 5, marginBottom: 16,
                    fontFamily: "var(--mono)", fontSize: 7, fontWeight: 700,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: acc, padding: "3px 8px",
                    background: `${acc}10`, border: `1px solid ${acc}25`,
                }}>{a.cat}</div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }}>{a.icon}</div>
                    <div style={{ minWidth: 0 }}>
                        <h3 style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 13.5, color: C.textMain, margin: "0 0 4px", lineHeight: 1.4 }}>{a.title}</h3>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 12, color: C.textSub, margin: "0 0 8px" }}>{a.org}</p>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700, color: acc, letterSpacing: "0.06em" }}>{a.year}</span>
                    </div>
                </div>
            </div>
        </Reveal>
    );
}

// ─────────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────────

function Contact() {
    const [focused, setFocused] = useState<string | null>(null);
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

    const iStyle = useCallback((id: string): CSSProperties => ({
        fontFamily: "var(--sans)", width: "100%",
        padding: "13px 16px", fontSize: 14,
        border: `1px solid ${focused === id ? `${C.gold}55` : C.border}`,
        background: focused === id ? `${C.gold}05` : C.bgCard,
        color: C.textMain, outline: "none",
        boxSizing: "border-box", fontWeight: 500, borderRadius: 0,
        transition: "border-color .2s, background .2s",
    }), [focused]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) { alert("Please fill all required fields"); return; }
        try {
            setLoading(true);
            const res = await fetch("/.netlify/functions/send-email", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Failed");
            setSent(true);
            setForm({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setSent(false), 3500);
        } catch {
            alert("Something went wrong. Please try again.");
        } finally { setLoading(false); }
    };

    return (
        <div id="contact" style={{ background: C.bgAlt, borderTop: `1px solid ${C.border}`, padding: "clamp(5rem,10vw,8rem) 0", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)", width: 900, height: 600, background: `radial-gradient(ellipse, ${C.gold}06 0%, transparent 55%)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${C.gold}02 1px, transparent 1px)`, backgroundSize: "28px 28px", pointerEvents: "none" }} />

            <W style={{ position: "relative", zIndex: 1 }}>
                <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,6vw,6rem)", alignItems: "start" }}>
                    {/* Left */}
                    <Reveal>
                        <EyebrowLabel>05 · Contact</EyebrowLabel>
                        <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 700, letterSpacing: "-0.04em", margin: "0 0 22px", color: C.textMain, lineHeight: 1.0 }}>
                            Got a project<br />in <span style={{ color: C.gold }}>mind?</span>
                        </h2>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 15, color: C.textSub, lineHeight: 1.85, marginBottom: 40, maxWidth: 380 }}>
                            Open to freelance projects, internships, and full-time roles. Let's build something great together.
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
                            {[
                                { icon: "✉", label: "Email", value: personal.email, href: `mailto:${personal.email}` },
                                { icon: "📍", label: "Location", value: personal.location },
                                { icon: "⚡", label: "Response", value: "Usually within 24h" },
                            ].map(({ icon, label, value, href }) => (
                                <div key={label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                    <div style={{
                                        width: 44, height: 44, flexShrink: 0,
                                        background: `${C.gold}0C`, border: `1px solid ${C.gold}22`,
                                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                                    }}>{icon}</div>
                                    <div>
                                        <div style={{ fontFamily: "var(--mono)", fontSize: 7, fontWeight: 700, color: C.goldDim, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 3 }}>{label}</div>
                                        {href ? (
                                            <a href={href} style={{ fontFamily: "var(--sans)", fontSize: 13.5, fontWeight: 600, color: C.textMain, textDecoration: "none", transition: "color .18s" }}
                                                onMouseEnter={e => e.currentTarget.style.color = C.gold}
                                                onMouseLeave={e => e.currentTarget.style.color = C.textMain}>{value}</a>
                                        ) : (
                                            <div style={{ fontFamily: "var(--sans)", fontSize: 13.5, fontWeight: 600, color: C.textMain }}>{value}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: 7.5, fontWeight: 700, color: C.textSub, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 14 }}>Find me online</div>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                {Object.values(personal.social).map(({ label, href }) => (
                                    <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                                        textDecoration: "none", fontFamily: "var(--mono)", fontSize: 9, fontWeight: 700,
                                        padding: "10px 20px", letterSpacing: "0.1em", textTransform: "uppercase",
                                        border: `1px solid ${C.borderHi}`, color: C.textSub, transition: "all .18s",
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.gold}55`; e.currentTarget.style.color = C.gold; e.currentTarget.style.background = `${C.gold}08`; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderHi; e.currentTarget.style.color = C.textSub; e.currentTarget.style.background = "transparent"; }}>
                                        {label} ↗
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {/* Right: Form */}
                    <Reveal delay={0.1}>
                        <form onSubmit={handleSubmit} style={{
                            background: C.bgCard,
                            border: `1px solid ${C.border}`,
                            padding: "clamp(1.5rem,4vw,2.5rem)",
                            boxShadow: `0 32px 80px rgba(0,0,0,.5), 0 0 0 1px ${C.gold}08`,
                        }}>
                            <div style={{ fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700, color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 22, display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 20, height: 1, background: C.gold }} />
                                Send a message
                            </div>

                            <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                                <div>
                                    <label style={{ fontFamily: "var(--mono)", fontSize: 7, fontWeight: 700, color: C.textSub, textTransform: "uppercase", letterSpacing: "0.14em", display: "block", marginBottom: 7 }}>Name *</label>
                                    <input type="text" placeholder="John Doe" value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                                        style={iStyle("name")} />
                                </div>
                                <div>
                                    <label style={{ fontFamily: "var(--mono)", fontSize: 7, fontWeight: 700, color: C.textSub, textTransform: "uppercase", letterSpacing: "0.14em", display: "block", marginBottom: 7 }}>Email *</label>
                                    <input type="email" placeholder="you@example.com" value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                                        style={iStyle("email")} />
                                </div>
                            </div>

                            <div style={{ marginBottom: 10 }}>
                                <label style={{ fontFamily: "var(--mono)", fontSize: 7, fontWeight: 700, color: C.textSub, textTransform: "uppercase", letterSpacing: "0.14em", display: "block", marginBottom: 7 }}>Subject</label>
                                <input type="text" placeholder="Project inquiry, collaboration..." value={form.subject}
                                    onChange={e => setForm({ ...form, subject: e.target.value })}
                                    onFocus={() => setFocused("sub")} onBlur={() => setFocused(null)}
                                    style={iStyle("sub")} />
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <label style={{ fontFamily: "var(--mono)", fontSize: 7, fontWeight: 700, color: C.textSub, textTransform: "uppercase", letterSpacing: "0.14em", display: "block", marginBottom: 7 }}>Message *</label>
                                <textarea rows={5} placeholder="Tell me about your project or opportunity..." value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)}
                                    style={{ ...iStyle("msg"), resize: "vertical" }} />
                            </div>

                            <button type="submit" disabled={loading} style={{
                                fontFamily: "var(--mono)", width: "100%", padding: "14px 24px",
                                fontWeight: 700, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
                                border: `1px solid ${sent ? C.teal : C.gold}`,
                                cursor: loading ? "not-allowed" : "pointer",
                                background: sent ? C.teal : C.gold,
                                color: C.bg,
                                boxShadow: sent ? `0 0 24px ${C.teal}30` : `0 0 28px ${C.gold}30`,
                                transition: "all .25s", opacity: loading ? 0.7 : 1,
                            }}>
                                {loading ? "Sending…" : sent ? "✓ Message Sent!" : "Send Message →"}
                            </button>

                            <p style={{ fontFamily: "var(--mono)", fontSize: 8.5, color: C.textSub, marginTop: 16, textAlign: "center", letterSpacing: "0.06em" }}>
                                Or reach me at{" "}
                                <a href={`mailto:${personal.email}`} style={{ color: C.gold, textDecoration: "none", fontWeight: 700 }}>{personal.email}</a>
                            </p>
                        </form>
                    </Reveal>
                </div>
            </W>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────

function Footer() {
    return (
        <footer style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "28px 0" }}>
            <W style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                        width: 30, height: 30, background: `${C.gold}12`, border: `1px solid ${C.gold}28`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--display)", fontSize: 9, fontWeight: 700, color: C.gold,
                    }}>RRC</div>
                    <span style={{ fontFamily: "var(--sans)", fontSize: 12.5, color: C.textSub }}>
                        Rendyll Ryan Cabardo © 2026
                    </span>
                </div>

                <div style={{ display: "flex", gap: 6 }}>
                    {Object.values(personal.social).map(({ label, href }) => (
                        <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                            fontFamily: "var(--mono)", textDecoration: "none", fontSize: 8, fontWeight: 700,
                            padding: "5px 12px", letterSpacing: "0.1em", textTransform: "uppercase",
                            border: `1px solid ${C.border}`, color: C.textSub, transition: "all .18s",
                        }}
                            onMouseEnter={e => { e.currentTarget.style.color = C.gold; e.currentTarget.style.borderColor = `${C.gold}40`; }}
                            onMouseLeave={e => { e.currentTarget.style.color = C.textSub; e.currentTarget.style.borderColor = C.border; }}>
                            {label}
                        </a>
                    ))}
                </div>

                <div style={{ fontFamily: "var(--mono)", fontSize: 7.5, color: `${C.textSub}60`, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Built with React + TypeScript ✦
                </div>
            </W>
        </footer>
    );
}

// ─────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────

export default function Portfolio() {
    return (
        <div style={{ fontFamily: "var(--sans)", background: C.bg, color: C.textMain, minHeight: "100vh" }}>
            <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600;9..144,700&family=Instrument+Sans:wght@400;500;600;700&family=Fira+Code:wght@500;600;700&display=swap" rel="stylesheet" />

            <style>{`
        :root {
          --display: 'Fraunces', Georgia, serif;
          --sans:    'Instrument Sans', system-ui, sans-serif;
          --mono:    'Fira Code', 'Courier New', monospace;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; overflow-x: hidden; background: ${C.bg}; cursor: none; }

        @keyframes mFwd   { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
        @keyframes mRev   { from { transform: translateX(-33.333%) } to { transform: translateX(0) } }
        @keyframes blink  { 0%,48% { opacity:1 } 52%,100% { opacity:0 } }
        @keyframes pulse  { 0%,100% { opacity:1; box-shadow: 0 0 6px #4ADE80 } 50% { opacity:.5; box-shadow: 0 0 18px #4ADE80 } }
        @keyframes scrollBar { 0% { opacity:0; transform:scaleY(0); transform-origin:top } 45% { opacity:1; transform:scaleY(1) } 80%,100% { opacity:0; transform-origin:bottom } }
        @keyframes floatA { 0%,100% { transform: translateY(0) rotate(-0.5deg) } 50% { transform: translateY(-8px) rotate(0.5deg) } }
        @keyframes floatB { 0%,100% { transform: translateY(-50%) rotate(0.5deg) } 50% { transform: translateY(calc(-50% - 8px)) rotate(-0.5deg) } }

        ::-webkit-scrollbar       { width: 3px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.gold}30; border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.gold}55; }
        ::selection { background: ${C.gold}28; color: ${C.gold}; }
        :focus-visible { outline: 1.5px solid ${C.gold}; outline-offset: 3px; }
        input::placeholder, textarea::placeholder { color: ${C.textSub}55; }

        @media (max-width: 860px) {
          .d-nav           { display: none !important; }
          .mob-btn         { display: flex !important; }
          .hero-grid       { grid-template-columns: 1fr !important; }
          .hero-photo      { display: none !important; }
          .about-grid      { grid-template-columns: 1fr !important; }
          .proj-row        { grid-template-columns: 1fr !important; }
          .proj-visual     { display: none !important; }
          .contact-grid    { grid-template-columns: 1fr !important; }
          .form-grid       { grid-template-columns: 1fr !important; }
        }
      `}</style>

            <Cursor />
            <Navbar />
            <Hero />
            <MarqueeBanner />
            <Projects />
            <About />
            <Achievements />
            <Contact />
            <Footer />
        </div>
    );
}