"use client"

import { useState, useRef, useCallback } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { FadeUp, GlassPanelMotion, HoverLiftWrapper } from "@/components/motion/MotionWrapper"
import { EASING_PREMIUM, DURATION } from "@/lib/motion"
import { PillButton } from "@/components/ui/PillButton"
import { analyzeImages, type StyleDNAOutput } from "@/lib/analyzer"
import { generateShareCard } from "@/lib/share-card"
import { UploadCloud, Loader2, Download, Share, Copy, Check } from "lucide-react"

export default function AnalyzePage() {
    const [isDragging, setIsDragging] = useState(false)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    const [result, setResult] = useState<StyleDNAOutput | null>(null)

    const [isGeneratingCard, setIsGeneratingCard] = useState(false)
    const [shareCardUrl, setShareCardUrl] = useState<string | null>(null)
    const [copiedToken, setCopiedToken] = useState<number | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFiles = async (newFiles: FileList | File[]) => {
        const MAX_MB = 8
        const validFiles = Array.from(newFiles)
            .filter(f => f.type.startsWith("image/"))
            .filter(f => f.size <= MAX_MB * 1024 * 1024)
            .slice(0, 3)

        if (validFiles.length === 0) {
            alert(`Please upload up to 3 images under ${MAX_MB}MB each.`)
            return
        }

        setFiles(validFiles)
        setIsAnalyzing(true)
        setResult(null)
        setShareCardUrl(null)

        try {
            // Small timeout to allow UI to paint loading state before blocking canvas operations
            await new Promise(r => setTimeout(r, 100))
            const dna = await analyzeImages(validFiles)
            setResult(dna)
        } catch (err) {
            console.error("Analysis failed", err)
            alert("Failed to analyze images. Please try different ones.")
        } finally {
            setIsAnalyzing(false)
        }
    }

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true)
        else if (e.type === "dragleave") setIsDragging(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files)
        }
    }, [])

    const copyToClipboard = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedToken(index)
            setTimeout(() => setCopiedToken(null), 1500)
        } catch {
            // fallback
            const el = document.createElement("textarea")
            el.value = text
            document.body.appendChild(el)
            el.select()
            document.execCommand("copy")
            document.body.removeChild(el)
            setCopiedToken(index)
            setTimeout(() => setCopiedToken(null), 1500)
        }
    }

    const handleGenerateShareCard = async () => {
        if (!result) return
        setIsGeneratingCard(true)
        try {
            await new Promise(r => setTimeout(r, 50)) // yield thread
            const url = await generateShareCard(result)
            setShareCardUrl(url)
        } catch (err) {
            console.error(err)
        } finally {
            setIsGeneratingCard(false)
        }
    }

    const handleShareOnX = () => {
        if (!result) return
        const tags = result.vibeTags.join(" • ")
        const palette = result.palette.slice(0, 3).map(p => p.hex).join(" ")

        const text = `My site's Style DNA:\n${tags}\nPalette: ${palette}\n\nGenerated with StyleCard → ${window.location.origin}/analyze`
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
        window.open(url, "_blank")
    }

    return (
        <>
            <Navbar />
            <main className="flex-1 w-full pt-[128px] pb-[128px]">
                {!result && !isAnalyzing && (
                    <section className="px-16 md:px-64 flex flex-col items-center">
                        <FadeUp>
                            <h1 className="text-h1 mb-16 text-center">Upload Screenshots</h1>
                            <p className="text-muted text-body-large mb-32 text-center max-w-2xl">
                                Drag and drop 1 to 3 screenshots to extract their exact Design DNA. Entirely private, running locally in your browser.
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.1} className="w-full max-w-4xl">
                            <div
                                className={`w-full aspect-video rounded-xl border border-solid transition-all duration-med ease-premium flex flex-col items-center justify-center p-32 bg-glass-light backdrop-blur-xl shadow-float cursor-pointer
                   ${isDragging ? "border-accent bg-accent/5 scale-[1.02]" : "border-white/60 hover:border-muted/30"}
                 `}
                                onDragEnter={handleDrag}
                                onDragOver={handleDrag}
                                onDragLeave={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <UploadCloud className={`w-12 h-12 mb-16 ${isDragging ? "text-accent" : "text-muted"}`} />
                                <p className="text-h2 font-medium text-primary mb-8 text-center">Click or drag images here</p>
                                <p className="text-muted text-small">Up to 3 images. PNG, JPG, WebP.</p>

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={(e) => { if (e.target.files) handleFiles(e.target.files) }}
                                />
                            </div>
                        </FadeUp>
                    </section>
                )}

                {isAnalyzing && (
                    <section className="px-16 md:px-64 flex flex-col items-center justify-center min-h-[50vh]">
                        <FadeUp className="flex flex-col items-center">
                            <Loader2 className="w-16 h-16 text-accent animate-spin mb-32" />
                            <h2 className="text-h2">Analyzing Style DNA...</h2>
                            <p className="text-muted">Extracting palette, calculating metrics, tagging vibes.</p>
                        </FadeUp>
                    </section>
                )}

                {result && !isAnalyzing && (
                    <section className="px-16 md:px-64">
                        <div className="flex flex-col lg:flex-row gap-[64px] items-start">

                            {/* Left: Original Images Stack */}
                            <div className="w-full lg:w-1/2 sticky top-[128px]">
                                <FadeUp>
                                    <div className="relative w-full aspect-square md:aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden shadow-float ml-8 mt-8">
                                        <img src={result.originalImages[0]} alt="Uploaded screenshot preview" className="w-full h-full object-cover" />
                                        {result.originalImages.length > 1 && (
                                            <div className="absolute top-8 left-8 bg-glass-light backdrop-blur-md rounded-pill px-16 py-8 text-small font-medium border border-white/20">
                                                + {result.originalImages.length - 1} more
                                            </div>
                                        )}
                                    </div>
                                </FadeUp>
                            </div>

                            {/* Right: Analysis Results */}
                            <div className="w-full lg:w-1/2 space-y-[64px]">

                                {/* Palette */}
                                <FadeUp delay={0.05}>
                                    <h3 className="text-h2 mb-24 border-b border-border pb-16">Extracted Palette</h3>
                                    <div className="flex flex-wrap gap-16">
                                        {result.palette.map((color, i) => (
                                            <HoverLiftWrapper key={i}>
                                                <div
                                                    className="flex flex-col items-center group cursor-copy"
                                                    onClick={() => copyToClipboard(color.hex, i)}
                                                >
                                                    <div
                                                        className="w-[80px] h-[80px] rounded-pill shadow-glass border border-black/5 mb-16 relative flex items-center justify-center"
                                                        style={{ backgroundColor: color.hex }}
                                                    >
                                                        {copiedToken === i && <Check className="text-white w-8 h-8 drop-shadow-md" />}
                                                    </div>
                                                    <span className="text-small font-mono text-primary group-hover:text-accent transition-colors">{color.hex}</span>
                                                    <span className="text-small text-muted capitalize mt-4">{color.role}</span>
                                                </div>
                                            </HoverLiftWrapper>
                                        ))}
                                    </div>
                                </FadeUp>

                                {/* Vibe Tags */}
                                <FadeUp delay={0.10}>
                                    <h3 className="text-h2 mb-24 border-b border-border pb-16">Vibe Tags</h3>
                                    <div className="flex flex-wrap gap-16">
                                        {result.vibeTags.map((tag, i) => (
                                            <div key={i} className="bg-secondary text-primary px-[24px] py-[12px] rounded-pill text-body font-medium">
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </FadeUp>

                                {/* Metrics */}
                                <FadeUp delay={0.15}>
                                    <h3 className="text-h2 mb-24 border-b border-border pb-16">Core Metrics</h3>
                                    <div className="grid grid-cols-2 gap-32">
                                        {Object.entries(result.metrics).map(([key, value]) => (
                                            <div key={key}>
                                                <span className="text-small text-muted uppercase tracking-wider block mb-8">{key}</span>
                                                <div className="flex items-center gap-16">
                                                    <span className="text-h2">{value}</span>
                                                    <div className="flex-1 h-8 bg-secondary rounded-pill overflow-hidden">
                                                        <motion.div
                                                            className="h-full bg-accent"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${value}%` }}
                                                            transition={{ duration: DURATION.slow, ease: EASING_PREMIUM }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </FadeUp>

                                {/* Actions */}
                                <FadeUp delay={0.20} className="pt-[32px]">
                                    <div className="bg-secondary rounded-xl p-[32px] flex items-center justify-between shadow-glass">
                                        <div>
                                            <h4 className="text-h2 mb-8">Generate Output</h4>
                                            <p className="text-small text-muted">Create a premium OG card to share your extracted DNA.</p>
                                        </div>
                                        <PillButton onClick={handleGenerateShareCard} disabled={isGeneratingCard}>
                                            {isGeneratingCard ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Create Share Card"}
                                        </PillButton>
                                    </div>
                                </FadeUp>

                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* Share Card Modal */}
            <AnimatePresence>
                {shareCardUrl && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-16 md:p-64">
                        <div className="absolute inset-0 bg-glass-dark backdrop-blur-3xl" onClick={() => setShareCardUrl(null)} />
                        <GlassPanelMotion isOpen={!!shareCardUrl} className="relative z-10 w-full max-w-5xl bg-secondary rounded-xl overflow-hidden shadow-float border border-border">
                            <div className="bg-secondary p-[24px] flex items-center justify-between border-b border-border">
                                <h3 className="text-h2 font-medium">Your Share Card</h3>
                                <button onClick={() => setShareCardUrl(null)} className="text-muted hover:text-primary transition-colors">Close</button>
                            </div>

                            <div className="p-[32px] bg-glass-light flex justify-center items-center">
                                <img src={shareCardUrl} alt="Generated StyleCard" className="max-w-full rounded-lg shadow-glass" />
                            </div>

                            <div className="p-[24px] bg-secondary border-t border-border flex justify-end gap-16">
                                <PillButton variant="secondary" onClick={handleShareOnX} className="flex items-center gap-8">
                                    <Share className="w-4 h-4" /> Share on X
                                </PillButton>
                                <a href={shareCardUrl} download="stylecard-dna.png">
                                    <PillButton variant="primary" className="flex items-center gap-8 border border-black/10">
                                        <Download className="w-4 h-4" /> Download PNG
                                    </PillButton>
                                </a>
                            </div>
                        </GlassPanelMotion>
                    </div>
                )}
            </AnimatePresence>

            {result && <Footer />}
        </>
    )
}
