<script setup lang="ts">
import { formatViews } from '@/utils'
import { IChannelContent } from '@/api/model/piped'
import NoAvatar from '@/assets/imgs/NoAvatar.png'

defineProps<{
  data: IChannelContent
}>()

const handleSubscribed = () => {}
</script>

<template>
  <a
    :href="data.url"
    class="w-full flex justify-start items-center mt-4 cursor-pointer"
  >
    <div class="center max-w-[500px] min-w-[500px] mr-4">
      <a-image
        class="w-auto h-auto rounded-full object-contain self-stretch"
        loading="lazy"
        :preview="false"
        :src="data.thumbnail"
        :fallback="NoAvatar"
      />
    </div>

    <div class="flex-1 flex flex-col pr-4">
      <div class="title mb-1">{{ data.name }}</div>
      <div class="text mb-1">
        {{ formatViews(data.subscribers, 0) }} người đăng ký
        {{ data.videos > 0 ? `• ${formatViews(data.videos)}` : null }}
      </div>
      <i class="text line-clamp-2">{{ data.description }}</i>
    </div>

    <div class="self-stretch center">
      <a-button
        type="primary"
        shape="round"
        size="middle"
        class="h-9"
        @click.prevent="handleSubscribed"
      >
        Đăng ký
      </a-button>
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
