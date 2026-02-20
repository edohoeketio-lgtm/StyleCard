export function Footer() {
    return (
        <footer className="w-full border-t border-border py-32 px-16 md:px-64 mt-[128px]">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center gap-8 mb-16 md:mb-0 opacity-60">
                    <div className="w-[16px] h-[16px] rounded-sm bg-primary" />
                    <span className="font-medium text-small">stylecard.ai</span>
                </div>
                <p className="text-small text-muted">A Screenshot Edition demo tool.</p>
            </div>
        </footer>
    )
}
