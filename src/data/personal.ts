import { Boxes, Workflow } from "lucide-react"
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiReactquery,
  SiFastapi,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiFirebase,
  SiSupabase,
  SiDocker,
} from "react-icons/si"

export const personal = {
  name: "Rendyll Ryan Cabardo",
  initials: "R",
  role: "Full-Stack Developer",
  email: "rendyllcabardo11@gmail.com",
  location: "Bogo City, Cebu",
  locationShort: "Cebu, PH",
  age: 22,
  availability: "Open to junior roles, internships, and freelance projects",
  headline: "Building reliable systems and polished interfaces.",
  bio: "BSIT graduate (Magna Cum Laude) from CRMC. I build full-stack systems ranging from real-time network monitors to inventory platforms — with a focus on clean architecture and clear interfaces.",
  bioLong:
    "I graduated Magna Cum Laude in Bachelor of Science in Information Technology from Cebu Roosevelt Memorial Colleges. I have hands-on experience across React, TypeScript, FastAPI, PostgreSQL, Supabase, and Docker. I enjoy the full path from database design and REST APIs to responsive UIs — especially for tools that help people work with better visibility and control.",
  education: "BSIT, Magna Cum Laude — CRMC · 2026",
  birthDate: "April 16, 2004",
  socials: [
    { label: "GitHub", href: "https://github.com/rrndxx" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rendyll/" },
    { label: "Facebook", href: "https://www.facebook.com/rendyllryan.cabardo" },
  ],
}

export const navItems = ["Home", "Projects", "About", "Achievements", "Contact"]

export const roles = [
  "Full-Stack Developer",
  "Frontend Engineer",
  "FastAPI Specialist",
  "Systems Thinker",
]

export const stats = [
  { value: "2.5+", label: "Years building" },
  { value: "3", label: "Major projects" },
  { value: "MCL", label: "Graduated" },
  { value: "24h", label: "Typical reply" },
]

export const skills = [
  {
    group: "Frontend",
    items: [
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "shadcn/ui", icon: SiShadcnui },
      { name: "TanStack Query", icon: SiReactquery },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "FastAPI", icon: SiFastapi },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "PHP", icon: SiPhp },
      { name: "Python", icon: SiPython },
    ],
  },
  {
    group: "Data",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "Redis", icon: SiRedis },
      { name: "Firebase", icon: SiFirebase },
      { name: "Supabase", icon: SiSupabase },
    ],
  },
  {
    group: "Workflow",
    items: [
      { name: "Docker", icon: SiDocker },
      { name: "REST APIs", icon: Workflow },
      { name: "UI systems", icon: Boxes },
      { name: "Product thinking", icon: Workflow },
    ],
  },
]

export const achievements = [
  {
    title: "Magna Cum Laude Graduate",
    organization: "CRMC",
    year: "2026",
    category: "Academic",
  },
  {
    title: "CSE-Professional Passer",
    organization: "Civil Service Commission",
    year: "2026",
    category: "Professional",
  },
  {
    title: "Consistent Dean's List Scholar",
    organization: "CRMC",
    year: "2022–2026",
    category: "Academic",
  },
  {
    title: "Full-Stack Developer of the Year",
    organization: "CRMC",
    year: "2026",
    category: "Technical",
  },
  {
    title: "Leadership Awardee",
    organization: "CRMC",
    year: "2026",
    category: "Leadership",
  },
  {
    title: "Outstanding Intern as Developer",
    organization: "CRMC",
    year: "2026",
    category: "Professional",
  },
  {
    title: "Multimedia Wizard Awardee",
    organization: "CRMC",
    year: "2026",
    category: "Technical",
  },
  {
    title: "Best in PC Troubleshooting",
    organization: "CRMC",
    year: "2026",
    category: "Technical",
  },
  {
    title: "Networking Excellence Awardee",
    organization: "CRMC",
    year: "2026",
    category: "Technical",
  },
  {
    title: "5th Placer — National ISITE Quiz Bowl",
    organization: "PSITE",
    year: "2025",
    category: "Competition",
  },
  {
    title: "5th Placer — CESAFI Computer Quiz Bowl",
    organization: "CESAFI",
    year: "2025",
    category: "Competition",
  },
  {
    title: "2nd Placer — Sci-Math Quiz Bowl",
    organization: "CRMC",
    year: "2026",
    category: "Competition",
  },
  {
    title: "2nd Placer — Word Warpathon",
    organization: "CRMC",
    year: "2026",
    category: "Competition",
  },


]
