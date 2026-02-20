"use client"

import { useState } from "react"
import {
    FadeUp,
    StaggerChildren,
    HoverLiftWrapper,
    GlassPanelMotion
} from "@/components/motion/MotionWrapper"
import { HorizontalGallery } from "@/components/motion/HorizontalGallery"
import { PillButton } from "@/components/ui/PillButton"
import { SegmentedControl } from "@/components/ui/SegmentedControl"
import { motion } from "framer-motion"

export default function MotionPlayground() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <main className="min-h-screen pb-[128px]">
            <section className="px-16 md:px-64 pt-[96px]">
                <FadeUp>
                    <h1 className="text-hero mb-16 max-w-4xl text-balance tracking-tight">
                        Motion <span className="text-muted">Playground</span>
                    </h1>
                    <p className="text-body-large text-muted mb-[64px] max-w-2xl">
                        Demonstrating EXACTLY_MOTION_SYSTEM recipes. Calm, hardware-accelerated, transform-only.
                    </p>
                </FadeUp>

                <div className="space-y-[96px]">
                    {/* 1. Stagger & Hover */}
                    <div>
                        <h2 className="text-h2 border-b border-border pb-8 mb-[32px]">1. Stagger & HoverLift</h2>
                        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            {[1, 2, 3].map((i) => (
                                <FadeUp key={i}>
                                    <HoverLiftWrapper className="w-full">
                                        <div className="bg-secondary rounded-lg p-[32px] aspect-video flex items-center justify-center">
                                            <p className="text-small">Hover Me {i}</p>
                                        </div>
                                    </HoverLiftWrapper>
                                </FadeUp>
                            ))}
                        </StaggerChildren>
                    </div>

                    {/* 2. Glass In (Modal) */}
                    <div>
                        <h2 className="text-h2 border-b border-border pb-8 mb-[32px]">2. GlassPanel Entrance</h2>
                        <PillButton onClick={() => setIsModalOpen(true)}>Open Glass Modal</PillButton>

                        {/* Modal Overlay Context */}
                        {isModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-16 md:p-64">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-black/20"
                                    onClick={() => setIsModalOpen(false)}
                                />
                                <GlassPanelMotion isOpen={isModalOpen} className="relative z-10 w-full max-w-2xl bg-glass-light backdrop-blur-3xl border border-white/20 rounded-lg shadow-float p-[48px]">
                                    <h3 className="text-h1 mb-16">Premium Overlay</h3>
                                    <p className="text-body text-muted mb-[32px]">This uses the ease-out-premium curve with scale and blur adjustments.</p>
                                    <PillButton variant="secondary" onClick={() => setIsModalOpen(false)}>Close Panel</PillButton>
                                </GlassPanelMotion>
                            </div>
                        )}
                    </div>

                    {/* 3. Controls & Switches */}
                    <div>
                        <h2 className="text-h2 border-b border-border pb-8 mb-[32px]">3. Pill Controls</h2>
                        <div className="flex gap-[32px] items-center">
                            <SegmentedControl options={["Light Theme", "Dark Theme", "System"]} />
                            <div className="bg-primary p-4 rounded-md inline-block">
                                <SegmentedControl variant="dark" options={["Original", "Color Grading"]} />
                            </div>
                        </div>
                        <div className="flex gap-16 mt-32">
                            <PillButton variant="primary">Primary Pill</PillButton>
                            <PillButton variant="secondary">Secondary Pill</PillButton>
                            <PillButton variant="ghost">Ghost Pill</PillButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Horizontal Gallery */}
            <section className="mt-[96px]">
                <h2 className="text-h2 px-16 md:px-64 pb-8 mb-[32px]">4. Horizontal Gallery Block</h2>
                <HorizontalGallery>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="snap-start shrink-0">
                            <HoverLiftWrapper>
                                <div className="w-[300px] md:w-[480px] aspect-[4/3] bg-secondary rounded-xl overflow-hidden relative">
                                    <div className="absolute inset-0 bg-black/5" />
                                    <div className="absolute bottom-0 left-0 right-0 p-[24px] bg-overlay-gradient">
                                        <p className="text-white text-h2">Card {i}</p>
                                    </div>
                                </div>
                            </HoverLiftWrapper>
                        </div>
                    ))}
                </HorizontalGallery>
            </section>
        </main>
    )
}
