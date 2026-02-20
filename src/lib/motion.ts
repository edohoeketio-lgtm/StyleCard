import type { Variants } from "framer-motion";

export const EASING_PREMIUM: [number, number, number, number] = [0.32, 0.72, 0, 1];
export const EASING_SMOOTH: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const DURATION = {
    fast: 0.2,
    med: 0.4,
    slow: 0.7,
};

// Fade up an element (initial enter)
export const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: DURATION.slow,
            ease: EASING_PREMIUM,
        }
    },
};

// Stagger parent container
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        }
    }
};

// Hover lift for cards
export const hoverLiftCard: Variants = {
    rest: { y: 0, scale: 1, boxShadow: "0 8px 32px rgba(0, 0, 0, 0.04)" },
    hover: {
        y: -4,
        scale: 1.01,
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.08)",
        transition: {
            duration: DURATION.fast,
            ease: EASING_PREMIUM,
        }
    },
    tap: {
        y: 0,
        scale: 0.99,
        transition: { duration: 0.1 }
    }
};

// Glass modal entrance
export const glassInVariant: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: DURATION.med,
            ease: EASING_PREMIUM
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: DURATION.fast,
            ease: EASING_PREMIUM
        }
    }
};
