<script setup lang="ts">
import { ref, computed } from "vue";
import { Icon } from '@iconify/vue';
import { useExport, type ExportFormat } from "../composables/useExport";
import { useImport } from "../composables/useImport";

const props = defineProps<{
    colors: Color[];
    paletteName?: string;
}>();

const emit = defineEmits<{
    close: [];
    import: [colors: Color[]];
}>();

const { exportPalette, exportAndDownload, copyToClipboard: exportCopyToClipboard } = useExport();
const { importAuto } = useImport();

// Active tab: 'export' or 'import'
const activeTab = ref<"export" | "import">("export");

// Export state
const selectedFormat = ref<ExportFormat>("css");
const showCopyNotification = ref(false);

// Import state
const importText = ref("");
const importError = ref("");
const importLoading = ref(false);

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

const handleExportCopy = async () => {
    const success = await exportCopyToClipboard(exportedCode.value);
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

const examples = [
    {
        title: "JSON",
        code: `["#4a5568", "#2d3748", "#a0aec0"]`,
    },
    {
        title: "CSS переменные",
        code: `:root {
  --primary: #4a5568;
  --secondary: #2d3748;
}`,
    },
    {
        title: "URL",
        code: `https://example.com?colors=4a5568,2d3748,a0aec0`,
    },
];

const loadExample = (code: string) => {
    importText.value = code;
    importError.value = "";
};

const handleImport = () => {
    if (!importText.value.trim()) {
        importError.value = "Введите данные для импорта";
        return;
    }

    importLoading.value = true;
    importError.value = "";

    setTimeout(() => {
        const result = importAuto(importText.value);
        importLoading.value = false;

        if (result.success && result.colors) {
            emit("import", result.colors);
            emit("close");
        } else {
            importError.value = result.error || "Ошибка импорта";
        }
    }, 100);
};
</script>

<template>
    <div class="modal-overlay" @click="emit('close')">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <div class="tabs">
                    <button
                        :class="['tab', { active: activeTab === 'export' }]"
                        @click="activeTab = 'export'">
                        Экспорт
                    </button>
                    <button
                        :class="['tab', { active: activeTab === 'import' }]"
                        @click="activeTab = 'import'">
                        Импорт
                    </button>
                </div>
                <button
                    class="close-button"
                    @click="emit('close')"
                    title="Закрыть">
                    ×
                </button>
            </div>

            <div class="modal-body">
                <!-- Export Tab -->
                <div v-if="activeTab === 'export'" class="tab-content">
                    <div class="format-selector">
                        <label>Формат:</label>
                        <select v-model="selectedFormat" class="format-select">
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
                        <button @click="handleExportCopy" class="copy-button">
                            Копировать
                        </button>
                        <button @click="handleDownload" class="download-button">
                            Скачать
                        </button>
                    </div>

                    <Transition name="fade">
                        <div v-if="showCopyNotification" class="notification">
                            <div class="notification">
                                <Icon icon="mdi:check" width="18" height="18" /> Скопировано в буфер обмена
                            </div>
                        </div>
                    </Transition>
                </div>

                <!-- Import Tab -->
                <div v-if="activeTab === 'import'" class="tab-content">
                    <p class="description">
                        Вставьте JSON, CSS переменные или URL с параметром colors
                    </p>

                    <textarea
                        v-model="importText"
                        class="import-textarea"
                        placeholder="Вставьте данные для импорта..."
                        rows="8"></textarea>

                    <div v-if="importError" class="error-message">
                        <Icon icon="mdi:alert" width="18" height="18" /> {{ importError }}
                    </div>

                    <div class="examples">
                        <p class="examples-title">Примеры форматов:</p>
                        <div class="examples-grid">
                            <button
                                v-for="example in examples"
                                :key="example.title"
                                class="example-button"
                                @click="loadExample(example.code)">
                                <span class="example-title">{{ example.title }}</span>
                                <pre class="example-code">{{ example.code }}</pre>
                            </button>
                        </div>
                    </div>

                    <div class="action-buttons">
                        <button @click="emit('close')" class="btn-cancel">
                            Отмена
                        </button>
                        <button
                            @click="handleImport"
                            class="btn-import"
                            :disabled="importLoading">
                            <Icon v-if="!importLoading" icon="mdi:check" width="18" height="18" />
                            {{ importLoading ? "Импорт..." : "Импортировать" }}
                        </button>
                    </div>
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
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 28px;
    border-bottom: 1px solid #e5e7eb;
}

.tabs {
    display: flex;
    gap: 8px;
    flex: 1;
}

.tab {
    padding: 10px 16px;
    border: none;
    background: transparent;
    font-size: 14px;
    font-weight: 500;
    color: #6b7280;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s;
    position: relative;
}

.tab:hover {
    color: #374151;
    background: #f3f4f6;
}

.tab.active {
    color: #4a5568;
    background: #eff6ff;
}

.tab.active::after {
    content: '';
    position: absolute;
    bottom: -16px;
    left: 0;
    right: 0;
    height: 2px;
    background: #4a5568;
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

.tab-content {
    animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0.5;
    }
    to {
        opacity: 1;
    }
}

/* Export Tab Styles */
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
    max-height: 300px;
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

/* Import Tab Styles */
.description {
    margin: 0 0 16px 0;
    color: #6b7280;
    font-size: 14px;
}

.import-textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    font-size: 13px;
    line-height: 1.6;
    resize: vertical;
    transition: border-color 0.2s;
}

.import-textarea:focus {
    outline: none;
    border-color: #4a5568;
}

.error-message {
    margin-top: 12px;
    padding: 12px 16px;
    background: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    color: #dc2626;
    font-size: 14px;
}

.examples {
    margin: 24px 0;
}

.examples-title {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin: 0 0 12px 0;
}

.examples-grid {
    display: grid;
    gap: 12px;
}

.example-button {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 12px;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s;
}

.example-button:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
}

.example-title {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 8px;
}

.example-code {
    margin: 0;
    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    font-size: 11px;
    line-height: 1.5;
    color: #4b5563;
    white-space: pre-wrap;
    word-break: break-all;
}

/* Action Buttons */
.action-buttons {
    display: flex;
    gap: 12px;
    margin-top: 24px;
}

.copy-button,
.download-button,
.btn-cancel,
.btn-import {
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
    box-shadow: 0 4px 12px rgba(74, 85, 104, 0.3);
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

.btn-cancel {
    background: #f3f4f6;
    color: #374151;
}

.btn-cancel:hover {
    background: #e5e7eb;
}

.btn-import {
    background: #4a5568;
    color: white;
}

.btn-import:hover:not(:disabled) {
    background: #2d3748;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(74, 85, 104, 0.3);
}

.btn-import:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Notification */
.notification {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #718096;
    color: white;
    padding: 14px 20px;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
    font-weight: 500;
    z-index: 1001;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
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
