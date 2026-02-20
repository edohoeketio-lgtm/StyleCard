"use client"

import { HoverLiftWrapper } from "@/components/motion/MotionWrapper"
import { Plus } from "lucide-react"

interface MediaCardProps {
    imageSrc?: string
    title?: string
    subtitle?: string
    aspectRatio?: "video" | "square" | "portrait" | "hero"
    onClick?: () => void
}

export function MediaCard({
    imageSrc,
    title,
    subtitle,
    aspectRatio = "video",
    onClick
}: MediaCardProps) {

    const aspectClass = {
        "video": "aspect-video",
        "square": "aspect-square",
        "portrait": "aspect-[3/4]",
        "hero": "aspect-[16/10]",
    }[aspectRatio]

    return (
        <HoverLiftWrapper className="w-full">
            <div
                className={`w-full ${aspectClass} rounded-lg overflow-hidden relative group bg-secondary`}
                onClick={onClick}
            >
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={title || "Media Card"}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-slow ease-premium group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 bg-secondary flex items-center justify-center text-muted">No Image</div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-overlay-gradient pointer-events-none opacity-80" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-[24px] pointer-events-none">
                    {title && <h3 className="text-h2 text-white line-clamp-2">{title}</h3>}
                    {subtitle && <p className="text-body-large text-white/80 mt-8 mb-8">{subtitle}</p>}
                </div>

                {/* Corner Action Icon */}
                <div className="absolute top-[24px] right-[24px] md:bottom-[24px] md:top-auto flex items-center justify-center w-[48px] h-[48px] rounded-pill bg-white/20 backdrop-blur-md opacity-0 translate-y-4 md:translate-y-0 md:translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-fast ease-premium shadow-glass">
                    <Plus className="text-white w-6 h-6" />
                </div>
            </div>
        </HoverLiftWrapper>
    )
}
