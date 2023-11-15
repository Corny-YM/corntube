<script setup lang="ts">
import { IPlaylist } from '@/api/model/piped'
import { CaretRightOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  listId: string
  data: IPlaylist
}>()

const playlistUrl = computed(() => `/playlist?list=${props.listId}`)
</script>

<template>
  <div class="videos-playlist mb-4">
    <!-- content -->
    <div class="w-full flex justify-between items-center">
      <div class="flex flex-col justify-center">
        <a :href="playlistUrl" class="title mb-1 cursor-pointer">
          {{ data.name }}
        </a>
        <a :href="data.uploaderUrl" class="author cursor-pointer">{{
          data.uploader
        }}</a>
      </div>
      <div class="icon"><CaretRightOutlined /></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.videos-playlist {
  @apply flex flex-col items-center;
  @apply h-fit rounded-xl px-4 pb-4 pt-3;
  border: 1px solid rgba(0, 0, 0, 0.1);

  .title,
  .author {
    @apply text-[#0F0F0F] text-ellipsis whitespace-pre;
  }
  .title {
    @apply text-xl font-bold;
  }
  .author {
    @apply text-xs font-normal;
  }

  .icon {
    @apply flex justify-center items-center h-fit p-2 text-2xl;
    @apply cursor-pointer select-none rounded-full hover:bg-lightHover;
  }
}
</style>
