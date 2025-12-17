<attachment id="file:PaletteDisplay.vue">
<template>
  <div class="palette-display">
    <ColorCard
      v-for="(color, index) in colors"
      :key="index"
      :color="color"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ColorCard from './ColorCard.vue';

export default defineComponent({
  name: 'PaletteDisplay',
  components: {
    ColorCard,
  },
  props: {
    colors: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.palette-display {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px;
}
</style>
</attachment>