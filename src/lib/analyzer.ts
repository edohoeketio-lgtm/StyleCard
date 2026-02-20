// Types
export interface StyleDNAMetrics {
    brightness: number
    contrast: number
    saturation: number
    density: number
}

export interface StyleDNAPaletteColor {
    hex: string
    pct: number
    role: "dominant" | "secondary" | "accent" | "muted"
}

export interface StyleDNAOutput {
    palette: StyleDNAPaletteColor[]
    metrics: StyleDNAMetrics
    vibeTags: string[]
    confidenceScore: number
    originalImages: string[] // data URLs
}

// Convert RGB to HSL for saturation checks
function rgbToHsl(r: number, g: number, b: number) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h * 360, s * 100, l * 100];
}

// Convert RGB to Hex
function rgbToHex(r: number, g: number, b: number) {
    return "#" + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? "0" + hex : hex
    }).join("").toUpperCase()
}

async function fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result))
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

/**
 * Main Client-Side Analysis Engine
 * Extracts heuristics from a set of File objects using HTML5 Canvas.
 */
export async function analyzeImages(files: File[]): Promise<StyleDNAOutput> {
    // Convert files to data URLs for stable sharing + no objectURL leaks
    const originalImages = await Promise.all(files.map(fileToDataURL))

    const images: HTMLImageElement[] = await Promise.all(
        originalImages.map(src => {
            return new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image()
                img.onload = () => resolve(img)
                img.onerror = reject
                img.src = src
            })
        })
    )

    // Create a 100x100 canvas for fast pixel sampling to avoid freezing main thread
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!
    const canvasSize = 100
    canvas.width = canvasSize
    canvas.height = canvasSize

    let totalPixels = 0
    let totalLum = 0
    let lumValues: number[] = []
    let totalSat = 0
    let totalEdges = 0

    // Basic color bucketing (5-bit color space: 32x32x32 = 32768 buckets)
    const colorBuckets: Record<string, { count: number, r: number, g: number, b: number }> = {}

    // Process each image
    images.forEach(img => {
        // Draw image to canvas scaled down (this intrinsically creates a downsampled array of core colors)
        ctx.drawImage(img, 0, 0, canvasSize, canvasSize)
        const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]
            const a = data[i + 3]

            if (a < 255) continue // skip transparent

            totalPixels++

            // Luminance (Brightness)
            const lum = (0.299 * r + 0.587 * g + 0.114 * b)
            totalLum += lum
            lumValues.push(lum)

            // Saturation
            const [h, s, l] = rgbToHsl(r, g, b)
            totalSat += s

            // Edge Detection Approximation (compare to previous pixel horizontally)
            if (i > 4) {
                const prevR = data[i - 4]
                const prevG = data[i - 3]
                const prevB = data[i - 2]
                const diff = Math.abs(r - prevR) + Math.abs(g - prevG) + Math.abs(b - prevB)
                if (diff > 100) totalEdges++ // Arbitrary threshold for high-frequency change
            }

            // Color Bucketing (group similar colors by reducing precision)
            const bucketSize = 32
            const rB = Math.floor(r / bucketSize) * bucketSize
            const gB = Math.floor(g / bucketSize) * bucketSize
            const bB = Math.floor(b / bucketSize) * bucketSize
            const key = `${rB},${gB},${bB}`

            if (!colorBuckets[key]) {
                colorBuckets[key] = { count: 0, r, g, b }
            }
            colorBuckets[key].count++
        }
    })

    // Compute Final Metrics (0-100 scales)
    const avgLum = totalLum / totalPixels
    const brightness = Math.round((avgLum / 255) * 100)

    // Contrast (Standard deviation of luminance)
    const variance = lumValues.reduce((acc, val) => acc + Math.pow(val - avgLum, 2), 0) / totalPixels
    const stdDev = Math.sqrt(variance)
    const contrast = Math.round(Math.min(100, (stdDev / 128) * 100 * 1.5)) // normalized roughly to 0-100

    const saturation = Math.round(totalSat / totalPixels)

    // Density: percentage of pixels that are edges, scaled up arbitrarily
    const densityPercent = (totalEdges / totalPixels) * 100
    const density = Math.round(Math.min(100, densityPercent * 3))

    // Extract Palette
    const sortedBuckets = Object.values(colorBuckets).sort((a, b) => b.count - a.count)
    const topBuckets = sortedBuckets.slice(0, 8) // Get top 8 to pick diverse roles

    // Ensure we don't pick 4 near-identical whites
    const distinctPalette: typeof topBuckets = []
    for (let bucket of topBuckets) {
        if (distinctPalette.length === 0) {
            distinctPalette.push(bucket)
            continue
        }
        // Check distance
        const isTooSimilar = distinctPalette.some(d => {
            return (Math.abs(d.r - bucket.r) + Math.abs(d.g - bucket.g) + Math.abs(d.b - bucket.b)) < 60
        })
        if (!isTooSimilar && distinctPalette.length < 5) {
            distinctPalette.push(bucket)
        }
    }
    if (distinctPalette.length < 5) {
        // Just pad with top buckets if image has few colors
        distinctPalette.push(...topBuckets.slice(0, 5 - distinctPalette.length))
    }

    const palette: StyleDNAPaletteColor[] = distinctPalette.slice(0, 5).map((bucket, index) => {
        const hex = rgbToHex(bucket.r, bucket.g, bucket.b)
        const pct = Math.round((bucket.count / totalPixels) * 100)
        let role: StyleDNAPaletteColor["role"] = "muted"
        if (index === 0) role = "dominant"
        else if (index === 1) role = "secondary"
        else {
            // Find accent based on saturation
            if (rgbToHsl(bucket.r, bucket.g, bucket.b)[1] > 30) {
                role = "accent"
            }
        }
        return { hex, pct: Math.max(1, pct), role }
    })

    // Generate Vibe Tags Map (STYLE_DNA_ANALYSIS.md Rules)
    const vibeTags: string[] = []
    if (brightness < 30) vibeTags.push("Dark Mode", "Moody")
    else if (brightness > 85) vibeTags.push("Clean", "Airy")

    if (saturation < 15) vibeTags.push("Monochrome", "Muted")
    else if (saturation > 70) vibeTags.push("Vibrant", "Playful")

    if (contrast > 70) vibeTags.push("High-Contrast", "Editorial")

    if (density < 30) vibeTags.push("Minimalist", "Spacious")
    else if (density > 75) vibeTags.push("Data-Dense", "Complex")

    // Fallbacks if perfectly average
    if (vibeTags.length === 0) vibeTags.push("Balanced", "Neutral")

    // Confidence Score
    const confidenceScore = files.length === 1 ? 75 : (files.length === 3 ? 92 : 85)

    // Convert images to data URLs for the UI (Already converted at start)


    return {
        palette,
        metrics: { brightness, contrast, saturation, density },
        vibeTags: Array.from(new Set(vibeTags)).slice(0, 4), // max 4 tags
        confidenceScore,
        originalImages
    }
}
