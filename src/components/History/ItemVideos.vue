<script setup lang="ts">
import { formatDuration, formatTimeAgoToVietnamese, formatViews } from '@/utils'

defineProps<{
  data: {
    timestamp: number
    title: string
    uploader: string
    uploaderUrl: string
    duration: number
    description: string
    uploaderVerified: boolean
    thumbnailUrl: string
    uploaderAvatar: string
    uploadDate: string
    views: number
    url: string
    id: string
  }
}>()
</script>

<template>
  <a
    :href="data.url"
    class="w-full h-fit flex justify-start mt-4 cursor-pointer"
  >
    <div
      class="relative center max-w-[500px] min-w-[500px] mr-4 rounded-xl overflow-hidden shadow-md"
    >
      <img
        :src="data.thumbnailUrl"
        class="w-full h-full object-contain self-stretch"
        loading="lazy"
      />
      <a-tag
        class="absolute rounded-md bg-slate-300 font-medium bottom-1 -right-1"
      >
        {{ formatDuration(data.duration) }}
      </a-tag>
    </div>
    <div class="flex-1 flex flex-col">
      <div class="title mb-1">
        {{ data.title }}
      </div>
      <div class="text">
        {{ formatViews(data.views, 0) }} lượt xem •
        {{ formatTimeAgoToVietnamese(data.uploadDate) }}
      </div>
      <a
        :href="data.uploaderUrl"
        class="w-fit flex items-center my-4 cursor-pointer"
      >
        <a-avatar :src="data.uploaderAvatar" class="mr-2" />
        <div class="text">{{ data.uploader }}</div>
      </a>
      <a-tooltip
        trigger="hover"
        :mouse-leave-delay="0"
        title="Thông tin trong phần mô tả"
      >
        <div class="text h-fit line-clamp-3">
          {{ data.description }}
        </div>
      </a-tooltip>
    </div>
  </a>
</template>

<style scoped lang="scss">
.title {
  @apply text-[#0F0F0F] text-[18px] font-medium line-clamp-2;
}

.text {
  @apply text-[#606060] text-xs line-clamp-2;
  overflow-wrap: anywhere;
}
</style>
