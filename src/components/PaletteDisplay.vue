<template>
    <div class="palette-display">
        <ColorCard
            v-for="color in colors"
            :key="color.id"
            :color="color"
            :format="format"
            @copy="handleCopy"
            @toggle-lock="handleToggleLock" />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ColorCard from "./ColorCard.vue";
import { useColorFormat } from "../composables/useColorFormat";

interface Props {
    colors: Color[];
}

const { currentFormat } = useColorFormat();
const format = computed(() => currentFormat.value);

interface Emits {
    (e: "copy", value: string): void;
    (e: "toggleLock", id: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const handleCopy = (value: string) => {
    emit("copy", value);
};

const handleToggleLock = (id: string) => {
    emit("toggleLock", id);
};
</script>

<style scoped>
.palette-display {
    display: flex;
    gap: 0;
    width: 100%;
    min-height: 300px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}
</style>
