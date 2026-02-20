"use client"

import { motion } from "framer-motion"
import { fadeUpVariant, staggerContainer, hoverLiftCard, glassInVariant } from "@/lib/motion"
import { cn } from "@/lib/utils"

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
