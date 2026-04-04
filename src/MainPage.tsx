import {
    useState, useEffect, useRef,
    type ReactNode, type CSSProperties,
    startTransition,
} from "react";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

interface Theme {
    bg: string; bgAlt: string; bgCard: string;
    border: string; borderHi: string;
    text: string; textSub: string; textFaint: string;
}

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
// PALETTE  —  dark-first tech-noir + electric green
// ─────────────────────────────────────────────────────────────────

const K = {
    neon: "#1AFF6E",
    neonDim: "#0DB84E",
    neonDeep: "#07522A",
    violet: "#A855F7",
    amber: "#FFB830",
    coral: "#FF5B5B",
    cyan: "#22D3EE",
    // dark
    dBg: "#080C0A",
    dBgAlt: "#0D1410",
    dBgCard: "#111A13",
    dBorder: "#1C2B1E",
    dBorderHi: "#2F4A32",
    dText: "#E8F5E2",
    dSub: "#6B9970",
    dFaint: "#2D4430",
    // light
    lBg: "#F5FAF3",
    lBgAlt: "#ECF5E8",
    lBgCard: "#FFFFFF",
    lBorder: "#CDE3C5",
    lBorderHi: "#9DC490",
    lText: "#0F1F12",
    lSub: "#4A7A52",
    lFaint: "#CEEAD6",
} as const;

const CAT_ACC = {
    Leadership: K.neon,
    Technical: K.violet,
    Academic: K.amber,
    Competition: K.coral,
} as const;

const STACK_ACC = {
    Frontend: K.neon,
    Backend: K.violet,
    Database: K.coral,
    DevOps: K.cyan,
} as const;

const makeTheme = (dark: boolean): Theme => dark ? {
    bg: K.dBg, bgAlt: K.dBgAlt, bgCard: K.dBgCard,
    border: K.dBorder, borderHi: K.dBorderHi,
    text: K.dText, textSub: K.dSub, textFaint: K.dFaint,
} : {
    bg: K.lBg, bgAlt: K.lBgAlt, bgCard: K.lBgCard,
    border: K.lBorder, borderHi: K.lBorderHi,
    text: K.lText, textSub: K.lSub, textFaint: K.lFaint,
};

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────

const personal = {
    name: "Rendyll Ryan Cabardo",
    email: "rendyllcabardo11@gmail.com",
    location: "Bogo City, Cebu · PH",
    bio: "I build scalable systems and polished interfaces — from real-time network monitors to inventory platforms. My edge is bridging complex backend architecture with clean, intuitive frontends.",
    social: {
        github: { label: "GitHub", href: "https://github.com/rrndxx" },
        linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/rendyll/" },
        facebook: { label: "Facebook", href: "https://www.facebook.com/rendyllryan.cabardo" },
    },
};

const STATS = [
    { num: "21", label: "Years old", sub: "Apr 16, 2004" },
    { num: "2+", label: "Years exp", sub: "Full-stack" },
    { num: "2", label: "Projects", sub: "Shipped" },
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
        emoji: "🛡️", accent: K.neon, type: "Capstone", year: "2025–26",
        highlights: ["Real-time device monitoring", "Bandwidth analytics", "Remote admin panel", "Intrusion detection"],
    },
    {
        id: "everyshelf", number: "02",
        title: "Everyshelf", subtitle: "Inventory Management System",
        description: "End-to-end inventory platform — tracking stock batches, dispatching to customers, monitoring sales, and managing raw material supply from suppliers.",
        tags: ["Next.js", "Supabase", "TanStack Query", "Tailwind", "Shadcn"],
        emoji: "📦", accent: K.violet, type: "Systems Dev", year: "2024–25",
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

const MARQUEE_ITEMS = [
    "React", "TypeScript", "Next.js", "FastAPI", "PostgreSQL",
    "Docker", "Supabase", "TanStack Query", "Node.js", "Tailwind",
    "Redis", "ShadcnUI", "Python", "Express", "MySQL",
];

// ─────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────

function useInView(): [React.RefObject<HTMLDivElement | null>, boolean] {
    const ref = useRef<HTMLDivElement>(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVis(true); },
            { threshold: 0.07 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
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

function useTypewriter(words: string[], pause = 1800) {
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
            startTransition(() => {
                setDel(false); setIdx(i => (i + 1) % words.length);
                return;
            })
        }
        const t = setTimeout(() => setSub(s => del ? s - 1 : s + 1), del ? 42 : 85);
        return () => clearTimeout(t);
    }, [sub, del, idx, words, pause]);
    return words[idx].slice(0, sub);
}

// ─────────────────────────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────────────────────────

interface RevealProps { children: ReactNode; delay?: number; y?: number; x?: number; className?: string; style?: CSSProperties; }
function Reveal({ children, delay = 0, y = 28, x = 0, className, style: s }: RevealProps) {
    const [ref, vis] = useInView();
    return (
        <div ref={ref} className={className} style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : `translate(${x}px,${y}px)`,
            transition: `opacity .72s cubic-bezier(.22,1,.36,1) ${delay}s, transform .72s cubic-bezier(.22,1,.36,1) ${delay}s`,
            ...s,
        }}>{children}</div>
    );
}

function Chip({ children, accent, dark: d }: { children: ReactNode; accent?: string; dark?: boolean }) {
    const a = accent ?? K.neon;
    return (
        <span style={{
            display: "inline-block", fontSize: 9, fontWeight: 700,
            padding: "3px 9px", borderRadius: 99,
            letterSpacing: "0.07em", textTransform: "uppercase",
            fontFamily: "var(--mono)",
            background: d ? `${a}14` : `${a}20`,
            color: a, border: `1px solid ${a}30`,
        }}>{children}</span>
    );
}

// ─────────────────────────────────────────────────────────────────
// CURSOR GLOW  (dark mode only)
// ─────────────────────────────────────────────────────────────────

function CursorGlow({ dark }: { dark: boolean }) {
    const { x, y } = useMouse();
    if (!dark) return null;
    return (
        <div style={{
            position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 999,
            width: 500, height: 500, borderRadius: "50%",
            background: `radial-gradient(circle, ${K.neon}07 0%, transparent 68%)`,
            transform: `translate(${x - 250}px, ${y - 250}px)`,
            transition: "transform .08s linear",
            willChange: "transform",
        }} />
    );
}

// ─────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────

function Navbar({ dark, setDark, theme }: { dark: boolean; setDark: (v: boolean) => void; theme: Theme }) {
    const [menu, setMenu] = useState(false);
    const [active, setActive] = useState("Home");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const navBg = scrolled
        ? (dark ? "rgba(8,12,10,.97)" : "rgba(245,250,243,.97)")
        : "transparent";

    return (
        <nav style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
            background: navBg,
            backdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
            borderBottom: scrolled ? `1px solid ${theme.border}` : "1px solid transparent",
            transition: "all .3s ease",
        }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>

                <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                        width: 34, height: 34, borderRadius: 8,
                        background: `linear-gradient(135deg, ${K.neonDim}, ${K.neon})`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--mono)", fontSize: 9.5, fontWeight: 800,
                        color: K.dBg, letterSpacing: "0.03em", flexShrink: 0,
                        boxShadow: dark ? `0 0 16px ${K.neon}30` : "none",
                    }}>RRC</div>
                    <span style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 14, color: theme.text, letterSpacing: "-0.01em" }}>
                        rendyll<span style={{ color: K.neon }}>.dev</span>
                    </span>
                </a>

                <div className="d-nav" style={{ display: "flex", gap: 2 }}>
                    {NAV.map(l => (
                        <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setActive(l)} style={{
                            textDecoration: "none", fontSize: 12.5, fontWeight: 600,
                            padding: "6px 13px", borderRadius: 7, fontFamily: "var(--sans)",
                            color: active === l ? K.neon : theme.textSub,
                            background: active === l ? `${K.neon}12` : "transparent",
                            transition: "all .18s",
                        }}>{l}</a>
                    ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <button onClick={() => setDark(!dark)} aria-label="Toggle theme" style={{
                        width: 38, height: 21, borderRadius: 11,
                        background: dark ? K.neonDim : theme.border,
                        border: "none", cursor: "pointer", position: "relative", transition: "background .3s",
                    }}>
                        <div style={{
                            width: 15, height: 15, borderRadius: "50%",
                            background: dark ? K.dBg : "#fff",
                            position: "absolute", top: 3, left: dark ? 19 : 3, transition: "left .28s",
                        }} />
                    </button>

                    <a href="#contact" style={{
                        textDecoration: "none", fontFamily: "var(--sans)", fontSize: 12,
                        fontWeight: 700, padding: "7px 16px", borderRadius: 7,
                        background: dark ? `${K.neon}16` : K.neon,
                        color: dark ? K.neon : K.dBg,
                        border: `1.5px solid ${K.neon}55`,
                        letterSpacing: "0.02em", whiteSpace: "nowrap",
                        boxShadow: dark ? `0 0 18px ${K.neon}20` : "none",
                        transition: "all .18s",
                    }}
                        onMouseEnter={e => { e.currentTarget.style.background = K.neon; e.currentTarget.style.color = K.dBg; e.currentTarget.style.boxShadow = `0 0 28px ${K.neon}50`; }}
                        onMouseLeave={e => { e.currentTarget.style.background = dark ? `${K.neon}16` : K.neon; e.currentTarget.style.color = dark ? K.neon : K.dBg; e.currentTarget.style.boxShadow = dark ? `0 0 18px ${K.neon}20` : "none"; }}>
                        Hire Me
                    </a>

                    <button className="mob-btn" onClick={() => setMenu(m => !m)} style={{
                        display: "none", background: "none", border: "none",
                        cursor: "pointer", color: theme.text, fontSize: 19, padding: 3,
                    }}>{menu ? "✕" : "☰"}</button>
                </div>
            </div>

            {menu && (
                <div style={{ background: dark ? "rgba(8,12,10,.98)" : "rgba(245,250,243,.98)", backdropFilter: "blur(20px)", borderTop: `1px solid ${theme.border}`, padding: "8px 0 14px" }}>
                    {NAV.map(l => (
                        <a key={l} href={`#${l.toLowerCase()}`} onClick={() => { setActive(l); setMenu(false); }} style={{
                            display: "block", textDecoration: "none", fontFamily: "var(--sans)",
                            fontSize: 15, fontWeight: 600, padding: "11px clamp(1rem,4vw,2.5rem)",
                            color: active === l ? K.neon : theme.textSub,
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

function TypewriterRole() {
    const roles = ["Full-Stack Developer", "React Engineer", "FastAPI Builder", "UI/UX Craftsman", "4th Year BSIT"];
    const word = useTypewriter(roles);
    return (
        <span style={{ color: K.neon }}>
            {word}<span style={{ animation: "blink-cursor .7s step-end infinite", marginLeft: 1 }}>|</span>
        </span>
    );
}

function PhotoCard({ dark, theme }: { dark: boolean; theme: Theme }) {
    return (
        <div style={{ position: "relative", width: 272, height: 372, flexShrink: 0 }}>
            {dark && (
                <div style={{ position: "absolute", inset: -24, borderRadius: 36, background: `radial-gradient(ellipse, ${K.neon}15 0%, transparent 62%)`, filter: "blur(20px)", zIndex: 0 }} />
            )}
            <div style={{
                position: "relative", zIndex: 1, width: "100%", height: "100%",
                borderRadius: 22,
                border: `1.5px solid ${dark ? K.neon + "30" : theme.borderHi}`,
                background: dark ? `linear-gradient(160deg, #0D1F14, #0A1810)` : `linear-gradient(160deg, #E8F5E0, #D4EBCA)`,
                overflow: "hidden",
                boxShadow: dark ? `0 24px 80px ${K.neon}12, 0 0 0 1px ${K.neon}15` : `0 24px 60px rgba(0,0,0,.09)`,
            }}>
                {/* Grid overlay */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${theme.border} 1px, transparent 1px), linear-gradient(90deg, ${theme.border} 1px, transparent 1px)`, backgroundSize: "28px 28px", opacity: 0.3 }} />

                {/* Avatar */}
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0, paddingBottom: 64 }}>
                    <img src="/src/assets/corporate.png" alt="Rendyll" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, borderRadius: 22 }} />
                    {/* ↑ Replace with: <img src="/your-photo.jpg" alt="Rendyll" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0,borderRadius:22}} /> */}
                    <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 15.5, color: theme.text, letterSpacing: "-0.02em" }}>Rendyll Ryan</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: K.neon, marginTop: 5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Full-Stack Dev</div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: dark ? "rgba(8,12,10,.88)" : "rgba(245,250,243,.88)",
                    backdropFilter: "blur(12px)",
                    borderTop: `1px solid ${theme.border}`,
                    padding: "10px 15px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                    <div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 7.5, fontWeight: 700, color: K.neon, letterSpacing: "0.1em", textTransform: "uppercase" }}>Status</div>
                        <div style={{ fontFamily: "var(--sans)", fontSize: 11, fontWeight: 600, color: theme.text, marginTop: 1 }}>Open to Work 🟢</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 7.5, fontWeight: 700, color: theme.textSub, letterSpacing: "0.08em", textTransform: "uppercase" }}>Location</div>
                        <div style={{ fontFamily: "var(--sans)", fontSize: 11, fontWeight: 600, color: theme.text, marginTop: 1 }}>Cebu, PH 🇵🇭</div>
                    </div>
                </div>
            </div>

            {/* Floating badge — top right */}
            <div style={{
                position: "absolute", top: -12, right: -14, zIndex: 2,
                background: dark ? K.dBgCard : "#fff",
                border: `1.5px solid ${dark ? K.neon + "35" : theme.borderHi}`,
                borderRadius: 10, padding: "7px 12px",
                boxShadow: dark ? `0 0 20px ${K.neon}18, 0 8px 24px rgba(0,0,0,.5)` : `0 8px 22px rgba(0,0,0,.1)`,
            }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 7, fontWeight: 700, color: K.neon, letterSpacing: "0.1em", textTransform: "uppercase" }}>BSIT</div>
                <div style={{ fontFamily: "var(--display)", fontSize: 13, fontWeight: 800, color: theme.text, marginTop: 1 }}>4th Year</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 7, color: theme.textSub, marginTop: 1 }}>CRMC</div>
            </div>

            {/* Floating badge — bottom left */}
            <div style={{
                position: "absolute", bottom: 72, left: -16, zIndex: 2,
                background: dark ? K.dBgCard : "#fff",
                border: `1.5px solid ${K.neon}38`,
                borderRadius: 10, padding: "7px 12px",
                boxShadow: dark ? `0 0 16px ${K.neon}18, 0 8px 24px rgba(0,0,0,.5)` : `0 8px 22px rgba(0,0,0,.1)`,
            }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 7, fontWeight: 700, color: K.neon, letterSpacing: "0.1em", textTransform: "uppercase" }}>Dean's Lister</div>
                <div style={{ fontFamily: "var(--display)", fontSize: 12, fontWeight: 800, color: theme.text, marginTop: 1 }}>2023–2026 ⭐</div>
            </div>
        </div>
    );
}

function Hero({ dark, theme }: { dark: boolean; theme: Theme }) {
    return (
        <div id="home" style={{ position: "relative", overflow: "hidden", paddingTop: 62, minHeight: "100vh", display: "flex", alignItems: "center" }}>

            {/* BG effects */}
            {dark && (
                <>
                    <div style={{ position: "absolute", top: "-15%", left: "50%", transform: "translateX(-50%)", width: 900, height: 600, background: `radial-gradient(ellipse, ${K.neon}09 0%, transparent 65%)`, pointerEvents: "none", zIndex: 0 }} />
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${K.neon}05 1px, transparent 1px), linear-gradient(90deg, ${K.neon}05 1px, transparent 1px)`, backgroundSize: "60px 60px", zIndex: 0 }} />
                    <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${K.neon}025 2px, ${K.neon}025 4px)`, pointerEvents: "none", zIndex: 0 }} />
                </>
            )}

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(3rem,8vw,5rem) clamp(1rem,4vw,2.5rem)", width: "100%", position: "relative", zIndex: 1 }}>
                <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "clamp(2.5rem,6vw,5rem)", alignItems: "center" }}>

                    {/* Left */}
                    <div>
                        <Reveal delay={0}>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 8,
                                background: dark ? `${K.neon}10` : `${K.neonDim}15`,
                                border: `1px solid ${K.neon}35`, borderRadius: 99,
                                padding: "5px 14px 5px 9px", marginBottom: 28,
                            }}>
                                <span style={{ width: 7, height: 7, borderRadius: "50%", background: K.neon, display: "inline-block", animation: "pulse-dot 2s ease infinite", boxShadow: `0 0 8px ${K.neon}` }} />
                                <span style={{ fontFamily: "var(--mono)", fontSize: 10, fontWeight: 700, color: K.neon, letterSpacing: "0.1em", textTransform: "uppercase" }}>Available for projects & roles</span>
                            </div>
                        </Reveal>

                        <Reveal delay={0.08}>
                            <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, color: theme.textSub, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10 }}>
                                ⟶ Rendyll Ryan Cabardo
                            </div>
                            <h1 style={{
                                fontFamily: "var(--display)",
                                fontSize: "clamp(2.8rem, 7vw, 5rem)",
                                fontWeight: 800, lineHeight: 0.97,
                                letterSpacing: "-0.04em", margin: "0 0 18px", color: theme.text,
                            }}>
                                Building<br />
                                <TypewriterRole />
                            </h1>
                        </Reveal>

                        <Reveal delay={0.15}>
                            <p style={{
                                fontFamily: "var(--sans)", fontSize: "clamp(.9rem,1.5vw,1.05rem)",
                                lineHeight: 1.8, color: theme.textSub, maxWidth: 490, margin: "0 0 32px",
                            }}>
                                {personal.bio}
                            </p>
                        </Reveal>

                        <Reveal delay={0.21}>
                            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
                                <a href="#projects" style={{
                                    textDecoration: "none", fontFamily: "var(--sans)", fontWeight: 700, fontSize: 13.5,
                                    padding: "11px 26px", borderRadius: 8,
                                    background: K.neon, color: K.dBg, letterSpacing: "0.01em",
                                    boxShadow: `0 0 28px ${K.neon}35`,
                                    transition: "all .2s",
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 6px 36px ${K.neon}55`; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 0 28px ${K.neon}35`; }}>
                                    View Projects →
                                </a>
                                <a href="#contact" style={{
                                    textDecoration: "none", fontFamily: "var(--sans)", fontWeight: 700, fontSize: 13.5,
                                    padding: "10px 24px", borderRadius: 8,
                                    border: `1.5px solid ${theme.borderHi}`, color: theme.text,
                                    transition: "all .2s",
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = K.neon; e.currentTarget.style.color = K.neon; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = theme.borderHi; e.currentTarget.style.color = theme.text; }}>
                                    Get In Touch
                                </a>
                            </div>
                        </Reveal>

                        <Reveal delay={0.28}>
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                {STATS.map(({ num, label, sub }, i) => (
                                    <div key={label} style={{
                                        padding: "16px 24px",
                                        borderLeft: i === 0 ? "none" : `1px solid ${theme.border}`,
                                        ...(i === 0 ? { paddingLeft: 0 } : {}),
                                    }}>
                                        <div style={{ fontFamily: "var(--display)", fontSize: "clamp(1.5rem,2.5vw,2rem)", fontWeight: 800, color: K.neon, letterSpacing: "-0.04em", lineHeight: 1 }}>{num}</div>
                                        <div style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 600, color: theme.text, marginTop: 3 }}>{label}</div>
                                        <div style={{ fontFamily: "var(--mono)", fontSize: 8.5, color: theme.textSub, marginTop: 1, letterSpacing: "0.05em" }}>{sub}</div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* Photo */}
                    <Reveal delay={0.15} className="hero-photo">
                        <PhotoCard dark={dark} theme={theme} />
                    </Reveal>
                </div>

                {/* Scroll indicator */}
                <div style={{ position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700, color: theme.textSub, letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
                    <div style={{ width: 1, height: 38, background: `linear-gradient(to bottom, ${K.neon}, transparent)`, animation: "scroll-line 1.8s ease infinite" }} />
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────
// MARQUEE  — dual row, opposite directions
// ─────────────────────────────────────────────────────────────────

function Marquee({ dark }: { dark: boolean }) {
    const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
    const row = (rev: boolean) => (
        <div style={{ overflow: "hidden", padding: "7px 0" }}>
            <div style={{
                display: "flex", gap: 40, width: "max-content",
                animation: `${rev ? "marquee-rev" : "marquee"} 30s linear infinite`,
                fontFamily: "var(--mono)", fontSize: 9.5, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: rev ? (dark ? `${K.neon}55` : `${K.neonDim}50`) : K.neon,
            }}>
                {items.map((item, i) => (
                    <span key={i} style={{ display: "flex", alignItems: "center", gap: 40 }}>
                        {item}<span style={{ opacity: 0.3, fontSize: 5 }}>◆</span>
                    </span>
                ))}
            </div>
        </div>
    );
    return (
        <div style={{
            background: dark ? K.dBgAlt : K.lBgAlt,
            borderTop: `1px solid ${dark ? K.dBorder : K.lBorder}`,
            borderBottom: `1px solid ${dark ? K.dBorder : K.lBorder}`,
            padding: "2px 0",
        }}>
            {row(false)}
            <div style={{ height: 1, background: dark ? `${K.neon}10` : `${K.neonDim}14` }} />
            {row(true)}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────────

function Projects({ dark, theme }: { dark: boolean; theme: Theme }) {
    return (
        <div id="projects" style={{ padding: "clamp(4rem,9vw,7rem) 0" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)" }}>
                <Reveal>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(2rem,4vw,3.5rem)", flexWrap: "wrap", gap: 12 }}>
                        <div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: 10, fontWeight: 700, color: K.neon, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>
                                ⟶ 02 · Selected Work
                            </div>
                            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.04em", margin: 0, color: theme.text }}>Projects</h2>
                        </div>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: theme.textSub, letterSpacing: "0.1em", textTransform: "uppercase" }}>{PROJECTS.length} shipped</span>
                    </div>
                </Reveal>

                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.25rem,2.5vw,2rem)" }}>
                    {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} i={i} dark={dark} theme={theme} />)}
                </div>
            </div>
        </div>
    );
}

function ProjectCard({ p, i, dark, theme }: { p: Project; i: number; dark: boolean; theme: Theme }) {
    const [hov, setHov] = useState(false);
    return (
        <Reveal delay={i * 0.1}>
            <div className="proj-card"
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{
                    display: "grid", gridTemplateColumns: "1fr 280px",
                    borderRadius: 18,
                    border: `1.5px solid ${hov ? p.accent + "50" : theme.border}`,
                    background: hov && dark ? `linear-gradient(135deg, ${K.dBgCard}, ${p.accent}05)` : theme.bgCard,
                    overflow: "hidden",
                    transform: hov ? "translateY(-4px)" : "none",
                    boxShadow: hov
                        ? `0 20px 60px ${p.accent}16, 0 0 0 1px ${p.accent}18`
                        : (dark ? `0 2px 20px rgba(0,0,0,.4)` : `0 2px 16px rgba(0,0,0,.05)`),
                    transition: "all .3s cubic-bezier(.22,1,.36,1)",
                }}>

                {/* Text */}
                <div style={{ padding: "clamp(1.5rem,3.5vw,2.25rem)", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                        <span style={{
                            fontFamily: "var(--display)", fontSize: "clamp(2.5rem,5vw,3.5rem)",
                            fontWeight: 800, color: dark ? `${p.accent}18` : `${p.accent}16`,
                            letterSpacing: "-0.06em", lineHeight: 1, userSelect: "none",
                        }}>{p.number}</span>
                        <div>
                            <span style={{
                                fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700,
                                letterSpacing: "0.12em", textTransform: "uppercase",
                                color: p.accent, padding: "2px 8px", borderRadius: 4,
                                background: `${p.accent}14`, border: `1px solid ${p.accent}25`,
                            }}>{p.type}</span>
                            <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: theme.textSub, marginLeft: 8 }}>{p.year}</span>
                        </div>
                    </div>

                    <h3 style={{ fontFamily: "var(--display)", fontSize: "clamp(1.5rem,2.8vw,2.1rem)", fontWeight: 800, letterSpacing: "-0.04em", color: theme.text, margin: "0 0 4px", lineHeight: 1.05 }}>{p.title}</h3>
                    <p style={{ fontFamily: "var(--sans)", fontSize: 12.5, fontWeight: 600, color: p.accent, margin: "0 0 12px" }}>{p.subtitle}</p>
                    <p style={{ fontFamily: "var(--sans)", fontSize: 13.5, color: theme.textSub, lineHeight: 1.75, margin: "0 0 16px" }}>{p.description}</p>

                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px 12px" }}>
                        {p.highlights.map(h => (
                            <li key={h} style={{ fontFamily: "var(--sans)", fontSize: 12, color: theme.textSub, display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={{ color: p.accent, fontSize: 7, flexShrink: 0 }}>◆</span>{h}
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: "auto", marginBottom: 18 }}>
                        {p.tags.map(t => <Chip key={t} accent={p.accent} dark={dark}>{t}</Chip>)}
                    </div>

                    <button style={{
                        fontFamily: "var(--sans)", alignSelf: "flex-start",
                        padding: "9px 20px", borderRadius: 8, fontWeight: 700, fontSize: 12.5,
                        background: hov ? p.accent : "transparent",
                        color: hov ? (p.accent === K.neon ? K.dBg : "#fff") : theme.text,
                        border: `1.5px solid ${hov ? p.accent : theme.borderHi}`,
                        cursor: "pointer", transition: "all .22s",
                        boxShadow: hov ? `0 0 20px ${p.accent}40` : "none",
                    }}>View Project →</button>
                </div>

                {/* Visual */}
                <div className="proj-card-visual" style={{
                    background: dark
                        ? `linear-gradient(160deg, ${p.accent}0C, ${p.accent}18)`
                        : `linear-gradient(160deg, ${p.accent}08, ${p.accent}12)`,
                    borderLeft: `1.5px solid ${theme.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", overflow: "hidden",
                }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${p.accent}10 1px, transparent 1px), linear-gradient(90deg, ${p.accent}10 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
                    <div style={{ position: "absolute", top: -50, right: -50, width: 160, height: 160, borderRadius: "50%", background: `${p.accent}0C`, border: `1.5px solid ${p.accent}18` }} />
                    <div style={{ position: "absolute", bottom: -35, left: -35, width: 100, height: 100, borderRadius: "50%", background: `${p.accent}08` }} />
                    <div style={{ position: "relative", textAlign: "center" }}>
                        <div style={{ fontSize: 62, lineHeight: 1, filter: `drop-shadow(0 0 18px ${p.accent}50)` }}>{p.emoji}</div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 8.5, fontWeight: 700, color: p.accent, letterSpacing: "0.16em", textTransform: "uppercase", marginTop: 12, opacity: 0.65 }}>{p.id.toUpperCase()}</div>
                    </div>
                </div>
            </div>
        </Reveal>
    );
}

// ─────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────

function About({ dark, theme }: { dark: boolean; theme: Theme }) {
    const cats = Object.keys(STACK_ACC) as Array<keyof typeof STACK_ACC>;

    return (
        <div id="about" style={{
            background: dark ? K.dBgAlt : K.lBgAlt,
            borderTop: `1px solid ${theme.border}`,
            borderBottom: `1px solid ${theme.border}`,
            padding: "clamp(4rem,9vw,7rem) 0",
            position: "relative", overflow: "hidden",
        }}>
            {dark && <div style={{ position: "absolute", top: "30%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(ellipse, ${K.neon}04, transparent 65%)`, pointerEvents: "none" }} />}

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)", position: "relative", zIndex: 1 }}>
                <Reveal>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, fontWeight: 700, color: K.neon, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>⟶ 03 · About Me</div>
                    <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 clamp(2rem,4vw,3.5rem)", color: theme.text }}>
                        The person behind<br /><span style={{ color: K.neon }}>the code.</span>
                    </h2>
                </Reveal>

                <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,5rem)", alignItems: "start" }}>
                    {/* Left */}
                    <Reveal>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 15, color: theme.textSub, lineHeight: 1.82, marginBottom: 16 }}>{personal.bio}</p>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 15, color: theme.textSub, lineHeight: 1.82, marginBottom: 32 }}>
                            Based in Bogo City, Cebu. I approach every project with a systems-thinking mindset — whether it's architecting a real-time monitoring platform or building an inventory management system from scratch.
                        </p>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 28 }}>
                            {[
                                { k: "Age", v: "21 years old" },
                                { k: "Location", v: "Bogo City, Cebu" },
                                { k: "School", v: "CRMC" },
                                { k: "Course", v: "BSIT — 4th Year" },
                                { k: "Email", v: personal.email, sm: true },
                                { k: "Status", v: "Open to Work 🟢" },
                            ].map(({ k, v, sm }) => (
                                <div key={k} style={{
                                    padding: "11px 14px", borderRadius: 10,
                                    border: `1.5px solid ${theme.border}`, background: theme.bgCard,
                                    transition: "border-color .18s, box-shadow .18s",
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = K.neon + "45"; e.currentTarget.style.boxShadow = `0 0 12px ${K.neon}10`; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.boxShadow = ""; }}>
                                    <div style={{ fontFamily: "var(--mono)", fontSize: 7.5, fontWeight: 700, color: K.neon, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>{k}</div>
                                    <div style={{ fontFamily: "var(--sans)", fontSize: (sm ? 10 : 12.5), fontWeight: 600, color: theme.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {Object.values(personal.social).map(({ label, href }) => (
                                <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                                    textDecoration: "none", fontFamily: "var(--sans)", fontSize: 12.5, fontWeight: 700,
                                    padding: "8px 16px", borderRadius: 8,
                                    border: `1.5px solid ${theme.borderHi}`, color: theme.textSub,
                                    transition: "all .18s",
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = K.neon; e.currentTarget.style.color = K.neon; e.currentTarget.style.background = `${K.neon}0E`; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = theme.borderHi; e.currentTarget.style.color = theme.textSub; e.currentTarget.style.background = "transparent"; }}>
                                    {label} ↗
                                </a>
                            ))}
                        </div>
                    </Reveal>

                    {/* Right: stack */}
                    <Reveal delay={0.1}>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700, color: theme.textSub, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 18 }}>Tech Stack</div>
                        {cats.map(cat => (
                            <div key={cat} style={{ marginBottom: 20 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: STACK_ACC[cat], boxShadow: dark ? `0 0 8px ${STACK_ACC[cat]}` : "none", display: "inline-block", flexShrink: 0 }} />
                                    <span style={{ fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700, color: STACK_ACC[cat], textTransform: "uppercase", letterSpacing: "0.1em" }}>{cat}</span>
                                </div>
                                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                                    {TECH.filter(t => t.cat === cat).map(({ name }) => (
                                        <span key={name} style={{
                                            fontFamily: "var(--sans)", fontSize: 12, fontWeight: 600,
                                            padding: "4px 11px", borderRadius: 6,
                                            border: `1.5px solid ${theme.border}`, color: theme.text,
                                            background: dark ? `${STACK_ACC[cat]}08` : `${STACK_ACC[cat]}06`,
                                            cursor: "default", transition: "all .18s",
                                        }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = STACK_ACC[cat]; e.currentTarget.style.color = STACK_ACC[cat]; e.currentTarget.style.background = `${STACK_ACC[cat]}12`; }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.text; e.currentTarget.style.background = dark ? `${STACK_ACC[cat]}08` : `${STACK_ACC[cat]}06`; }}>
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────
// ACHIEVEMENTS
// ─────────────────────────────────────────────────────────────────

function Achievements({ dark, theme }: { dark: boolean; theme: Theme }) {
    return (
        <div id="achievements" style={{ padding: "clamp(4rem,9vw,7rem) 0" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)" }}>
                <Reveal>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, fontWeight: 700, color: K.neon, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>⟶ 04 · Recognition</div>
                    <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 clamp(2rem,4vw,3rem)", color: theme.text }}>
                        Awards & Achievements
                    </h2>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,258px), 1fr))", gap: 10 }}>
                    {ACHIEVEMENTS.map((a, i) => <AchievCard key={a.title} a={a} i={i} dark={dark} theme={theme} />)}
                </div>
            </div>
        </div>
    );
}

function AchievCard({ a, i, dark, theme }: { a: Achievement; i: number; dark: boolean; theme: Theme }) {
    const acc = CAT_ACC[a.cat];
    return (
        <Reveal delay={i * 0.04}>
            <div style={{
                padding: "18px", borderRadius: 14,
                border: `1.5px solid ${theme.border}`, background: theme.bgCard,
                position: "relative", overflow: "hidden", height: "100%",
                boxSizing: "border-box", transition: "all .22s",
            }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = acc + "50"; e.currentTarget.style.boxShadow = `0 8px 28px ${acc}16`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.boxShadow = ""; }}>

                <div style={{ position: "absolute", top: 0, right: 0, width: 50, height: 50, borderRadius: "0 14px 0 50px", background: `${acc}10` }} />
                {dark && <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle at top right, ${acc}12, transparent 70%)`, pointerEvents: "none" }} />}

                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 13,
                    fontFamily: "var(--mono)", fontSize: 7, fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: acc, padding: "2px 7px", borderRadius: 4,
                    background: `${acc}14`, border: `1px solid ${acc}25`,
                }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: acc, display: "inline-block", boxShadow: dark ? `0 0 5px ${acc}` : "none" }} />
                    {a.cat}
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{a.icon}</div>
                    <div style={{ minWidth: 0 }}>
                        <h3 style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 12.5, color: theme.text, margin: "0 0 3px", lineHeight: 1.4 }}>{a.title}</h3>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 11, color: theme.textSub, margin: "0 0 7px" }}>{a.org}</p>
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
function Contact({ dark, theme }: { dark: boolean; theme: Theme }) {
    const [focused, setFocused] = useState<string | null>(null);
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const iStyle = (id: string): CSSProperties => ({
        fontFamily: "var(--sans)", width: "100%",
        padding: "11px 14px", borderRadius: 8, fontSize: 13.5,
        border: `1.5px solid ${focused === id ? K.neon + "55" : theme.border}`,
        background: focused === id ? `${K.neon}06` : theme.bgCard,
        color: theme.text, outline: "none", boxSizing: "border-box",
        fontWeight: 500, transition: "border-color .18s, background .18s",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.message) {
            alert("Please fill all required fields");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/.netlify/functions/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Failed");

            setSent(true);
            setForm({ name: "", email: "", subject: "", message: "" });

            setTimeout(() => setSent(false), 3200);
        } catch {
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="contact" style={{ background: dark ? K.dBg : K.lBg }}>
            <form onSubmit={handleSubmit}>

                {/* NAME + EMAIL */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        style={iStyle("name")}
                    />

                    <input
                        type="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        style={iStyle("email")}
                    />
                </div>

                {/* SUBJECT */}
                <input
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    onFocus={() => setFocused("sub")}
                    onBlur={() => setFocused(null)}
                    style={{ ...iStyle("sub"), marginTop: 9 }}
                />

                {/* MESSAGE */}
                <textarea
                    rows={4}
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("msg")}
                    onBlur={() => setFocused(null)}
                    style={{ ...iStyle("msg"), marginTop: 9, resize: "vertical" }}
                />

                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        marginTop: 14,
                        width: "100%",
                        padding: "13px",
                        borderRadius: 9,
                        fontWeight: 800,
                        border: "none",
                        cursor: "pointer",
                        background: sent ? theme.borderHi : K.neon,
                        color: sent ? theme.text : K.dBg,
                        boxShadow: sent ? "none" : `0 0 28px ${K.neon}40`,
                    }}
                >
                    {loading ? "Sending..." : sent ? "Message Sent! ✓" : "Send Message →"}
                </button>

            </form>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────

function Footer() {
    return (
        <footer style={{ background: "#050807", borderTop: "1px solid #182418", padding: "22px 0" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 6, background: `linear-gradient(135deg, ${K.neonDim}, ${K.neon})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 7.5, fontWeight: 800, color: K.dBg }}>RRC</div>
                    <span style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 600, color: "rgba(232,245,226,.3)" }}>Rendyll Ryan Cabardo © 2026</span>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                    {Object.values(personal.social).map(({ label, href }) => (
                        <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                            fontFamily: "var(--sans)", textDecoration: "none", fontSize: 11, fontWeight: 600,
                            padding: "5px 11px", borderRadius: 6, border: "1px solid #1C2C1C",
                            color: "rgba(232,245,226,.28)", transition: "all .18s",
                        }}
                            onMouseEnter={e => { e.currentTarget.style.color = K.neon; e.currentTarget.style.borderColor = K.neon + "45"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "rgba(232,245,226,.28)"; e.currentTarget.style.borderColor = "#1C2C1C"; }}>
                            {label}
                        </a>
                    ))}
                </div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 7.5, color: "rgba(232,245,226,.18)", fontWeight: 600, letterSpacing: "0.08em" }}>BUILT WITH REACT + TS ✦</div>
            </div>
        </footer>
    );
}

// ─────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────

export default function Portfolio() {
    const [dark, setDark] = useState(true);
    const theme = makeTheme(dark);

    return (
        <div style={{ fontFamily: "var(--sans)", background: theme.bg, color: theme.text, minHeight: "100vh", transition: "background .3s, color .3s" }}>
            <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet" />

            <style>{`
        :root {
          --display: 'Syne', sans-serif;
          --sans: 'DM Sans', sans-serif;
          --mono: 'JetBrains Mono', monospace;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; overflow-x: hidden; }

        @keyframes marquee     { from { transform: translateX(0)   } to { transform: translateX(-50%) } }
        @keyframes marquee-rev { from { transform: translateX(-50%) } to { transform: translateX(0)   } }
        @keyframes pulse-dot   { 0%,100% { box-shadow: 0 0 8px ${K.neon}; opacity:1 } 50% { box-shadow: 0 0 20px ${K.neon}; opacity:.6 } }
        @keyframes blink-cursor { 0%,50% { opacity:1 } 51%,100% { opacity:0 } }
        @keyframes scroll-line  { 0% { opacity:0; transform:scaleY(0); transform-origin:top } 40% { opacity:1; transform:scaleY(1) } 80%,100% { opacity:0; transform:scaleY(1); transform-origin:bottom } }

        ::-webkit-scrollbar       { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${K.neon}28; border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: ${K.neon}50; }

        ::selection { background: ${K.neon}25; }
        :focus-visible { outline: 2px solid ${K.neon}; outline-offset: 3px; border-radius: 4px; }

        input::placeholder, textarea::placeholder { color: rgba(107,153,112,.4); }

        @media (max-width: 820px) {
          .d-nav            { display: none !important; }
          .mob-btn          { display: flex !important; }
          .hero-grid        { grid-template-columns: 1fr !important; }
          .hero-photo       { display: none !important; }
          .about-grid       { grid-template-columns: 1fr !important; }
          .proj-card        { grid-template-columns: 1fr !important; }
          .proj-card-visual { display: none !important; }
          .contact-grid     { grid-template-columns: 1fr !important; }
          .form-grid        { grid-template-columns: 1fr !important; }
        }
      `}</style>

            <CursorGlow dark={dark} />
            <Navbar dark={dark} setDark={setDark} theme={theme} />
            <Hero dark={dark} theme={theme} />
            <Marquee dark={dark} />
            <Projects dark={dark} theme={theme} />
            <About dark={dark} theme={theme} />
            <Achievements dark={dark} theme={theme} />
            <Contact dark={dark} theme={theme} />
            <Footer />
        </div>
    );
}