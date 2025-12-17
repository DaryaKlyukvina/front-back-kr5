<attachment id="file:ColorCard.vue">
<template>
  <div class="color-card" @click="copyToClipboard">
    <div class="color-swatch" :style="{ backgroundColor: color }"></div>
    <p class="color-hex">{{ color }}</p>
    <p v-if="copied" class="notification">Copied!</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ColorCard',
  props: {
    color: {
      type: String,
      required: true,
    },
  },
  setup() {
    const copied = ref(false);

    const copyToClipboard = async () => {
      await navigator.clipboard.writeText(color);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    };

    return {
      copied,
      copyToClipboard,
    };
  },
});
</script>

<style scoped>
.color-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: transform 0.2s;
}

.color-card:hover {
  transform: scale(1.05);
}

.color-swatch {
  width: 100px;
  height: 100px;
  border-radius: 5px;
}

.color-hex {
  margin-top: 5px;
  font-weight: bold;
}

.notification {
  color: green;
  margin-top: 5px;
}
</style>
</attachment>