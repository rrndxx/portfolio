import { ArrowRight, ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { personal } from "@/data/personal"

import { HeroStats } from "./hero-stats"

export function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-svh flex-col overflow-hidden">

      {/* Dot-grid background */}
      <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-35" />

      {/* Radial accent glows */}
      <div className="pointer-events-none absolute -left-32 -top-32 -z-10 h-[34rem] w-[34rem] rounded-full bg-accent/6 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-accent/4 blur-[80px]" />

      {/* Bottom separator */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-border" />

      <Container className="flex flex-1 flex-col gap-12 pt-24 pb-16">

        {/* ── Row 1: Status badges ──────────────────────────── */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            {/* Ping "available" badge */}
            <div className="inline-flex items-center gap-2.5 border border-accent/30 bg-accent/8 px-4 py-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-green-400" />
              </span>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-accent">
                Available for Work
              </span>
            </div>

            <span className="border border-border bg-card/60 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
              BSIT Graduate
            </span>

            <span className="border border-border bg-card/60 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
              Magna Cum Laude
            </span>
          </div>
        </Reveal>

        {/* ── Row 2: Main content ───────────────────────────── */}
        <div className="flex flex-1 flex-col items-start justify-center gap-14 lg:flex-row lg:items-center">

          {/* Giant name — left column */}
          <Reveal delay={0.06} className="min-w-0 shrink-0 lg:w-[55%]">
            <h1 className="font-heading font-black leading-[0.88] tracking-[-0.045em] text-[clamp(3.8rem,10.5vw,8.5rem)]">
              <span className="block text-foreground">RENDYLL</span>
              <span className="block text-foreground">RYAN</span>
              <span className="block text-stroke-accent">CABARDO</span>
            </h1>
          </Reveal>

          {/* Details — right column */}
          <Reveal delay={0.16} className="flex-1">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  {personal.role}
                </p>
                <div className="h-px w-14 bg-accent/40" />
                <p className="max-w-md text-base leading-8 text-muted-foreground md:text-lg">
                  {personal.bio}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="h-11 gap-2 px-6 font-mono text-xs uppercase tracking-[0.12em]"
                >
                  <a href="#projects">
                    View My Work
                    <ArrowRight className="size-3.5" />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-11 px-6 font-mono text-xs uppercase tracking-[0.12em]"
                >
                  <a href="#contact">Get In Touch</a>
                </Button>
              </div>

              {/* Social links */}
              <div className="flex flex-wrap gap-2 pt-1">
                {personal.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {social.label}
                    <ArrowUpRight className="size-3" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Row 3: Stats bar ──────────────────────────────── */}
        <Reveal delay={0.28}>
          <HeroStats />
        </Reveal>
      </Container>
    </section>
  )
}
