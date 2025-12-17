<template>
    <div
        class="preview-mockup"
        :class="{ dark: isDarkMode }">
        <div class="preview-header">
            <h3>Превью палитры</h3>
            <button
                class="theme-toggle"
                @click="toggleTheme"
                :title="isDarkMode ? 'Светлая тема' : 'Темная тема'">
                {{ isDarkMode ? "☀️" : "🌙" }}
            </button>
        </div>

        <div class="mockup-container">
            <!-- Примеры кнопок -->
            <div class="mockup-section">
                <h4>Кнопки</h4>
                <div class="buttons-grid">
                    <button
                        v-for="(color, index) in colors.slice(0, 3)"
                        :key="`btn-${color.id}`"
                        class="mockup-button"
                        :style="{
                            backgroundColor: color.hex,
                            color: getContrastColor(color.hex),
                        }">
                        {{ ["Primary", "Secondary", "Accent"][index] }}
                    </button>
                </div>
            </div>

            <!-- Карточки -->
            <div class="mockup-section">
                <h4>Карточки</h4>
                <div class="cards-grid">
                    <div
                        v-for="(color, index) in colors.slice(0, 3)"
                        :key="`card-${color.id}`"
                        class="mockup-card"
                        :style="{
                            backgroundColor: color.hex,
                            color: getContrastColor(color.hex),
                        }">
                        <h5>Card {{ index + 1 }}</h5>
                        <p>Пример текста с цветом {{ color.hex }}</p>
                    </div>
                </div>
            </div>

            <!-- Типографика -->
            <div class="mockup-section">
                <h4>Типографика</h4>
                <div class="typography-examples">
                    <h1 :style="{ color: colors[0]?.hex }">Заголовок H1</h1>
                    <h2 :style="{ color: colors[1]?.hex }">Заголовок H2</h2>
                    <p :style="{ color: colors[2]?.hex }">
                        Обычный текст параграфа. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <a
                        href="#"
                        :style="{ color: colors[3]?.hex || colors[0]?.hex }"
                        >Ссылка</a
                    >
                </div>
            </div>

            <!-- Badges и теги -->
            <div class="mockup-section">
                <h4>Теги</h4>
                <div class="badges-grid">
                    <span
                        v-for="(color, index) in colors"
                        :key="`badge-${color.id}`"
                        class="mockup-badge"
                        :style="{
                            backgroundColor: color.hex,
                            color: getContrastColor(color.hex),
                        }">
                        Tag {{ index + 1 }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { colord } from "colord";

interface Props {
    colors: Color[];
}

const props = defineProps<Props>();
const isDarkMode = ref(false);

const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
};

// Функция для определения контрастного цвета текста
const getContrastColor = (hexColor: string): string => {
    const color = colord(hexColor);
    return color.isDark() ? "#ffffff" : "#000000";
};
</script>

<style scoped>
.preview-mockup {
    background: #ffffff;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, color 0.3s;
}

.preview-mockup.dark {
    background: #1a202c;
    color: #e2e8f0;
}

.preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.preview-header h3 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
}

.theme-toggle {
    background: none;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.2s;
}

.preview-mockup.dark .theme-toggle {
    border-color: #4a5568;
}

.theme-toggle:hover {
    transform: scale(1.1);
    background: rgba(0, 0, 0, 0.05);
}

.preview-mockup.dark .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.1);
}

.mockup-container {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.mockup-section h4 {
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    color: #4a5568;
}

.preview-mockup.dark .mockup-section h4 {
    color: #cbd5e0;
}

.buttons-grid {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.mockup-button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
}

.mockup-button:hover {
    transform: translateY(-2px);
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
}

.mockup-card {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.mockup-card h5 {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
}

.mockup-card p {
    margin: 0;
    font-size: 14px;
    opacity: 0.9;
}

.typography-examples {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.typography-examples h1 {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
}

.typography-examples h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
}

.typography-examples p {
    margin: 0;
    font-size: 16px;
    line-height: 1.6;
}

.typography-examples a {
    font-size: 16px;
    text-decoration: underline;
    cursor: pointer;
}

.badges-grid {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.mockup-badge {
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
    display: inline-block;
}

@media (max-width: 768px) {
    .preview-mockup {
        padding: 16px;
    }

    .cards-grid {
        grid-template-columns: 1fr;
    }

    .buttons-grid {
        flex-direction: column;
    }

    .mockup-button {
        width: 100%;
    }
}
</style>
