import { cn } from "@/lib/utils"

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost"
}

export function PillButton({
    children,
    variant = "primary",
    className,
    ...props
}: PillButtonProps) {
    return (
        <button
            className={cn(
                "rounded-pill px-[24px] py-[12px] text-small font-medium transition-all duration-fast ease-premium whitespace-nowrap active:scale-95",
                {
                    "bg-accent text-white hover:bg-accent-hover shadow-[0_4px_14px_0_rgba(255,77,45,0.39)]": variant === "primary",
                    "bg-[#EAEAEA]/50 text-primary hover:bg-[#EAEAEA]": variant === "secondary",
                    "bg-transparent text-primary hover:bg-[#EAEAEA]/50": variant === "ghost",
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
