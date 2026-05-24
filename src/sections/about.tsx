import { Code2, GraduationCap, MapPin } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { personal, skills } from "@/data/personal"

export function About() {
  return (
    <section id="about" className="border-t border-border bg-card/20 py-24 md:py-32">
      <Container className="space-y-14">

        <Reveal>
          <SectionHeading
            eyebrow="About"
            title="The developer behind the work."
            description="A quick look at who I am, where I am based, and what I know how to build."
          />
        </Reveal>

        {/* ── Bento grid ──────────────────────────────────── */}
        <div className="grid gap-4 md:grid-cols-12">

          {/* Bio — 8 cols */}
          <Reveal className="md:col-span-8">
            <div className="flex h-full flex-col justify-between gap-8 border border-border bg-card p-8 md:p-10">
              <div>
                <p className="mb-5 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-accent">
                  Background
                </p>
                <p className="text-base leading-9 text-foreground/80 md:text-lg">
                  {personal.bioLong}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { icon: GraduationCap, label: "Education", value: "BSIT, Magna Cum Laude — CRMC" },
                  { icon: MapPin,        label: "Location",  value: personal.location },
                  { icon: Code2,         label: "Focus",     value: "Full-stack systems" },
                ].map((fact) => (
                  <div key={fact.label} className="border border-border/60 bg-background/60 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <fact.icon className="size-3.5 text-accent" />
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                        {fact.label}
                      </span>
                    </div>
                    <p className="text-sm font-medium leading-snug">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right column — 4 cols, stacked two cells */}
          <div className="grid gap-4 md:col-span-4 md:grid-rows-2">

            {/* Age */}
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col justify-between border border-border bg-card p-7">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                  Age
                </p>
                <div>
                  <p className="font-heading text-8xl font-black leading-none tracking-[-0.05em] text-accent">
                    {personal.age}
                  </p>
                  <p className="mt-3 font-mono text-xs text-muted-foreground">Years old · {personal.birthDate}</p>
                </div>
              </div>
            </Reveal>

            {/* Status */}
            <Reveal delay={0.14}>
              <div className="flex h-full flex-col justify-between border border-accent/40 bg-accent p-7 text-accent-foreground">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] opacity-70">
                  Status
                </p>
                <div>
                  <p className="font-heading text-xl font-bold leading-tight">
                    Open to Work
                  </p>
                  <p className="mt-2 font-mono text-xs opacity-70">{personal.locationShort}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Skills — full 12 cols */}
          <Reveal delay={0.1} className="md:col-span-12">
            <div className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
              {skills.map((skill) => (
                <div key={skill.group} className="bg-card p-6 md:p-7">
                  <p className="mb-5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.26em] text-accent">
                    {skill.group}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="border border-border/70 bg-background/70 px-3 py-1.5 font-mono text-[0.72rem] text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
