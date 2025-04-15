<script setup>
import {onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/store/auth";
import Cookies from "js-cookie";


const
    store = useAuthStore(),
    route = useRoute(),
    router = useRouter(),

    checkAuthFromCallback = async () => {
      const token = route.query.token;

        if (token && !store.token) {
          Cookies.set("token", token, { expires: 7 });
          store.token = token;

          try {
            await store.fetchUser();
            await router.replace({name: "dashboard"});
          } catch (error) {
            await router.replace({name: "login"});
          }
        } else if (store.token) {
          await router.replace({name: "dashboard"});
        } else {
          await router.replace({name: "login"});
        }
    };

onMounted(() => {
  checkAuthFromCallback();
});
</script>

<template>
  <div id="loading-bg">
    <div class="loading-logo text-center">
      <img src="/logo.svg" alt="Logo" />
    </div>
    <div class="loading">
      <div class="effect-1 effects"></div>
      <div class="effect-2 effects"></div>
      <div class="effect-3 effects"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>