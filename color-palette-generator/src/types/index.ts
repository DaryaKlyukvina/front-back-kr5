interface Color {
    hex: string;
    rgb: {
        r: number;
        g: number;
        b: number;
    };
}

interface Palette {
    colors: Color[];
    name: string;
    isPinned: boolean;
}