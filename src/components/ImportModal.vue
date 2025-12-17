<script setup lang="ts">
import { ref } from "vue";
import { useImport } from "../composables/useImport";

const emit = defineEmits<{
    close: [];
    import: [colors: Color[]];
}>();

const { importAuto } = useImport();

const importText = ref("");
const error = ref("");
const loading = ref(false);

const handleImport = () => {
    if (!importText.value.trim()) {
        error.value = "Введите данные для импорта";
        return;
    }

    loading.value = true;
    error.value = "";

    setTimeout(() => {
        const result = importAuto(importText.value);
        loading.value = false;

        if (result.success && result.colors) {
            emit("import", result.colors);
            emit("close");
        } else {
            error.value = result.error || "Ошибка импорта";
        }
    }, 100);
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
    error.value = "";
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
                <h2>Импорт палитры</h2>
                <button
                    class="close-button"
                    @click="emit('close')"
                    title="Закрыть">
                    ×
                </button>
            </div>

            <div class="modal-body">
                <p class="description">Вставьте JSON, CSS переменные или URL с параметром colors</p>

                <textarea
                    v-model="importText"
                    class="import-textarea"
                    placeholder="Вставьте данные для импорта..."
                    rows="8"></textarea>

                <div
                    v-if="error"
                    class="error-message">
                    ⚠️ {{ error }}
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
                    <button
                        @click="emit('close')"
                        class="btn-cancel">
                        Отмена
                    </button>
                    <button
                        @click="handleImport"
                        class="btn-import"
                        :disabled="loading">
                        {{ loading ? "Импорт..." : "✓ Импортировать" }}
                    </button>
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
    max-height: 90vh;
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

.action-buttons {
    display: flex;
    gap: 12px;
    margin-top: 24px;
}

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
</style>
