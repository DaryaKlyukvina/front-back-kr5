<template>
    <div class="contrast-checker">
        <div class="checker-header">
            <h3>Проверка контрастности</h3>
            <p class="subtitle">Стандарты WCAG для доступности</p>
        </div>

        <div
            v-if="contrastPairs.length === 0"
            class="empty-state">
            <p>Сгенерируйте палитру для проверки контрастности</p>
        </div>

        <div
            v-else
            class="contrast-grid">
            <div
                v-for="(pair, index) in topPairs"
                :key="`pair-${index}`"
                class="contrast-pair"
                :class="getContrastClass(pair.contrast.level)">
                <div class="pair-colors">
                    <div
                        class="color-sample"
                        :style="{ backgroundColor: pair.color1.hex }">
                        <span :style="{ color: pair.color2.hex }">Aa</span>
                    </div>
                    <div class="pair-info">
                        <div class="color-labels">
                            <span class="color-hex">{{ pair.color1.hex }}</span>
                            <span class="vs">на</span>
                            <span class="color-hex">{{ pair.color2.hex }}</span>
                        </div>
                        <div class="contrast-ratio">
                            <strong>{{ pair.contrast.ratio }}:1</strong>
                        </div>
                    </div>
                </div>

                <div class="contrast-levels">
                    <div
                        class="level-badge"
                        :class="{ pass: pair.contrast.AAA }">
                        <span class="level-label">AAA</span>
                        <Icon v-if="pair.contrast.AAA" icon="mdi:check" width="18" height="18" class="level-status" />
                        <Icon v-else icon="mdi:close" width="18" height="18" class="level-status" />
                    </div>
                    <div
                        class="level-badge"
                        :class="{ pass: pair.contrast.AA }">
                        <span class="level-label">AA</span>
                        <Icon v-if="pair.contrast.AA" icon="mdi:check" width="18" height="18" class="level-status" />
                        <Icon v-else icon="mdi:close" width="18" height="18" class="level-status" />
                    </div>
                    <div
                        class="level-badge"
                        :class="{ pass: pair.contrast.AALarge }">
                        <span class="level-label">AA Large</span>
                        <Icon v-if="pair.contrast.AALarge" icon="mdi:check" width="18" height="18" class="level-status" />
                        <Icon v-else icon="mdi:close" width="18" height="18" class="level-status" />
                    </div>
                </div>

                <div
                    class="overall-level"
                    :class="getLevelClass(pair.contrast.level)">
                    {{ pair.contrast.level }}
                </div>
            </div>
        </div>

        <div
            v-if="contrastPairs.length > 3"
            class="show-more">
            <button
                @click="showAll = !showAll"
                class="btn-link">
                {{ showAll ? "Показать меньше" : `Показать все (${contrastPairs.length})` }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Icon } from '@iconify/vue';
import { useAccessibility } from "../composables/useAccessibility";

interface Props {
    colors: Color[];
}

const props = defineProps<Props>();
const { checkPaletteContrast } = useAccessibility();
const showAll = ref(false);

const contrastPairs = computed(() => {
    if (!props.colors || props.colors.length < 2) return [];
    return checkPaletteContrast(props.colors);
});

const topPairs = computed(() => {
    return showAll.value ? contrastPairs.value : contrastPairs.value.slice(0, 3);
});

const getContrastClass = (level: string) => {
    switch (level) {
        case "AAA":
            return "excellent";
        case "AA":
            return "good";
        case "AA Large":
            return "fair";
        default:
            return "poor";
    }
};

const getLevelClass = (level: string) => {
    switch (level) {
        case "AAA":
            return "level-aaa";
        case "AA":
            return "level-aa";
        case "AA Large":
            return "level-aa-large";
        default:
            return "level-fail";
    }
};
</script>

<style scoped>
.contrast-checker {
    background: white;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.checker-header {
    margin-bottom: 24px;
}

.checker-header h3 {
    margin: 0 0 8px 0;
    font-size: 24px;
    font-weight: 700;
}

.subtitle {
    margin: 0;
    color: #718096;
    font-size: 14px;
}

.empty-state {
    padding: 40px 20px;
    text-align: center;
    color: #a0aec0;
}

.contrast-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.contrast-pair {
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
    transition: all 0.2s;
}

.contrast-pair.excellent {
    border-color: #718096;
    background: #edf2f7;
}

.contrast-pair.good {
    border-color: #4a5568;
    background: #edf2f7;
}

.contrast-pair.fair {
    border-color: #a0aec0;
    background: #f7fafc;
}

.contrast-pair.poor {
    border-color: #cbd5e0;
    background: #f7fafc;
}

.pair-colors {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 12px;
}

.color-sample {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: 700;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pair-info {
    flex: 1;
}

.color-labels {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
}

.color-hex {
    font-family: "Courier New", monospace;
    font-size: 14px;
    font-weight: 600;
    background: #edf2f7;
    padding: 4px 8px;
    border-radius: 4px;
}

.vs {
    color: #a0aec0;
    font-size: 12px;
}

.contrast-ratio {
    font-size: 20px;
    color: #2d3748;
}

.contrast-levels {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
}

.level-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: #edf2f7;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
}

.level-badge.pass {
    background: #c6f6d5;
    color: #22543d;
}

.level-badge .level-status {
    font-size: 14px;
}

.overall-level {
    display: inline-block;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
}

.level-aaa {
    background: #718096;
    color: white;
}

.level-aa {
    background: #4a5568;
    color: white;
}

.level-aa-large {
    background: #a0aec0;
    color: #1a202c;
}

.level-fail {
    background: #cbd5e0;
    color: #1a202c;
}

.show-more {
    margin-top: 16px;
    text-align: center;
}

.btn-link {
    background: none;
    border: none;
    color: #4a5568;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    padding: 8px 16px;
    transition: all 0.2s;
}

.btn-link:hover {
    color: #2b6cb0;
    text-decoration: underline;
}

@media (max-width: 768px) {
    .contrast-pair {
        padding: 12px;
    }

    .pair-colors {
        flex-direction: column;
        align-items: flex-start;
    }

    .color-sample {
        width: 100%;
        height: 60px;
    }

    .contrast-levels {
        flex-wrap: wrap;
    }
}
</style>
