<template>
  <router-view />
</template>

<script>
import { useThemeSettingsStore } from "@/store/themeSettings";
import {useAuthStore} from "@/store/auth";

export default {
  mounted() {
    this.$store.themeSettingsStore = useThemeSettingsStore()
  },
}
</script>

<style></style>
