import { stats } from "@/data/personal"

export function HeroStats() {
  return (
    <div className="border-t border-border pt-8">
      <dl className="flex flex-wrap gap-x-10 gap-y-6 md:gap-x-14">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dd className="font-heading text-4xl font-black leading-none tracking-[-0.04em] text-accent">
              {stat.value}
            </dd>
            <dt className="mt-2.5 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  )
}
