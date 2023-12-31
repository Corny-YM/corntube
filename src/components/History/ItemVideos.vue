<script setup lang="ts">
import { formatDuration, formatTimeAgoToVietnamese, formatViews } from '@/utils'
import NoThumbnail from '@/assets/imgs/NoThumbnail.png'
import NoAvatar from '@/components/Icons/NoAvatar.vue'

const props = defineProps<{
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

const srcThumbnail = ref(props.data.thumbnailUrl)

const handleError = () => {
  srcThumbnail.value = NoThumbnail
}
</script>

<template>
  <a :href="data.url" class="item-video">
    <div class="video-thumbnail">
      <img
        :src="srcThumbnail"
        class="w-full h-full object-contain self-stretch aspect-video"
        loading="lazy"
        @error="handleError"
      />
      <a-tag
        class="absolute rounded-md bg-slate-300 font-medium bottom-1 -right-1"
      >
        {{ formatDuration(data.duration) }}
      </a-tag>
    </div>
    <div class="flex-1 flex flex-col mt-3 sm:mt-0">
      <div class="title mb-1">
        {{ data.title }}
      </div>
      <div
        class="flex flex-row-reverse sm:flex-col items-center sm:items-start justify-end sm:justify-start"
      >
        <div class="text">
          {{ formatViews(data.views, 0) }} lượt xem •
          {{ formatTimeAgoToVietnamese(data.uploadDate) }}
        </div>
        <a
          :href="data.uploaderUrl"
          class="w-fit flex items-center mr-2 sm:mr-0 my-2 sm:my-2 md:my-4 cursor-pointer"
        >
          <a-avatar
            :src="data.uploaderAvatar"
            class="center w-9 h-9 bg-slate-300 mr-2"
          >
            <NoAvatar />
          </a-avatar>
          <div class="flex items-center">
            <div class="text">{{ data.uploader }}</div>
            <div v-if="data.uploaderVerified" class="w-3 h-3 ml-2 center">
              <check-circle />
            </div>
          </div>
        </a>
      </div>
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
.item-video {
  @apply w-full h-fit flex flex-col sm:flex-row justify-start cursor-pointer;
  @apply mt-6 sm:mt-4;
}

.video-thumbnail {
  @apply flex justify-center items-center;
  @apply relative mr-4 rounded-xl overflow-hidden shadow-md;
  @apply max-w-full min-w-full;
  @apply sm:max-w-[300px] sm:min-w-[300px];
  @apply md:max-w-[360px] md:min-w-[360px];
  @apply lg:max-w-[500px] lg:min-w-[500px];
}

.title {
  @apply text-[18px] font-medium line-clamp-2;
  @apply dark:text-lightHover text-[#0F0F0F];
}

.text {
  @apply dark:text-darkTitle text-[#606060] text-xs;
  overflow-wrap: anywhere;
}
</style>
