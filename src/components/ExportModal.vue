<script setup lang="ts">
import { ref, computed } from "vue";
import Icon from '@iconify/vue';
import { useExport, type ExportFormat } from "../composables/useExport";

const props = defineProps<{
    colors: Color[];
    paletteName?: string;
}>();

const emit = defineEmits<{
    close: [];
}>();

const { exportPalette, exportAndDownload, copyToClipboard } = useExport();

const selectedFormat = ref<ExportFormat>("css");
const showCopyNotification = ref(false);

const exportedCode = computed(() => {
    return exportPalette({
        format: selectedFormat.value,
        colors: props.colors,
        paletteName: props.paletteName || "My Palette",
    });
});

const formatLabels: Record<ExportFormat, string> = {
    css: "CSS Variables",
    scss: "SCSS Variables",
    tailwind: "Tailwind Config",
    json: "JSON",
};

const handleCopy = async () => {
    const success = await copyToClipboard(exportedCode.value);
    if (success) {
        showCopyNotification.value = true;
        setTimeout(() => {
            showCopyNotification.value = false;
        }, 2000);
    }
};

const handleDownload = () => {
    exportAndDownload({
        format: selectedFormat.value,
        colors: props.colors,
        paletteName: props.paletteName || "palette",
    });
};
</script>

<template>
    <div
        class="modal-overlay"
        @click="emit('close')">
        <div
            class="modal-content"
            @click.stop>
            <div class="modal-header">
                <h2>Экспорт палитры</h2>
                <button
                    class="close-button"
                    @click="emit('close')"
                    title="Закрыть">
                    ×
                </button>
            </div>

            <div class="modal-body">
                <div class="format-selector">
                    <label>Формат:</label>
                    <select
                        v-model="selectedFormat"
                        class="format-select">
                        <option
                            v-for="(label, format) in formatLabels"
                            :key="format"
                            :value="format">
                            {{ label }}
                        </option>
                    </select>
                </div>

                <div class="code-preview">
                    <pre><code>{{ exportedCode }}</code></pre>
                </div>

                <div class="action-buttons">
                    <button
                        @click="handleCopy"
                        class="copy-button">
                        Копировать
                    </button>
                    <button
                        @click="handleDownload"
                        class="download-button">
                        Скачать
                    </button>
                </div>

                <div
                    v-if="showCopyNotification"
                    class="notification">
                    <Icon icon="mdi:check" width="18" height="18" /> Скопировано в буфер обмена
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.modal-content {
    background: white;
    border-radius: 12px;
    width: 100%;
    max-width: 700px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 28px;
    border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #1f2937;
}

.close-button {
    background: none;
    border: none;
    font-size: 32px;
    line-height: 1;
    color: #6b7280;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s;
}

.close-button:hover {
    background: #f3f4f6;
    color: #1f2937;
}

.modal-body {
    padding: 24px 28px;
    overflow-y: auto;
    flex: 1;
}

.format-selector {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
}

.format-selector label {
    font-weight: 500;
    color: #374151;
}

.format-select {
    flex: 1;
    padding: 10px 14px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 15px;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
}

.format-select:hover {
    border-color: #d1d5db;
}

.format-select:focus {
    outline: none;
    border-color: #4a5568;
    box-shadow: 0 0 0 3px rgba(74, 85, 104, 0.1);
}

.code-preview {
    background: #1f2937;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    max-height: 400px;
    overflow-y: auto;
}

.code-preview pre {
    margin: 0;
    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    font-size: 13px;
    line-height: 1.6;
}

.code-preview code {
    color: #e5e7eb;
}

.action-buttons {
    display: flex;
    gap: 12px;
}

.copy-button,
.download-button {
    flex: 1;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.copy-button {
    background: #4a5568;
    color: white;
}

.copy-button:hover {
    background: #2d3748;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.download-button {
    background: #718096;
    color: white;
}

.download-button:hover {
    background: #4a5568;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(112, 128, 144, 0.3);
}

.notification {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #718096;
    color: white;
    padding: 14px 20px;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(112, 128, 144, 0.3);
    font-weight: 500;
    animation: slideIn 0.3s ease;
    z-index: 1001;
}

@keyframes slideIn {
    from {
        transform: translateY(100px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Scrollbar styling */
.code-preview::-webkit-scrollbar,
.modal-body::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.code-preview::-webkit-scrollbar-track {
    background: #374151;
    border-radius: 4px;
}

.code-preview::-webkit-scrollbar-thumb {
    background: #6b7280;
    border-radius: 4px;
}

.code-preview::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}

.modal-body::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}
</style>
