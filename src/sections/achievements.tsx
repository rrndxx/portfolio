import { Medal } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { achievements, personal } from "@/data/personal"

const categoryColor: Record<string, string> = {
  Academic:     "text-cyan-400 border-cyan-400/25 bg-cyan-400/5",
  Technical:    "text-violet-400 border-violet-400/25 bg-violet-400/5",
  Competition:  "text-amber-400 border-amber-400/25 bg-amber-400/5",
  Professional: "text-emerald-400 border-emerald-400/25 bg-emerald-400/5",
  Leadership:   "text-rose-400 border-rose-400/25 bg-rose-400/5",
}

export function Achievements() {
  return (
    <section id="achievements" className="py-24 md:py-32">
      <Container className="space-y-14">

        {/* Header row — heading + MCL badge */}
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Recognition"
              title="Consistent across academics, technical work, and leadership."
              description="Achievements spanning four years at CRMC, capped by graduating Magna Cum Laude."
            />
          </Reveal>

          {/* Magna Cum Laude display card */}
          <Reveal delay={0.1}>
            <div className="border border-accent/30 bg-card p-7 text-center lg:min-w-[18rem] lg:text-right">
              <div className="mb-1 flex items-center justify-center gap-3 lg:justify-end">
                <Medal className="size-5 text-accent" />
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                  Graduating Honor
                </p>
              </div>
              <p className="mt-3 font-heading text-4xl font-black leading-none tracking-[-0.03em] text-accent md:text-5xl">
                MAGNA
              </p>
              <p className="font-heading text-4xl font-black leading-none tracking-[-0.03em] text-stroke-accent md:text-5xl">
                CUM LAUDE
              </p>
              <div className="mt-4 border-t border-border pt-4">
                <p className="font-mono text-xs text-muted-foreground">
                  BSIT Graduate · CRMC · 2026
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground/50">
                  {personal.education}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Achievement cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <Reveal key={achievement.title} delay={index * 0.04}>
              <article className="group flex flex-col justify-between gap-6 border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40">

                {/* Top: number + category */}
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-sm font-bold text-accent/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={[
                      "border px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em]",
                      categoryColor[achievement.category] ?? "text-muted-foreground border-border bg-card",
                    ].join(" ")}
                  >
                    {achievement.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-base font-bold leading-snug transition-colors group-hover:text-accent">
                  {achievement.title}
                </h3>

                {/* Bottom: org + year */}
                <div className="flex items-center justify-between border-t border-border/50 pt-4">
                  <p className="text-sm text-muted-foreground">{achievement.organization}</p>
                  <span className="font-mono text-xs text-muted-foreground/50">{achievement.year}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
