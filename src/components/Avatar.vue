<script setup lang="ts">
defineProps<{
  src?: string
}>()
</script>

<template>
  <a-avatar :src="src" size="large"> <NoAvatar /></a-avatar>
</template>
