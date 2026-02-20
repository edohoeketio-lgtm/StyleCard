"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { fadeUpVariant, staggerContainer, hoverLiftCard, glassInVariant } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { useRef } from "react"

export function FadeUp({
    children,
    className,
    delay = 0,
}: {
    children: React.ReactNode
    className?: string
    delay?: number
}) {
    return (
        <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function StaggerChildren({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function HoverLiftWrapper({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <motion.div
            variants={hoverLiftCard}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className={cn("inline-block will-change-transform cursor-pointer", className)}
        >
            {children}
        </motion.div>
    )
}

export function GlassPanelMotion({
    children,
    className,
    isOpen,
}: {
    children: React.ReactNode
    className?: string
    isOpen: boolean
}) {
    if (!isOpen) return null

    return (
        <motion.div
            variants={glassInVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function ParallaxScroll({
    children,
    className,
    offset = 100,
}: {
    children: React.ReactNode
    className?: string
    offset?: number
}) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    // Map scroll progress from -offset to +offset
    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    )
}
