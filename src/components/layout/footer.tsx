import { Container } from "@/components/shared/container"
import { personal } from "@/data/personal"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-lg font-bold">{personal.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Built with React, TypeScript, Tailwind, and focus.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {personal.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="border border-border px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {social.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  )
}
