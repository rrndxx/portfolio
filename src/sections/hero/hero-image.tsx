import { ArrowUpRight, Code2, Database, Server } from "lucide-react"

import { personal } from "@/data/personal"

const orbitItems = [
  {
    label: "UI",
    icon: Code2,
    className: "left-0 top-10",
  },
  {
    label: "API",
    icon: Server,
    className: "right-0 top-1/2",
  },
  {
    label: "DB",
    icon: Database,
    className: "bottom-8 left-12",
  },
]

export function HeroImage() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-8 rounded-full border border-accent/20" />
      <div className="absolute inset-16 rounded-full border border-dashed border-border" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(241,247,212,0.18),transparent_62%)] blur-2xl" />

      <div className="absolute left-1/2 top-1/2 grid size-56 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent/30 bg-card/80 shadow-2xl shadow-background backdrop-blur-xl">
        <div className="grid size-40 place-items-center rounded-full border border-border bg-background text-center">
          <div>
            <p className="font-heading text-5xl font-black text-accent">
              {personal.initials}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {personal.role}
            </p>
          </div>
        </div>
      </div>

      {orbitItems.map((item) => (
        <div
          key={item.label}
          className={`absolute ${item.className} flex items-center gap-3 border border-border bg-background/90 p-3 shadow-xl backdrop-blur-xl`}
        >
          <div className="grid size-9 place-items-center bg-accent text-background">
            <item.icon className="size-4" />
          </div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em]">
            {item.label}
          </span>
        </div>
      ))}

      <div className="absolute bottom-0 right-0 max-w-52 border border-border bg-background/90 p-5 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Based in
            </p>
            <p className="mt-2 font-heading text-xl font-bold">
              {personal.locationShort}
            </p>
          </div>
          <ArrowUpRight className="size-5 text-accent" />
        </div>
      </div>
    </div>
  )
}