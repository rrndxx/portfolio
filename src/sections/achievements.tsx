import { Award } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { achievements } from "@/data/personal"

export function Achievements() {
  return (
    <section id="achievements" className="border-y border-border bg-card/30 py-24 md:py-32">
      <Container className="space-y-14">
        <Reveal>
          <SectionHeading
            eyebrow="Recognition"
            title="Leadership, technical work, and academic consistency."
            description="A quick timeline of roles and achievements that shaped how I work with teams, deadlines, and complex requirements."
          />
        </Reveal>

        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement, index) => (
            <Reveal key={achievement.title} delay={index * 0.04}>
              <article className="group min-h-56 bg-background p-6 transition-colors hover:bg-card">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div className="grid size-10 place-items-center bg-accent text-background">
                    <Award className="size-5" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {achievement.category}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold leading-tight group-hover:text-accent">
                  {achievement.title}
                </h3>
                <p className="mt-4 text-sm text-muted-foreground">{achievement.organization}</p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {achievement.year}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
