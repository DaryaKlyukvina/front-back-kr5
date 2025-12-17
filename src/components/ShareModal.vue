<script setup lang="ts">
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps<{
    shareUrl: string;
}>();

const emit = defineEmits<{
    close: [];
}>();

const copied = ref(false);

const handleCopy = async () => {
    try {
        await navigator.clipboard.writeText(props.shareUrl);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch (err) {
        console.error("Failed to copy:", err);
    }
};

const shareTitle = "Color Palette";
const shareText = "Посмотри какую крутую палитру я создал!";

const handleShare = async (method: "twitter" | "facebook" | "telegram" | "whatsapp") => {
    const encodedUrl = encodeURIComponent(props.shareUrl);
    const encodedText = encodeURIComponent(shareText);
    let url = "";

    switch (method) {
        case "twitter":
            url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
            break;
        case "facebook":
            url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case "telegram":
            url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
            break;
        case "whatsapp":
            url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
            break;
    }

    if (url) {
        window.open(url, "_blank", "width=600,height=400");
    }
};
</script>

<template>
    <div class="modal-overlay" @click="emit('close')">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h2>Поделиться палитрой</h2>
                <button class="close-button" @click="emit('close')" title="Закрыть">
                    <Icon icon="mdi:close" />
                </button>
            </div>

            <div class="modal-body">
                <p class="share-description">
                    Скопируйте ссылку или поделитесь прямо в социальных сетях
                </p>

                <!-- URL для копирования -->
                <div class="url-section">
                    <label class="url-label">Ссылка на палитру:</label>
                    <div class="url-container">
                        <input
                            type="text"
                            :value="shareUrl"
                            readonly
                            class="url-input" />
                        <button class="copy-button" @click="handleCopy">
                            <Icon icon="mdi:content-copy" />
                            {{ copied ? "Скопировано!" : "Копировать" }}
                        </button>
                    </div>
                </div>

                <!-- Социальные сети -->
                <div class="social-section">
                    <p class="social-label">Или поделитесь в социальных сетях:</p>
                    <div class="social-buttons">
                        <button
                            class="social-button twitter"
                            @click="handleShare('twitter')"
                            title="Поделиться в Twitter/X">
                            <Icon icon="mdi:twitter" />
                        </button>
                        <button
                            class="social-button facebook"
                            @click="handleShare('facebook')"
                            title="Поделиться в Facebook">
                            <Icon icon="mdi:facebook" />
                        </button>
                        <button
                            class="social-button telegram"
                            @click="handleShare('telegram')"
                            title="Поделиться в Telegram">
                            <Icon icon="mdi:telegram" />
                        </button>
                        <button
                            class="social-button whatsapp"
                            @click="handleShare('whatsapp')"
                            title="Поделиться в WhatsApp">
                            <Icon icon="mdi:whatsapp" />
                        </button>
                    </div>
                </div>

                <!-- Close button -->
                <div class="modal-footer">
                    <button class="btn-close" @click="emit('close')">
                        <Icon icon="mdi:window-close" />
                        Закрыть
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
    max-width: 500px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    overflow: hidden;
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
}

.share-description {
    margin: 0 0 24px 0;
    color: #6b7280;
    font-size: 14px;
}

/* URL Section */
.url-section {
    margin-bottom: 32px;
}

.url-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #374151;
    font-size: 14px;
}

.url-container {
    display: flex;
    gap: 8px;
}

.url-input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    font-size: 13px;
    color: #374151;
    background: #f9fafb;
}

.url-input:focus {
    outline: none;
    border-color: #4a5568;
    background: white;
}

.copy-button {
    padding: 12px 20px;
    background: #4a5568;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px;
}

.copy-button:hover {
    background: #2d3748;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(74, 85, 104, 0.3);
}

.copy-button :deep(.iconify) {
    font-size: 18px;
}

/* Social Section */
.social-section {
    margin-bottom: 24px;
}

.social-label {
    margin: 0 0 12px 0;
    font-weight: 500;
    color: #374151;
    font-size: 14px;
}

.social-buttons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.social-button {
    flex: 1;
    min-width: 60px;
    padding: 12px 8px;
    border: 2px solid #e5e7eb;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
}

.social-button:hover {
    border-color: #4a5568;
    background: #f9fafb;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-button.twitter:hover {
    border-color: #1da1f2;
}

.social-button.facebook:hover {
    border-color: #1877f2;
}

.social-button.telegram:hover {
    border-color: #0088cc;
}

.social-button.whatsapp:hover {
    border-color: #25d366;
}

/* Modal Footer */
.modal-footer {
    padding: 16px 28px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: flex-end;
}

.btn-close {
    padding: 10px 20px;
    background: #f3f4f6;
    color: #374151;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-close:hover {
    background: #e5e7eb;
}

.btn-close :deep(.iconify) {
    font-size: 18px;
}

.close-button :deep(.iconify) {
    font-size: 24px;
}
</style>
