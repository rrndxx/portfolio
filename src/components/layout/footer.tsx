import { ArrowUpRight } from "lucide-react"

import { Container } from "@/components/shared/container"
import { personal } from "@/data/personal"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <Container className="py-14">

        {/* Large name display */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-heading text-5xl font-black leading-none tracking-[-0.04em] text-foreground md:text-6xl">
              RENDYLL RYAN
            </p>
            <p className="mt-1 font-heading text-5xl font-black leading-none tracking-[-0.04em] text-stroke-accent md:text-6xl">
              CABARDO
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Connect
            </p>
            <div className="flex flex-wrap gap-2">
              {personal.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {social.label}
                  <ArrowUpRight className="size-3" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-2 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs text-muted-foreground/60">
            © 2026 {personal.name} · {personal.education}
          </p>
          <p className="font-mono text-xs text-muted-foreground/40">
            Built with React + TypeScript + Tailwind
          </p>
        </div>
      </Container>
    </footer>
  )
}
