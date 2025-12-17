<template>
    <div class="generator-controls">
        <div class="controls-row">
            <button
                class="btn btn-primary"
                @click="$emit('generate')"
                title="Или нажмите Space">
                Случайная палитра
            </button>

            <div class="format-toggle">
                <button
                    class="btn btn-secondary"
                    @click="$emit('toggleFormat')">
                    Формат: {{ format }}
                </button>
            </div>
        </div>

        <div class="controls-row">
            <label
                class="color-count-label"
                v-if="availableCounts.length > 1">
                Количество цветов:
                <select
                    :value="colorCount"
                    @change="handleCountChange"
                    class="color-count-select">
                    <option
                        v-for="count in availableCounts"
                        :key="count"
                        :value="count">
                        {{ count }}
                    </option>
                </select>
            </label>

            <label class="color-count-label">
                Тип гармонии:
                <select
                    :value="harmonyType"
                    @change="handleHarmonyChange"
                    class="color-count-select">
                    <option value="analogous">Аналогичная</option>
                    <option value="complementary">Комплементарная</option>
                    <option value="split-complementary">Раздельно-комплементарная</option>
                    <option value="triadic">Триада</option>
                    <option value="tetradic">Тетрада</option>
                    <option value="monochromatic">Монохромная</option>
                </select>
            </label>
        </div>

        <div class="controls-row advanced-controls">
            <label class="color-count-label">
                <input
                    type="checkbox"
                    :checked="useBaseColor"
                    @change="handleUseBaseColorChange"
                    class="checkbox-input" />
                Базовый цвет
            </label>

            <input
                v-if="useBaseColor"
                type="color"
                :value="baseColor"
                @input="handleBaseColorChange"
                class="color-picker"
                title="Выберите базовый цвет" />

            <label class="color-count-label">
                Настроение:
                <select
                    :value="mood"
                    @change="handleMoodChange"
                    class="color-count-select">
                    <option value="random">Случайное</option>
                    <option value="calm">Спокойное (пастель)</option>
                    <option value="energetic">Энергичное (яркое)</option>
                    <option value="professional">Профессиональное</option>
                </select>
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    format: ColorFormat;
    colorCount: number;
    harmonyType: HarmonyType;
    availableCounts: number[];
    useBaseColor: boolean;
    baseColor: string;
    mood: MoodType;
}

interface Emits {
    (e: "generate"): void;
    (e: "toggleFormat"): void;
    (e: "updateCount", count: number): void;
    (e: "updateHarmonyType", type: HarmonyType): void;
    (e: "updateUseBaseColor", value: boolean): void;
    (e: "updateBaseColor", color: string): void;
    (e: "updateMood", mood: MoodType): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const handleCountChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    emit("updateCount", Number(target.value));
};

const handleHarmonyChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    emit("updateHarmonyType", target.value as HarmonyType);
};

const handleUseBaseColorChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("updateUseBaseColor", target.checked);
};

const handleBaseColorChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("updateBaseColor", target.value);
};

const handleMoodChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    emit("updateMood", target.value as MoodType);
};
</script>

<style scoped>
.generator-controls {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.controls-row {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-primary {
    background: #4a5568;
    color: white;
}

.btn-primary:hover {
    background: #2d3748;
    transform: translateY(-2px);
}

.btn-secondary {
    background: #f7fafc;
    color: #2d3748;
    border: 2px solid #e2e8f0;
}

.btn-secondary:hover {
    background: #edf2f7;
}

.color-count-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #4a5568;
}

.color-count-select {
    padding: 8px 12px;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    background: white;
}

.color-count-select:focus {
    outline: none;
    border-color: #4a5568;
}

.format-toggle {
    margin-left: auto;
}

.advanced-controls {
    padding-top: 8px;
    border-top: 1px solid #e2e8f0;
}

.checkbox-input {
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.color-picker {
    width: 60px;
    height: 38px;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    cursor: pointer;
    padding: 2px;
}

.color-picker:hover {
    border-color: #4a5568;
}
</style>
