import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { projects } from "@/data/projects"

export function Projects() {
  return (
    <section id="projects" className="border-t border-border bg-card/30 py-24 md:py-32">
      <Container className="space-y-14">
        <Reveal>
          <SectionHeading
            eyebrow="Selected Work"
            title="Project case studies with real operational problems."
            description="A focused look at the systems I have shipped, the workflows they support, and the technologies behind them."
          />
        </Reveal>

        <div className="grid gap-6">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08}>
              <article className="group grid overflow-hidden border border-border bg-background transition-colors hover:border-accent/50 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="flex min-h-72 flex-col justify-between border-b border-border bg-[radial-gradient(circle_at_top_left,rgba(241,247,212,0.18),transparent_38%)] p-8 lg:border-b-0 lg:border-r">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        {project.type}
                      </p>
                      <p className="mt-2 font-heading text-5xl font-black text-accent">
                        0{index + 1}
                      </p>
                    </div>
                    <ArrowUpRight className="size-6 text-muted-foreground transition-colors group-hover:text-accent" />
                  </div>

                  <div>
                    <h3 className="font-heading text-4xl font-black tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground">{project.year}</p>
                  </div>
                </div>

                <div className="space-y-8 p-8">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
                      {project.subtitle}
                    </p>
                    <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <div key={feature} className="border border-border bg-card/70 p-4 text-sm">
                        {feature}
                      </div>
                    ))}
                  </div>

                  <p className="border-l-2 border-accent pl-4 text-sm leading-7 text-muted-foreground">
                    {project.outcome}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
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
