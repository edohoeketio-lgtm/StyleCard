import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FadeUp, StaggerChildren } from "@/components/motion/MotionWrapper"
import { PillButton } from "@/components/ui/PillButton"
import { MediaCard } from "@/components/ui/MediaCard"
import { HorizontalGallery } from "@/components/motion/HorizontalGallery"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full pt-[128px]">
        {/* HERO */}
        <section className="px-16 md:px-64 flex flex-col items-center text-center mt-32 mb-[128px]">
          <FadeUp>
            <h1 className="text-hero text-balance mb-16 max-w-5xl">
              Extract the exact <span className="text-muted">Style DNA</span> of any website instantly.
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-body-large text-muted max-w-2xl mb-32">
              Upload 1-3 screenshots and instantly get the palette, typography metrics, and vibe tags.
              Always on-brand, entirely in your browser.
            </p>
          </FadeUp>
          <FadeUp delay={0.2} className="flex gap-16 mb-64">
            <Link href="/analyze">
              <PillButton variant="primary">Start analyzing</PillButton>
            </Link>
            <Link href="/motion-playground">
              <PillButton variant="secondary">View Motion Recipes</PillButton>
            </Link>
          </FadeUp>

          <FadeUp delay={0.3} className="w-full max-w-[1000px] mt-[32px]">
            {/* Huge Hero Media Card representing the Product */}
            <div className="w-full aspect-video rounded-xl overflow-hidden relative shadow-float bg-secondary border border-border flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-overlay-gradient opacity-10 pointer-events-none" />
              <div className="w-full h-full border border-dashed border-muted/30 rounded-lg flex items-center justify-center bg-white/50 backdrop-blur-sm">
                <p className="text-muted text-h2 font-medium">Drop screenshots here</p>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* TRUST ROW */}
        <section className="px-16 md:px-64 py-[96px] border-y border-border mb-[128px]">
          <StaggerChildren className="flex flex-wrap justify-between items-center opacity-40 grayscale gap-32">
            <span className="text-h2 font-bold tracking-tight">Acme Corp</span>
            <span className="text-h2 font-bold tracking-tight">Globex</span>
            <span className="text-h2 font-bold tracking-tight">Soylent</span>
            <span className="text-h2 font-bold tracking-tight">Initech</span>
            <span className="text-h2 font-bold tracking-tight">Umbrella</span>
          </StaggerChildren>
        </section>

        {/* FEATURE SPLIT */}
        <section id="features" className="px-16 md:px-64 flex flex-col md:flex-row gap-[96px] items-center mb-[128px]">
          <div className="flex-1 w-full order-2 md:order-1 relative">
            <MediaCard
              imageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
              title="Editorial Whitespace"
              subtitle="Let your content breathe."
              aspectRatio="portrait"
            />
            {/* Floating decoration to match exactly.ai premium vibe */}
            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-glass-light backdrop-blur-2xl rounded-lg shadow-float border border-white/40 hidden md:block" />
          </div>
          <div className="flex-1 order-1 md:order-2">
            <FadeUp>
              <h2 className="text-h1 mb-32 tracking-tight">Stop guessing.<br />Start generating.</h2>
              <p className="text-body-large text-muted mb-32">
                StyleCard runs lightweight Canvas heuristics directly in your browser. No massive AI payloads, zero privacy concerns. Just pure, deterministic aesthetic extraction.
              </p>
              <Link href="/analyze">
                <PillButton variant="secondary">Try it now</PillButton>
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* GALLERY STRIP */}
        <section className="mb-[128px]">
          <h2 className="text-h2 px-16 md:px-64 mb-32">Recent Extractions</h2>
          <HorizontalGallery>
            {[
              { id: 1, color: "#111111", tag: "Minimalist" },
              { id: 2, color: "#FF4D2D", tag: "Vibrant" },
              { id: 3, color: "#EAEAEA", tag: "Airy" },
              { id: 4, color: "#2B4C7E", tag: "Editorial" },
            ].map(item => (
              <div key={item.id} className="snap-start shrink-0 w-[280px] md:w-[400px]">
                <div className="w-full aspect-[4/3] rounded-lg border border-border overflow-hidden relative shadow-glass transition-transform duration-slow hover:-translate-y-2">
                  <div className="absolute inset-x-0 top-0 h-1/2" style={{ backgroundColor: item.color }} />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white p-24 flex flex-col justify-end">
                    <span className="text-small bg-secondary px-12 py-4 rounded-pill w-max mb-12">{item.tag}</span>
                    <p className="text-body font-medium">Project DNA {item.id}</p>
                  </div>
                </div>
              </div>
            ))}
          </HorizontalGallery>
        </section>
      </main>
      <Footer />
    </>
  );
}
