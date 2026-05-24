import { useState, type FormEvent } from "react"
import { Mail, MapPin, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Container } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { personal } from "@/data/personal"

const emptyForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

export function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error("Message failed")
      }

      setForm(emptyForm)
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  const message =
    status === "sent"
      ? "Message sent. I will get back to you soon."
      : status === "error"
        ? "Something went wrong. You can email me directly instead."
        : "Tell me what you are building or what role you are hiring for."

  return (
    <section id="contact" className="py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="space-y-10">
            <SectionHeading
              eyebrow="Contact"
              title="Have a project, role, or collaboration in mind?"
              description={message}
            />

            <div className="grid gap-4">
              <a
                href={`mailto:${personal.email}`}
                className="flex gap-4 border border-border bg-card/60 p-5 transition-colors hover:border-accent"
              >
                <div className="grid size-11 shrink-0 place-items-center bg-accent text-background">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    Email
                  </p>
                  <p className="mt-2 font-medium">{personal.email}</p>
                </div>
              </a>

              <div className="flex gap-4 border border-border bg-card/60 p-5">
                <div className="grid size-11 shrink-0 place-items-center bg-accent text-background">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    Location
                  </p>
                  <p className="mt-2 font-medium">{personal.location}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <form onSubmit={handleSubmit} className="border border-border bg-card/70 p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="font-mono text-xs uppercase tracking-[0.18em]">
                  Name
                </label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Your name"
                  className="h-12 bg-background"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="font-mono text-xs uppercase tracking-[0.18em]">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="you@example.com"
                  className="h-12 bg-background"
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <label htmlFor="subject" className="font-mono text-xs uppercase tracking-[0.18em]">
                Subject
              </label>
              <Input
                id="subject"
                value={form.subject}
                onChange={(event) => setForm({ ...form, subject: event.target.value })}
                placeholder="Project inquiry, internship, collaboration..."
                className="h-12 bg-background"
              />
            </div>

            <div className="mt-4 space-y-2">
              <label htmlFor="message" className="font-mono text-xs uppercase tracking-[0.18em]">
                Message
              </label>
              <Textarea
                id="message"
                required
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                placeholder="Share a few details..."
                className="min-h-36 bg-background"
              />
            </div>

            <Button type="submit" disabled={status === "sending"} className="mt-6 h-12 w-full gap-2">
              {status === "sending" ? "Sending..." : "Send Message"}
              <Send className="size-4" />
            </Button>
          </form>
        </Reveal>
      </Container>
    </section>
  )
}
