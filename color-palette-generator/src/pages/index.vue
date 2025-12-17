<attachment id="file:index.vue">
<template>
  <div class="color-palette-generator">
    <h1>Color Palette Generator</h1>
    <ColorPicker @generatePalette="generatePalette" />
    <PaletteDisplay :colors="colors" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ColorPicker from '../components/ColorPicker.vue';
import PaletteDisplay from '../components/PaletteDisplay.vue';
import { useColorGenerator } from '../composables/useColorGenerator';

export default defineComponent({
  components: {
    ColorPicker,
    PaletteDisplay,
  },
  setup() {
    const colors = ref<string[]>([]);
    const { generatePalette } = useColorGenerator();

    const generateNewPalette = (numColors: number) => {
      colors.value = generatePalette(numColors);
    };

    return {
      colors,
      generatePalette: generateNewPalette,
    };
  },
});
</script>

<style scoped>
.color-palette-generator {
  text-align: center;
}
</style>
</attachment>