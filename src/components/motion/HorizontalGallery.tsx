"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function HorizontalGallery({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    const targetRef = useRef<HTMLDivElement>(null)

    // Create a horizontal scroll region that feels organic. 
    // For a truly native feel on web, standard CSS overflow-x-auto with snap is often best, 
    // but framer-motion approach provides more programmatic control.
    // We'll stick to native scrolling with `padding-x` to respect the tokens.

    return (
        <div
            ref={targetRef}
            className={`flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-16 px-16 md:px-64 scroll-smooth ${className || ""}`}
            style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
            }}
        >
            {children}
        </div>
    )
}
