<template>
  <div class="text-xl font-bold">
    {{ time }}
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const time = ref('')
let interval = null

const updateTime = () => {
  const now = new Date()
  time.value = now.toLocaleTimeString() // format: HH:MM:SS
}

onMounted(() => {
  updateTime() // set initial
  interval = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>