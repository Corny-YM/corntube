<script setup lang="ts">
import { ITrending } from '@/api/model/piped'
import VideoList from '@/components/Videos/VideoList.vue'

defineProps<{
  videos: ITrending[]
}>()
</script>

<template>
  <div class="video-list">
    <VideoList :data="videos" :is-detail="false" class="channel" />
  </div>
</template>

<style scoped lang="scss"></style>
