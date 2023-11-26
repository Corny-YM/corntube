<script setup lang="ts">
import useLocalDB from '@/hooks/useLocalDB'

const localDB = useLocalDB()

onMounted(() => {
  localDB?.init()
})
</script>

<template>
  <router-view />
</template>
