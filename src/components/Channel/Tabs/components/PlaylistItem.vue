<script setup lang="ts">
import { UnorderedListOutlined } from '@ant-design/icons-vue'
import { IPlaylistContent } from '@/api/model/piped'
import { formatViews } from '@/utils'

defineProps<{
  playlist: IPlaylistContent
}>()
</script>

<template>
  <a :key="playlist.url" class="playlist-item">
    <!-- IMG -->
    <div class="relative flex justify-center rounded-xl overflow-hidden">
      <a-image :preview="false" :src="playlist.thumbnail" />
      <div class="overlay-playlist">
        <div class="text-slate-100 mb-1 font-semibold">
          {{ formatViews(playlist.videos) }}
        </div>
        <UnorderedListOutlined class="text-xl text-slate-100" />
      </div>
    </div>

    <!-- INFO -->
    <div class="flex w-full items-center mt-1">
      <div class="flex flex-col">
        <!-- title content -->
        <div class="title-video">{{ playlist.name }}</div>
        <!-- detail -->
        <a
          :href="`${playlist.url}`"
          class="text-[#858585] hover:text-black font-medium"
        >
          Xem toàn bộ danh sách
        </a>
      </div>
    </div>
  </a>
</template>

<style scoped lang="scss">
.playlist-item {
  @apply flex flex-col justify-start items-center;
  @apply w-fit mx-2 mb-7 rounded-xl cursor-pointer;

  &:hover {
    color: initial;
  }
}

.overlay-playlist {
  position: absolute;
  width: 40%;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
