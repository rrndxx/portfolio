import { useState, type FormEvent } from "react"
import { ArrowRight, ArrowUpRight, Mail, MapPin, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Container } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { personal } from "@/data/personal"

const emptyForm = { name: "", email: "", subject: "", message: "" }

type Status = "idle" | "sending" | "sent" | "error"

export function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setForm(emptyForm)
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="border-t border-border bg-card/20">

      {/* ── Big CTA banner ───────────────────────────────── */}
      <div className="border-b border-border bg-card/60">
        <Container className="py-16 md:py-20">
          <Reveal>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  Contact
                </p>
                <h2 className="font-heading text-5xl font-black leading-[0.92] tracking-[-0.04em] md:text-6xl xl:text-7xl">
                  Got a project
                  <br />
                  in{" "}
                  <span className="text-stroke-accent">mind?</span>
                </h2>
              </div>

              <div className="flex flex-col items-start gap-3 md:items-end">
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2 font-heading text-lg font-bold transition-colors hover:text-accent md:text-xl"
                >
                  {personal.email}
                  <ArrowUpRight className="size-5 text-accent" />
                </a>
                <p className="font-mono text-xs text-muted-foreground">
                  Usually replies within 24 hours
                </p>
                <p className="font-mono text-xs text-muted-foreground/60">
                  {personal.availability}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </div>

      {/* ── Form section ──────────────────────────────────── */}
      <Container className="py-20">
        <div className="grid gap-14 lg:grid-cols-[0.45fr_0.55fr]">

          {/* Left: contact info */}
          <Reveal>
            <div className="space-y-10">
              <div className="space-y-4">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex gap-4 border border-border bg-card p-5 transition-colors hover:border-accent/50"
                >
                  <div className="grid size-11 shrink-0 place-items-center bg-accent text-accent-foreground">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                      Email
                    </p>
                    <p className="mt-2 text-sm font-medium">{personal.email}</p>
                  </div>
                </a>

                <div className="flex gap-4 border border-border bg-card p-5">
                  <div className="grid size-11 shrink-0 place-items-center bg-accent text-accent-foreground">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                      Location
                    </p>
                    <p className="mt-2 text-sm font-medium">{personal.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                  Connect online
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
                      <ArrowRight className="size-3" />
                    </a>
                  ))}
                </div>
              </div>

              {status === "sent" && (
                <div className="border border-accent/30 bg-accent/10 p-4">
                  <p className="font-mono text-xs text-accent">
                    Message sent. I will get back to you soon.
                  </p>
                </div>
              )}
              {status === "error" && (
                <div className="border border-destructive/30 bg-destructive/10 p-4">
                  <p className="font-mono text-xs text-destructive">
                    Something went wrong. Email me directly instead.
                  </p>
                </div>
              )}
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.12}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Name *
                  </label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="h-12 bg-card/60"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="h-12 bg-card/60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Subject
                </label>
                <Input
                  id="subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Project inquiry, role, collaboration..."
                  className="h-12 bg-card/60"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Message *
                </label>
                <Textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me what you are working on or what role you are hiring for..."
                  className="min-h-40 bg-card/60"
                />
              </div>

              <Button
                type="submit"
                disabled={status === "sending"}
                className="h-12 w-full gap-2 font-mono text-xs uppercase tracking-[0.14em]"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
                <Send className="size-4" />
              </Button>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
