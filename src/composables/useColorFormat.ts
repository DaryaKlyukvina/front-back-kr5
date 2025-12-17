import { ref, computed } from "vue";
import { colord } from "colord";

// Глобальное состояние для формата
let formatStore: { currentFormat: import("vue").Ref<ColorFormat> } | null = null;

function initializeFormatStore() {
    if (!formatStore) {
        formatStore = {
            currentFormat: ref<ColorFormat>("hex"),
        };
    }
    return formatStore;
}

export function useColorFormat() {
    const store = initializeFormatStore();
    const currentFormat = store.currentFormat;

    const formatColor = (color: Color, format?: ColorFormat): string => {
        const fmt = format || currentFormat.value;
        const colorObj = colord(color.hex);

        switch (fmt) {
            case "rgb": {
                const { r, g, b } = colorObj.toRgb();
                return `rgb(${r}, ${g}, ${b})`;
            }
            case "hex":
            default:
                return color.hex.toUpperCase();
        }
    };

    const toggleFormat = () => {
        currentFormat.value = currentFormat.value === "hex" ? "rgb" : "hex";
    };

    const setFormat = (format: ColorFormat) => {
        currentFormat.value = format;
    };

    return {
        currentFormat: computed(() => currentFormat.value),
        formatColor,
        toggleFormat,
        setFormat,
    };
}
