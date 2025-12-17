export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const result = regex.exec(hex);
    if (!result) return null;

    const [, r, g, b] = result;
    return {
        r: parseInt(r, 16),
        g: parseInt(g, 16),
        b: parseInt(b, 16),
    };
}

export function rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function isColorDark(hex: string): boolean | null {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const { r, g, b } = rgb;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
}

export function adjustColorBrightness(hex: string, amount: number): string | null {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const { r, g, b } = rgb;
    const newR = Math.min(255, Math.max(0, r + amount));
    const newG = Math.min(255, Math.max(0, g + amount));
    const newB = Math.min(255, Math.max(0, b + amount));

    return rgbToHex(newR, newG, newB);
}