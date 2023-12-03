<script setup lang="ts">
import NoAvatar from '@/assets/imgs/NoAvatar.png'

defineProps<{
  src?: string
}>()
</script>

<template>
  <a-avatar :src="src || NoAvatar" size="large"></a-avatar>
</template>
