import { stats } from "@/data/personal"

export function HeroStats() {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden border border-border/50 bg-border/50 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-background/90 p-4">
          <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            {stat.label}
          </dt>
          <dd className="mt-3 font-heading text-3xl font-black text-accent">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}