import { ref, watch } from 'vue';

export function usePalette() {
    const palette = ref([]);
    const pinnedColors = ref([]);

    const savePaletteToLocalStorage = () => {
        localStorage.setItem('palette', JSON.stringify(palette.value));
    };

    const loadPaletteFromLocalStorage = () => {
        const savedPalette = localStorage.getItem('palette');
        if (savedPalette) {
            palette.value = JSON.parse(savedPalette);
        }
    };

    const pinColor = (color) => {
        if (!pinnedColors.value.includes(color)) {
            pinnedColors.value.push(color);
        }
    };

    const unpinColor = (color) => {
        pinnedColors.value = pinnedColors.value.filter(c => c !== color);
    };

    watch(palette, savePaletteToLocalStorage, { deep: true });

    loadPaletteFromLocalStorage();

    return {
        palette,
        pinnedColors,
        pinColor,
        unpinColor,
    };
}