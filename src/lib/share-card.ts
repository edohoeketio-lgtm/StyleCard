import type { StyleDNAOutput } from "./analyzer"

export async function generateShareCard(dna: StyleDNAOutput): Promise<string> {
    const canvas = document.createElement("canvas")
    const width = 1200
    const height = 630
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")!

    // 1. Canvas Background
    const isDark = dna.metrics.brightness < 30
    const dominantHex = dna.palette.find(p => p.role === "dominant")?.hex || "#F7F7F7"
    ctx.fillStyle = isDark ? "#111111" : "#F7F7F7"
    // Wait, spec says: bg: #F7F7F7 OR user's dominant hex if brightness > 20. Let's use #F7F7F7 to be safe and clean.
    ctx.fillStyle = "#F7F7F7"
    ctx.fillRect(0, 0, width, height)

    // 2. Load images into memory
    const images = await Promise.all(
        dna.originalImages.map(src => {
            return new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image()
                img.onload = () => resolve(img)
                img.onerror = reject
                img.src = src // data URL
            })
        })
    )

    // 3. Main Media Rendering (Center Right)
    const mediaX = 600
    const mediaY = 65
    const mediaSize = 500

    // Custom draw rounded image function
    const drawRoundedImage = (img: HTMLImageElement, x: number, y: number, w: number, h: number, r: number, rotationDeg: number) => {
        ctx.save()
        // Soft float shadow
        ctx.shadowColor = "rgba(0, 0, 0, 0.08)"
        ctx.shadowBlur = 40
        ctx.shadowOffsetY = 20
        ctx.shadowOffsetX = 0

        ctx.translate(x + w / 2, y + h / 2)
        ctx.rotate((rotationDeg * Math.PI) / 180)
        ctx.translate(-(x + w / 2), -(y + h / 2))

        ctx.beginPath()
        ctx.moveTo(x + r, y)
        ctx.arcTo(x + w, y, x + w, y + h, r)
        ctx.arcTo(x + w, y + h, x, y + h, r)
        ctx.arcTo(x, y + h, x, y, r)
        ctx.arcTo(x, y, x + w, y, r)
        ctx.closePath()
        ctx.fill() // draw shadow

        // Clear shadow for image
        ctx.shadowColor = "transparent"
        ctx.clip()

        // object-fit cover
        const scale = Math.max(w / img.width, h / img.height)
        const drawW = img.width * scale
        const drawH = img.height * scale
        const drawX = x + (w - drawW) / 2
        const drawY = y + (h - drawH) / 2

        ctx.drawImage(img, drawX, drawY, drawW, drawH)
        ctx.restore()
    }

    // Draw stacked images
    if (images.length === 1) {
        drawRoundedImage(images[0], mediaX, mediaY, mediaSize, mediaSize, 48, 0)
    } else if (images.length === 2) {
        drawRoundedImage(images[1], mediaX + 40, mediaY, mediaSize - 40, mediaSize - 40, 48, 4)
        drawRoundedImage(images[0], mediaX, mediaY + 20, mediaSize - 20, mediaSize - 20, 48, -2)
    } else if (images.length === 3) {
        drawRoundedImage(images[2], mediaX + 80, mediaY - 20, mediaSize - 60, mediaSize - 60, 48, 6)
        drawRoundedImage(images[1], mediaX + 40, mediaY, mediaSize - 40, mediaSize - 40, 48, 2)
        drawRoundedImage(images[0], mediaX, mediaY + 20, mediaSize - 20, mediaSize - 20, 48, -3)
    }

    // 4. Typography & Content (Left Side)
    const textX = 64
    let currentY = 160

    // Title
    ctx.fillStyle = "#111111"
    ctx.font = "500 48px Inter, sans-serif"
    ctx.fillText("Style DNA", textX, currentY)

    // Subtitle
    currentY += 40
    ctx.fillStyle = "#888888"
    ctx.font = "400 24px Inter, sans-serif"
    ctx.fillText("Analyzed by StyleCard", textX, currentY)

    // 5. Palette Strip
    currentY += 80
    const circleSize = 64
    dna.palette.forEach((color, i) => {
        ctx.beginPath()
        ctx.arc(textX + (i * (circleSize + 16)) + circleSize / 2, currentY + circleSize / 2, circleSize / 2, 0, Math.PI * 2)
        ctx.fillStyle = color.hex
        ctx.fill()
        ctx.lineWidth = 2
        ctx.strokeStyle = "#FFFFFF"
        ctx.stroke()
    })

    // 6. Vibe Tags (Chips)
    currentY += circleSize + 48
    let tagX = textX
    ctx.font = "500 20px Inter, sans-serif"

    dna.vibeTags.forEach(tag => {
        const metrics = ctx.measureText(tag)
        const paddingX = 24
        const paddingY = 12
        const width = metrics.width + (paddingX * 2)
        const height = 20 + (paddingY * 2)

        if (tagX + width > 550) { // wrap to next line
            tagX = textX
            currentY += height + 16
        }

        // Draw pill bg
        ctx.beginPath()
        ctx.roundRect(tagX, currentY, width, height, 9999)
        ctx.fillStyle = "#EAEAEA"
        ctx.fill()

        // Draw text
        ctx.fillStyle = "#111111"
        ctx.fillText(tag, tagX + paddingX, currentY + 28) // approximate baseline

        tagX += width + 16
    })

    // 7. Metrics
    currentY += 96
    ctx.fillStyle = "#888888"
    ctx.font = "400 20px Inter, sans-serif"
    const metricsText = `Density: ${dna.metrics.density} • Contrast: ${dna.metrics.contrast} • Saturation: ${dna.metrics.saturation}`
    ctx.fillText(metricsText, textX, currentY)

    // 8. Footer Branding
    ctx.fillStyle = "#111111"
    ctx.font = "600 24px Inter, sans-serif"
    ctx.globalAlpha = 0.6
    ctx.fillText("stylecard.ai", textX, height - 48)

    // Return Data URL
    return canvas.toDataURL("image/png")
}
