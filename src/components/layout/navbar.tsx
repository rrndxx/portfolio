import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { navItems, personal } from "@/data/personal"

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center bg-accent font-heading text-sm font-black text-background">
            {personal.initials}
          </div>

          <div className="leading-none">
            <p className="font-heading text-lg font-bold tracking-tight">
              rendyll.dev
            </p>
            <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
              Portfolio
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild className="hidden md:inline-flex">
            <a href="#contact">Hire Me</a>
          </Button>

          <Button asChild size="icon" variant="outline" className="md:hidden">
            <a href="#contact" aria-label="Open contact section">
              <Menu className="size-5" />
            </a>
          </Button>
        </div>
      </Container>
    </header>
  )
}