import { cn } from "@/lib/utils"

const tech = [
  "React", "TypeScript", "Next.js", "FastAPI", "PostgreSQL",
  "Docker", "Supabase", "Redis", "Node.js", "Tailwind CSS",
  "Python", "Express", "TanStack Query", "shadcn/ui", "MySQL",
]

interface RowProps {
  items: string[]
  reverse?: boolean
  dim?: boolean
}

function Row({ items, reverse, dim }: RowProps) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden py-2.5">
      <div className={cn("flex w-max gap-12", reverse ? "marquee-track-rev" : "marquee-track")}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className={cn(
              "whitespace-nowrap font-mono text-[0.68rem] uppercase tracking-[0.26em]",
              dim ? "text-muted-foreground/30" : "text-muted-foreground/60",
            )}
          >
            {item}
            <span className={cn("ml-12", dim ? "text-accent/20" : "text-accent/50")}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function TechMarquee() {
  return (
    <div className="overflow-hidden border-y border-border bg-card/30">
      <Row items={tech} />
      <div className="h-px bg-border/30" />
      <Row items={[...tech].reverse()} reverse dim />
    </div>
  )
}
