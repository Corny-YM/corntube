<script setup lang="ts">
import { IRelatedStream } from '@/api/model/piped'
import { formatTimeAgoToVietnamese, formatViews } from '@/utils'

defineProps<{
  data: IRelatedStream
}>()
</script>

<template>
  <a
    :href="data.url"
    class="w-full flex justify-start items-center mt-4 cursor-pointer"
  >
    <div
      class="center max-w-[500px] min-w-[500px] mr-4 rounded-xl overflow-hidden"
    >
      <img
        :src="data.thumbnail"
        class="w-full h-full object-contain self-stretch"
        loading="lazy"
      />
    </div>
    <div class="self-stretch flex flex-col">
      <div class="title mb-1">
        {{ data.title }}
      </div>
      <div class="text">
        {{ formatViews(data.views, 0) }} lượt xem •
        {{ formatTimeAgoToVietnamese(data.uploadedDate) }}
      </div>
      <a
        :href="data.uploaderUrl"
        class="w-fit flex items-center my-4 cursor-pointer"
      >
        <a-avatar :src="data.uploaderAvatar" class="mr-2" />
        <div class="text">{{ data.uploaderName }}</div>
      </a>
      <a-tooltip
        trigger="hover"
        :mouse-leave-delay="0"
        title="Thông tin trong phần mô tả"
        class="select-none"
      >
        <div class="text line-clamp-2">{{ data.shortDescription }}</div>
      </a-tooltip>
    </div>
  </a>
</template>

<style scoped lang="scss">
.title {
  @apply text-[#0F0F0F] text-[18px] font-medium line-clamp-2;
}

.text {
  @apply text-[#606060] text-xs;
}
</style>
