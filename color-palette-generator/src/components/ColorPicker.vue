<attachment id="file:ColorPicker.vue">
<template>
  <div class="color-picker">
    <label for="color-count">Number of Colors:</label>
    <input
      type="number"
      id="color-count"
      v-model="colorCount"
      min="1"
      max="10"
    />
    
    <label for="color-format">Color Format:</label>
    <select id="color-format" v-model="colorFormat">
      <option value="hex">HEX</option>
      <option value="rgb">RGB</option>
    </select>
    
    <button @click="generatePalette">Generate Palette</button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const colorCount = ref(5);
    const colorFormat = ref('hex');

    const generatePalette = () => {
      // Logic to generate the color palette will be implemented here
    };

    return {
      colorCount,
      colorFormat,
      generatePalette,
    };
  },
};
</script>

<style scoped>
.color-picker {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
</attachment>