"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SegmentedControlProps {
    options: string[]
    value?: string
    onChange?: (val: string) => void
    variant?: "light" | "dark"
}

export function SegmentedControl({
    options,
    value,
    onChange,
    variant = "light",
}: SegmentedControlProps) {
    const [internalValue, setInternalValue] = useState(options[0])
    const activeValue = value !== undefined ? value : internalValue

    return (
        <div
            className={cn(
                "relative flex items-center p-[4px] rounded-pill w-max",
                variant === "light" ? "bg-secondary" : "bg-black/70 backdrop-blur-md"
            )}
        >
            {options.map((option) => {
                const isActive = activeValue === option
                return (
                    <button
                        key={option}
                        onClick={() => {
                            setInternalValue(option)
                            onChange?.(option)
                        }}
                        className={cn(
                            "relative px-[24px] py-[8px] rounded-pill text-small transition-colors duration-fast z-10",
                            isActive
                                ? variant === "light"
                                    ? "text-primary"
                                    : "text-primary" // Active is always white bg, so text is primary
                                : variant === "light"
                                    ? "text-muted hover:text-primary"
                                    : "text-white hover:text-white/80"
                        )}
                        style={{
                            WebkitTapHighlightColor: "transparent",
                        }}
                    >
                        {isActive && (
                            <motion.div
                                layoutId={`segmented-bg-${variant}`}
                                className="absolute inset-0 rounded-pill bg-white shadow-sm -z-10"
                                transition={{
                                    type: "tween",
                                    ease: [0.65, 0, 0.35, 1],
                                    duration: 0.2, // duration-fast
                                }}
                            />
                        )}
                        {option}
                    </button>
                )
            })}
        </div>
    )
}
