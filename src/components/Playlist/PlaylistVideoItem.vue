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
    <div
      class="w-auto px-2 sm:w-9 text-sm sm:text-base font-medium text-center"
    >
      {{ index }}
    </div>
    <div
      class="relative center w-40 rounded-2xl overflow-hidden aspect-video mr-2 dark:shadow-slate-300 dark:shadow"
    >
      <a-image :preview="false" :src="video.thumbnail"></a-image>
      <a-tag class="playlist-video--duration">
        {{ formatDuration(video.duration) }}
      </a-tag>
    </div>
    <div class="flex-1 flex flex-col">
      <div class="title">
        {{ video.title }}
      </div>
      <div class="text-xs text-[#606060] dark:text-darkTitle line-clamp-1">
        {{ video.uploaderName }} <span>•</span>
        {{ formatViews(video.views) }} lượt xem <span>•</span>
        {{ formatTimeAgoToVietnamese(video.uploadedDate) }}
      </div>
    </div>
  </a>
</template>

<style scoped lang="scss">
.playlist-video--item {
  @apply w-full flex justify-start items-center py-2 pr-2 sm:pr-4;
  @apply cursor-pointer rounded-2xl dark:text-lightText;
  transition: all 150ms ease-in-out;

  &:hover {
    @apply bg-[#0000000d] dark:bg-darkHover;
  }

  .title {
    @apply max-h-[44px] text-base line-clamp-2 font-medium mb-2;
    overflow-wrap: anywhere;
  }
}

.playlist-video--duration {
  @apply absolute bottom-1 -right-1;
  @apply rounded-[4px] bg-slate-300 font-medium leading-3;
  @apply px-1 py-[3px];
}
</style>
