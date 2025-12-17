<template>
    <div class="palette-card">
        <div class="card-colors">
            <div
                v-for="color in palette.colors"
                :key="color.id"
                class="color-strip"
                :style="{ backgroundColor: color.hex }"
                :title="color.hex"></div>
        </div>

        <div class="card-content">
            <h3 class="palette-name">{{ palette.name }}</h3>
            <p class="palette-date">{{ formattedDate }}</p>

            <div class="card-actions">
                <button
                    class="btn-icon"
                    @click="$emit('load', palette)"
                    title="Загрузить">
                    📥
                </button>
                <button
                    class="btn-icon"
                    @click="$emit('duplicate', palette.id)"
                    title="Дублировать">
                    📋
                </button>
                <button
                    class="btn-icon"
                    @click="$emit('edit', palette.id)"
                    title="Редактировать">
                    ✏️
                </button>
                <button
                    class="btn-icon btn-delete"
                    @click="$emit('delete', palette.id)"
                    title="Удалить">
                    🗑️
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
    palette: Palette;
}

interface Emits {
    (e: "load", palette: Palette): void;
    (e: "duplicate", id: string): void;
    (e: "edit", id: string): void;
    (e: "delete", id: string): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

const formattedDate = computed(() => {
    const date = new Date(props.palette.createdAt);
    return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
});
</script>

<style scoped>
.palette-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.palette-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-colors {
    display: flex;
    height: 120px;
}

.color-strip {
    flex: 1;
    transition: flex 0.3s;
}

.card-colors:hover .color-strip:hover {
    flex: 1.5;
}

.card-content {
    padding: 16px;
}

.palette-name {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
    color: #2d3748;
}

.palette-date {
    margin: 0 0 16px 0;
    font-size: 14px;
    color: #718096;
}

.card-actions {
    display: flex;
    gap: 8px;
}

.btn-icon {
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-icon:hover {
    background: #edf2f7;
    transform: scale(1.1);
}

.btn-delete:hover {
    background: #fed7d7;
    border-color: #fc8181;
}
</style>
