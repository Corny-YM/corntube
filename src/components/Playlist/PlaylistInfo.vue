<script setup lang="ts">
import { h } from 'vue'
import {
  CaretRightOutlined,
  DownloadOutlined,
  ShareAltOutlined,
} from '@ant-design/icons-vue'
import { formatViews } from '@/utils'

const props = defineProps<{
  thumbnail: string
  title: string
  uploader: string
  uploaderUrl: string
  videos: number
  views: number
  url: string
}>()
const emits = defineEmits(['click'])

const details = computed(
  () => `${props.videos} video ${formatViews(props.views, 0)} lượt xem`
)
</script>

<template>
  <div class="playlist-info text-white">
    <a :href="url" class="playlist-info--img">
      <a-image :preview="false" :src="thumbnail"></a-image>
      <div class="img-overlay">
        <CaretRightOutlined class="center mr-1 text-xl" />
        <div class="uppercase font-medium">Phát tất cả</div>
      </div>
    </a>
    <div class="text-2xl font-bold my-4">{{ title }}</div>
    <a :href="uploaderUrl" class="w-fit font-medium mb-1">{{ uploader }}</a>
    <div class="text-xs text-[#FFFFFFB3] text-ellipsis line-clamp-1">
      {{ details }}
    </div>
    <div class="mt-4 flex justify-start items-start">
      <a-tooltip title="Chia sẻ">
        <a-button
          class="playlist-btn"
          type="dashed"
          shape="circle"
          size="large"
          :icon="h(ShareAltOutlined)"
        />
      </a-tooltip>
      <a-tooltip title="Tải xuống">
        <a-button
          class="playlist-btn"
          type="dashed"
          shape="circle"
          size="large"
          :icon="h(DownloadOutlined)"
        />
      </a-tooltip>
    </div>
    <div class="mt-4 w-full flex justify-start items-center">
      <a-button
        type="primary"
        shape="round"
        size="large"
        :icon="h(CaretRightOutlined)"
        class="flex-1 mr-2 font-semibold"
        :href="url"
      >
        Phát tất cả
      </a-button>
      <a-button
        type="dashed"
        shape="round"
        size="large"
        class="flex-1 font-semibold"
        @click="emits('click')"
      >
        Trộn bài
      </a-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.playlist-info {
  @apply w-[360px] h-full flex flex-col rounded-2xl p-6 mr-2;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(17, 69, 141, 0.9) 100%
  );
}

.playlist-btn {
  & + & {
    @apply ml-2;
  }
}

.playlist-info--img {
  @apply relative w-full flex justify-center items-center;
  @apply rounded-2xl cursor-pointer overflow-hidden;

  .img-overlay {
    @apply absolute inset-0 flex justify-center items-center;
    @apply opacity-0 select-none;
    background-color: rgba(0, 0, 0, 0.7);
    transition: all 150ms ease-in-out;
  }

  &:hover .img-overlay {
    opacity: 1;
  }
}
</style>
