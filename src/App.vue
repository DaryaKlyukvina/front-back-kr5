<template>
    <div id="app">
        <AppNavigation />
        <router-view />
    </div>
</template>

<script setup lang="ts">
import AppNavigation from "./components/AppNavigation.vue";
</script>

<style>
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
        "Helvetica Neue", sans-serif;
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
