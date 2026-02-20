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
                className={`w-full ${aspectClass} rounded-lg overflow-hidden group bg-white border border-border flex flex-col`}
                onClick={onClick}
            >
                <div className="relative flex-1 bg-secondary overflow-hidden">
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt={title || ""}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-slow ease-premium group-hover:scale-[1.02]"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted">No Image</div>
                    )}

                    {/* Corner Action Icon */}
                    <div className="absolute top-[24px] right-[24px] flex items-center justify-center w-[48px] h-[48px] rounded-pill bg-white/80 backdrop-blur-md opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-fast ease-premium border border-black/5 shadow-glass">
                        <Plus className="text-primary w-6 h-6" />
                    </div>
                </div>

                {/* Flat Content Panel (No Gradients) */}
                {(title || subtitle) && (
                    <div className="w-full p-[24px] bg-white border-t border-border shrink-0">
                        {title && <h3 className="text-[20px] font-semibold tracking-tight text-primary line-clamp-2">{title}</h3>}
                        {subtitle && <p className="text-small text-muted mt-4 font-medium">{subtitle}</p>}
                    </div>
                )}
            </div>
        </HoverLiftWrapper>
    )
}
