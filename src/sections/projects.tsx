import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { projects } from "@/data/projects"

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <Container className="space-y-16">

        <Reveal>
          <SectionHeading
            eyebrow="Selected Work"
            title="Systems that solve real operational problems."
            description="A focused look at the two projects I have shipped — what they do, why they exist, and what went into building them."
          />
        </Reveal>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <article className="group relative overflow-hidden border border-border bg-card transition-colors hover:border-accent/40">

                {/* Large background number watermark */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-6 top-2 select-none font-heading font-black leading-none text-foreground/4"
                  style={{ fontSize: "clamp(6rem,16vw,12rem)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative grid gap-0 lg:grid-cols-[0.55fr_0.45fr]">

                  {/* ── Left panel: heading + description ── */}
                  <div className="space-y-8 border-b border-border p-8 md:p-10 lg:border-b-0 lg:border-r">

                    {/* Project meta */}
                    <div className="flex items-start gap-5">
                      <span className="font-mono text-xs font-bold text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="border border-border px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                            {project.type}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground/60">
                            {project.year}
                          </span>
                        </div>
                        <h3 className="font-heading text-3xl font-black tracking-[-0.03em] transition-colors group-hover:text-accent md:text-4xl">
                          {project.title}
                        </h3>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent/80">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-base leading-8 text-muted-foreground md:text-lg">
                      {project.description}
                    </p>

                    {/* Outcome quote */}
                    <blockquote className="border-l-2 border-accent pl-5 text-sm leading-7 text-muted-foreground">
                      {project.outcome}
                    </blockquote>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="font-mono text-[0.65rem] uppercase tracking-widest">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* ── Right panel: feature grid ── */}
                  <div className="flex flex-col justify-between gap-6 p-8 md:p-10">
                    <div>
                      <p className="mb-5 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                        Key Features
                      </p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        {project.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-start gap-3 border border-border/60 bg-background/50 p-4 text-sm text-foreground/80"
                          >
                            <span className="mt-0.5 shrink-0 text-accent text-xs">→</span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-5">
                      <span className="font-mono text-xs text-muted-foreground/50">
                        {project.tags.length} technologies used
                      </span>
                      <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-accent" />
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
