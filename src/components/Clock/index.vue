<template>



  <Dropdown classMenuItems="w-[380px] top-[58px] ">
    <div class="w-64 h-10 flex items-center justify-between bg-gray-200 p-2 rounded-lg">
      <p class="bx-time"> {{ currentTime }} </p>
      <div class="flex items-end w-full pl-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
        </svg>
        <p class="text-sm pl-1">CLOCK IN</p>
      </div>
    </div>
    <template #menus>
        <div
            type="button"
            :class="`${
            active
              ? 'bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-900 dark:text-slate-300'
              : 'text-slate-600 dark:text-slate-300'
          } `"
            class="inline-flex items-center space-x-2 rtl:space-x-reverse w-full px-4 py-2 first:rounded-t last:rounded-b font-normal cursor-pointer"
            @click=""
        >
          <div class="flex-none text-lg">
            <Icon icon="" />
          </div>
          <div class="flex-1 text-sm">
            Working Day Duration:
          </div>
        </div>
    </template>
  </Dropdown>


</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import moment from 'moment'
import Icon from "@/components/Icon/index.vue";
import {MenuItem} from "@headlessui/vue";
import VueAvatar from "@webzlodimir/vue-avatar";
import Dropdown from "@/components/Dropdown/index.vue";

const currentTime = ref('')
let interval = null

const updateTime = () => {
  currentTime.value = moment().format('HH:mm')
}

onMounted(() => {
  updateTime()
  interval = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<style>
.bx-time {
  display: inline-block;
  font-size: 35px;
  height: 35px;
  line-height: 35px;
  position: relative;
  vertical-align: middle;
  z-index: 5;
}
</style>