import { Code2, GraduationCap, MapPin } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { personal, skills } from "@/data/personal"

const facts = [
  {
    label: "Education",
    value: personal.education,
    icon: GraduationCap,
  },
  {
    label: "Location",
    value: personal.location,
    icon: MapPin,
  },
  {
    label: "Focus",
    value: "Full-stack systems",
    icon: Code2,
  },
]

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="space-y-8">
            <SectionHeading
              eyebrow="About"
              title="A developer who cares about the whole product path."
              description={personal.bioLong}
            />

            <div className="grid gap-3">
              {facts.map((fact) => (
                <div key={fact.label} className="flex gap-4 border border-border bg-card/50 p-5">
                  <div className="grid size-11 shrink-0 place-items-center bg-accent text-background">
                    <fact.icon className="size-5" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {fact.label}
                    </p>
                    <p className="mt-2 font-medium">{fact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="grid gap-px overflow-hidden border border-border bg-border">
            {skills.map((skill) => (
              <div key={skill.group} className="grid gap-6 bg-background p-6 md:grid-cols-[10rem_1fr]">
                <h3 className="font-heading text-2xl font-bold text-accent">{skill.group}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="border border-border bg-card/70 px-3 py-2 text-sm text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
