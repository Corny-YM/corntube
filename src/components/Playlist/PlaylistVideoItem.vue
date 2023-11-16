<script setup lang="ts">
import { ITrending } from '@/api/model/piped'
import { formatDuration, formatTimeAgoToVietnamese, formatViews } from '@/utils'

const props = defineProps<{
  video: ITrending
  index: number
}>()

const route = useRoute()

const playlistId = computed(() => route.query.list)
const url = computed(() => {
  return `${props.video.url}&list=${unref(playlistId)}`
})
</script>

<template>
  <a :href="url" class="playlist-video--item">
    <div class="w-9 font-medium text-center">{{ index }}</div>
    <div class="relative center w-40 rounded-2xl overflow-hidden aspect-video mr-2">
      <a-image :preview="false" :src="video.thumbnail"></a-image>
      <a-tag class="playlist-video--duration">
        {{ formatDuration(video.duration) }}
      </a-tag>
    </div>
    <div class="flex-1 flex flex-col">
      <div class="max-h-[44px] text-base line-clamp-2 font-medium mb-2">
        {{ video.title }}
      </div>
      <div class="text-xs text-[#606060]">
        {{ video.uploaderName }} <span>•</span>
        {{ formatViews(video.views) }} lượt xem <span>•</span>
        {{ formatTimeAgoToVietnamese(video.uploadedDate) }}
      </div>
    </div>
  </a>
</template>

<style scoped lang="scss">
.playlist-video--item {
  @apply w-full flex justify-start items-center py-2 pr-4 cursor-pointer rounded-2xl;
  transition: all 150ms ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.playlist-video--duration {
  @apply absolute bottom-1 -right-1;
  @apply rounded-[4px] bg-slate-300 font-medium leading-3;
  @apply px-1 py-[3px];
}
</style>
