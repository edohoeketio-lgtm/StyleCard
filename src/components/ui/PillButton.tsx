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
                "rounded-pill px-[24px] py-[12px] text-small font-medium transition-colors duration-fast ease-premium whitespace-nowrap",
                {
                    "bg-accent text-white hover:bg-accent-hover": variant === "primary",
                    "bg-secondary text-primary hover:bg-[#EAEAEA]": variant === "secondary",
                    "bg-transparent text-primary hover:bg-secondary": variant === "ghost",
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
