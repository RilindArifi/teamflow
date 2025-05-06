import "animate.css";
import "flatpickr/dist/flatpickr.css";
import "simplebar/dist/simplebar.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "vue-toastification/dist/index.css";
import "vue-good-table-next/dist/vue-good-table-next.css";
import "v-calendar/dist/style.css";
import "@webzlodimir/vue-avatar/dist/style.css";
import "./assets/scss/auth.scss";
import "./assets/scss/tailwind.scss";

import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// Plugins
import VueFlatPickr from "vue-flatpickr-component";
import VueGoodTablePlugin from "vue-good-table-next";
import VueSweetalert2 from "vue-sweetalert2";
import VueTippy from "vue-tippy";
import Toast from "vue-toastification";
import VueApexCharts from "vue3-apexcharts";
import VueClickAway from "vue3-click-away";
import VCalendar from "v-calendar";
import setupI18n from "@/plugins/i18n"
import VueSupabase from 'vue-supabase'

// Theme store
import { useThemeSettingsStore } from "@/store/themeSettings";

const i18n = setupI18n()

// Initialize Pinia
const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router);
});

// Create Vue App
const app = createApp(App);

app.use(pinia)
    .use(i18n)
    .use(router)
    .use(VueSweetalert2)
    .use(VueClickAway)
    .use(VueTippy)
    .use(VueFlatPickr)
    .use(VueGoodTablePlugin)
    .use(VueApexCharts)
    .use(VCalendar)
    .use(VueSupabase, {
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
        supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        supabaseOptions: {}
    })
    .use(Toast, {
        toastClassName: "dashcode-toast",
        bodyClassName: "dashcode-toast-body",
    })

app.config.globalProperties.$store = {};

app.mount("#app");

// Theme initialization logic
const themeSettingsStore = useThemeSettingsStore();

// Theme Mode
const theme = localStorage.theme === "dark" ? "dark" : "light";
document.body.classList.add(theme);
themeSettingsStore.theme = theme;
themeSettingsStore.isDark = theme === "dark";

// Semi-Dark Mode
const isSemiDark = localStorage.semiDark === "true";
document.body.classList.add(isSemiDark ? "semi-dark" : "semi-light");
themeSettingsStore.semidark = isSemiDark;
themeSettingsStore.semiDarkTheme = isSemiDark ? "semi-dark" : "semi-light";

// Menu layouts
const menuLayout = localStorage.menuLayout === "horizontal" ? "horizontal" : "vertical";
themeSettingsStore.menuLayout = menuLayout;

// Skin Mode
const skin = localStorage.skin === "bordered" ? "bordered" : "default";
document.body.classList.add(`skin--${skin}`);
themeSettingsStore.skin = skin;

// Text Direction
const isRTL = localStorage.direction === "true";
document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
themeSettingsStore.direction = isRTL;

// Monochrome Mode
if (localStorage.getItem("monochrome")) {
    document.documentElement.classList.add("grayscale");
    themeSettingsStore.monochrome = true;
}
