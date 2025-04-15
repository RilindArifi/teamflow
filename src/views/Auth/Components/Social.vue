<template>
  <ul class="flex">
    <li class="flex-1">
      <a
        @click.prevent="handleLogin('github')"
        class="inline-flex h-10 w-10 text-white text-2xl flex-col items-center justify-center rounded-full cursor-pointer"
      >
        <img src="@/assets/images/icon/github.webp" class="rounded-full" alt="" />
      </a>
    </li>
    <li class="flex-1">
      <a
          @click.prevent="handleLogin('facebook')"
          class="inline-flex h-10 w-10 bg-[#395599] text-white text-2xl flex-col items-center justify-center rounded-full cursor-pointer"
      >
        <img src="@/assets/images/icon/fb.svg" alt="" />
      </a>
    </li>
    <li class="flex-1">
      <a
          @click.prevent="handleLogin('linkedin')"
        class="inline-flex h-10 w-10 bg-[#0A63BC] text-white text-2xl flex-col items-center justify-center rounded-full cursor-pointer"
      >
        <img src="@/assets/images/icon/in.svg" alt="" />
      </a>
    </li>
    <li class="flex-1">
      <a
          @click.prevent="handleLogin('google')"
        class="inline-flex h-10 w-10 bg-[#EA4335] text-white text-2xl flex-col items-center justify-center rounded-full cursor-pointer"
      >
        <img src="@/assets/images/icon/gp.svg" alt="" />
      </a>
    </li>
  </ul>
</template>
<script setup>

import axiosClient from "@/axios";

const
    handleLogin = (provider) => {
        axiosClient.get(`auth/${provider}/redirect`).then((response) => {
          window.location.href = response.data.url
        })
    }
</script>
<style lang=""></style>
