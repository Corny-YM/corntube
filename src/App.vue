<script setup lang="ts">
import { useLocalDBStore } from '@/store/localDB'

const { init } = useLocalDBStore()

onMounted(() => {
  init()
})
</script>

<template>
  <router-view />
</template>
