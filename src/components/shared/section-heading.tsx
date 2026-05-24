interface SectionHeadingProps {
    eyebrow: string
    title: string
    description?: string
}

export function SectionHeading({
    eyebrow,
    title,
    description,
}: SectionHeadingProps) {
    return (
        <div className="space-y-5">
            <div className="inline-flex items-center gap-3">
                <div className="h-px w-12 bg-accent" />

                <span className="text-xs uppercase tracking-[0.35em] text-accent font-mono">
                    {eyebrow}
                </span>
            </div>

            <div className="space-y-4">
                <h2 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl font-heading">
                    {title}
                </h2>

                {description && (
                    <p className="max-w-2xl text-muted-foreground leading-8 text-base md:text-lg">
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}