interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-5">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.32em] text-accent">
          {eyebrow}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-4">
        <h2 className="max-w-3xl font-heading text-4xl font-black leading-tight tracking-[-0.03em] md:text-5xl">
          {title}
        </h2>

        {description && (
          <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
