<attachment id="file:about.vue">
<template>
  <div class="about">
    <h1>About Color Palette Generator</h1>
    <p>
      The Color Palette Generator is a web application designed to help users create and manage beautiful color palettes for their projects.
    </p>
    <h2>Features</h2>
    <ul>
      <li>Generate random color palettes</li>
      <li>Select the number of colors and format (HEX or RGB)</li>
      <li>Copy color values to clipboard</li>
      <li>Save and manage favorite palettes</li>
    </ul>
    <h2>How to Use</h2>
    <p>
      To generate a color palette, navigate to the main page and select your desired options. Click the "Generate" button to create a new palette. You can click on individual color cards to copy their values.
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: "About",
};
</script>

<style scoped>
.about {
  padding: 20px;
  font-family: Arial, sans-serif;
}
.about h1 {
  color: #333;
}
.about h2 {
  color: #555;
}
.about ul {
  list-style-type: disc;
  margin-left: 20px;
}
</style>
</attachment>