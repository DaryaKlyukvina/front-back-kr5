export function exportAsCSSVariables(palette) {
    return Object.entries(palette)
        .map(([key, color]) => `--${key}: ${color};`)
        .join('\n');
}

export function exportAsSCSSVariables(palette) {
    return Object.entries(palette)
        .map(([key, color]) => `$${key}: ${color};`)
        .join('\n');
}

export function exportAsJSON(palette) {
    return JSON.stringify(palette, null, 2);
}