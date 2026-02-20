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
      <main className="flex-1 w-full pt-[160px]">
        {/* HERO */}
        <section className="px-16 md:px-64 flex flex-col items-center text-center mt-32 mb-[160px]">
          <FadeUp>
            <h1 className="text-[56px] md:text-[88px] leading-[1.05] tracking-[-0.05em] font-semibold text-balance mb-24 max-w-5xl text-primary">
              Extract the exact <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-black to-accent/80">Style DNA</span> of any website.
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

          <FadeUp delay={0.3} className="w-full max-w-[1200px] mt-[64px] relative perspective-1000">
            {/* Dramatic Floating Hero Showpiece */}
            <div className="w-full aspect-[16/10] md:aspect-[21/9] rounded-[32px] overflow-hidden relative shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border border-white/60 bg-white/40 backdrop-blur-3xl flex items-center justify-center p-8 transition-transform duration-[1500ms] hover:scale-[1.01] hover:-translate-y-2 group">
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
              <div className="w-full h-full rounded-[24px] overflow-hidden flex flex-col bg-[#F5F5F7] shadow-inner relative">

                {/* Simulated macOS Header */}
                <div className="h-[48px] bg-white/80 backdrop-blur-md border-b border-black/5 flex items-center px-[24px] gap-8 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-black/10 group-hover:bg-[#FF5F56] transition-colors duration-fast" />
                  <div className="w-3 h-3 rounded-full bg-black/10 group-hover:bg-[#FFBD2E] transition-colors duration-fast delay-75" />
                  <div className="w-3 h-3 rounded-full bg-black/10 group-hover:bg-[#27C93F] transition-colors duration-fast delay-150" />
                </div>

                {/* Content Area */}
                <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-gradient-to-tr from-[#E5E5EA]/20 to-transparent">
                  {/* Abstract design elements to look like analysis in progress */}
                  <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] bg-accent/10 rounded-full blur-3xl mix-blend-multiply" />
                  <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply" />
                  <p className="text-muted text-h2 font-medium z-10 font-mono tracking-tight text-black/40">await extractDNA()</p>
                </div>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* TRUST ROW */}
        <section className="px-16 md:px-64 py-[96px] border-y border-border mb-[160px]">
          <StaggerChildren className="flex flex-wrap justify-between items-center opacity-30 grayscale gap-32 *:transition-opacity *:duration-fast hover:*:opacity-100">
            <span className="text-h2 font-semibold tracking-tight transition-opacity hover:opacity-100 cursor-default">Acme Corp</span>
            <span className="text-h2 font-semibold tracking-tight transition-opacity hover:opacity-100 cursor-default">Globex</span>
            <span className="text-h2 font-semibold tracking-tight transition-opacity hover:opacity-100 cursor-default">Soylent</span>
            <span className="text-h2 font-semibold tracking-tight transition-opacity hover:opacity-100 cursor-default">Initech</span>
            <span className="text-h2 font-semibold tracking-tight transition-opacity hover:opacity-100 cursor-default">Umbrella</span>
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
              <p className="text-body-large text-muted mb-32 max-w-prose">
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
