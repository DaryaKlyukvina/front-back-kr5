import { ref } from 'vue';

export function useColorGenerator() {
    const colors = ref<string[]>([]);

    const generateColors = (numColors: number, format: 'hex' | 'rgb') => {
        colors.value = [];
        for (let i = 0; i < numColors; i++) {
            colors.value.push(format === 'hex' ? getRandomHexColor() : getRandomRgbColor());
        }
    };

    const getRandomHexColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return `#${randomColor.padStart(6, '0')}`;
    };

    const getRandomRgbColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };

    return {
        colors,
        generateColors,
    };
}