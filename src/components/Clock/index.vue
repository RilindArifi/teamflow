<template>
  <button class="text-xl bx-time">
    {{ currentTime }}
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import moment from 'moment'

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
  font-size: 38px;
  height: 35px;
  line-height: 35px;
  position: relative;
  vertical-align: middle;
  z-index: 5;
}
</style>