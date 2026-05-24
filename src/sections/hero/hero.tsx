import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { personal, roles } from "@/data/personal"

import { HeroImage } from "./hero-image"
import { HeroStats } from "./hero-stats"

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-28 md:pt-36">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(241,247,212,0.08),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(241,247,212,0.14),transparent_30%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-border" />

      <Container className="grid min-h-[calc(100svh-7rem)] items-center gap-16 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-10">
          <Reveal>
            <div className="inline-flex items-center gap-3 border border-border bg-card/70 px-4 py-2 backdrop-blur-xl">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-green-400" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {personal.availability}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-7">
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <span
                    key={role}
                    className="border border-border bg-background/70 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    {role}
                  </span>
                ))}
              </div>

              <h1 className="max-w-5xl font-heading text-5xl font-black leading-[0.95] tracking-tight md:text-7xl xl:text-8xl">
                {personal.headline}
              </h1>

              <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                {personal.bio}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-12 gap-2 px-6">
                <a href="#projects">
                  Explore Work
                  <ArrowRight className="size-4" />
                </a>
              </Button>

              <Button asChild size="lg" variant="outline" className="h-12 px-6">
                <a href="#contact">Start a Conversation</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <HeroStats />
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <HeroImage />
        </Reveal>
      </Container>
    </section>
  )
}