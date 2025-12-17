import { createApp } from "vue";
import App from "./App.vue";
import { createMemoryHistory, createRouter } from "vue-router";

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: "/",
            component: () => import("./pages/index.vue"),
        },
        {
            path: "/about",
            component: () => import("./pages/about.vue"),
        },
    ],
});

createApp(App).use(router).mount("#app");