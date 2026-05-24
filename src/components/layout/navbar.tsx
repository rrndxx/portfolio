import { useState } from "react"
import { X, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { navItems, personal } from "@/data/personal"

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <Container className="relative flex h-16 items-center justify-between">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 shrink-0">
          <div className="grid h-9 w-9 place-items-center bg-accent font-heading text-xs font-black text-accent-foreground">
            {personal.initials}
          </div>
          <div className="leading-none">
            <span className="block font-heading text-base font-bold tracking-tight">
              rendyll.dev
            </span>
            {/* <span className="block font-mono text-[0.58rem] uppercase tracking-[0.22em] text-muted-foreground">
              Portfolio
            </span> */}
          </div>
        </a>

        {/* Center pill nav — desktop only, absolutely centred */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border border-border bg-card/80 px-2 py-1.5 shadow-sm backdrop-blur-xl md:flex">
          {navItems.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="rounded-full px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-3">
          <Button asChild size="sm" className="hidden font-mono text-xs uppercase tracking-[0.12em] md:inline-flex">
            <a href="#contact">Hire Me</a>
          </Button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <Container className="flex flex-col py-4">
            {navItems.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="border-b border-border/40 py-3.5 font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground transition-colors last:border-b-0 hover:text-accent"
              >
                {link}
              </a>
            ))}
            <Button asChild className="mt-4 font-mono text-xs uppercase tracking-[0.12em]">
              <a href="#contact" onClick={() => setOpen(false)}>Hire Me</a>
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}
