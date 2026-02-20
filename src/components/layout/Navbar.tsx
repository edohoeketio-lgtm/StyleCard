import Link from "next/link"
import { PillButton } from "@/components/ui/PillButton"

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 h-[80px] z-50 bg-white/70 backdrop-blur-xl flex items-center px-16 md:px-64 justify-between transition-all duration-med ease-premium shadow-sm shadow-black/[0.03]">
            <div className="flex items-center gap-32">
                <Link href="/" className="flex items-center gap-8 group">
                    <div className="w-[24px] h-[24px] rounded-sm bg-primary rotation-0 group-hover:rotate-12 transition-transform duration-med ease-premium" />
                    <span className="font-medium text-body tracking-tight">stylecard.ai</span>
                </Link>
                <div className="hidden md:flex items-center gap-12 bg-black/5 p-[4px] rounded-pill">
                    <Link href="/motion-playground" className="text-small font-medium text-muted hover:text-primary transition-colors hover:bg-white hover:shadow-sm px-[16px] py-[6px] rounded-pill">
                        Motion
                    </Link>
                    <Link href="/#features" className="text-small font-medium text-muted hover:text-primary transition-colors hover:bg-white hover:shadow-sm px-[16px] py-[6px] rounded-pill">
                        Features
                    </Link>
                </div>
            </div>
            <div className="flex items-center gap-16">
                <span className="text-small hidden sm:inline-block">Free tier</span>
                <Link href="/analyze">
                    <PillButton variant="primary">Analyze</PillButton>
                </Link>
            </div>
        </nav>
    )
}
