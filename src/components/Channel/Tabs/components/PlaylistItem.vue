<script setup lang="ts">
import { UnorderedListOutlined } from '@ant-design/icons-vue'
import { IPlaylistContent } from '@/api/model/piped'
import { formatViews } from '@/utils'
import NoThumbnail from '@/assets/imgs/NoThumbnail.png'

const props = defineProps<{
  playlist: IPlaylistContent
}>()

const emits = defineEmits<{
  (e: 'click', value: string): void
}>()

const srcThumbnail = ref(props.playlist.thumbnail)

const handleError = () => {
  srcThumbnail.value = NoThumbnail
}
</script>

<template>
  <div
    :key="playlist.url"
    class="playlist-item"
    @click="emits('click', playlist.url)"
  >
    <!-- IMG -->
    <div class="relative flex justify-center rounded-xl overflow-hidden">
      <img
        :src="srcThumbnail"
        class="w-full h-full aspect-video bg-[#d9d9d9]"
        loading="lazy"
        @error="handleError"
      />
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
          class="text-[#858585] hover:text-black dark:hover:text-lightText font-medium"
          @click.stop=""
        >
          Xem toàn bộ danh sách
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.playlist-item {
  @apply flex flex-col justify-start items-center;
  @apply w-auto mx-2 mb-7 rounded-xl cursor-pointer;

  &:hover {
    @apply dark:text-lightText;
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
