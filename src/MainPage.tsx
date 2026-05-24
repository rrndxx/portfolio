import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { About } from "@/sections/about"
import { Achievements } from "@/sections/achievements"
import { Contact } from "@/sections/contact"
import { Hero } from "@/sections/hero/hero"
import { TechMarquee } from "@/sections/marquee"
import { Projects } from "@/sections/projects"

export default function MainPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Projects />
        <About />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
