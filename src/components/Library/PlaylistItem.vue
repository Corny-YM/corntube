<script setup lang="ts">
import { UnorderedListOutlined } from '@ant-design/icons-vue'
import { formatViews } from '@/utils'
import NoThumbnail from '@/assets/imgs/NoThumbnail.png'
import { IAddUserPlaylistItem } from '@/api/model/supabase'

const props = defineProps<{
  playlist: {
    id: number
    name: string | null
    PlaylistItem: IAddUserPlaylistItem[]
  }
}>()

const emits = defineEmits<{
  (e: 'click', value: number): void
}>()

const thumbnail = computed(() => props.playlist.PlaylistItem?.[0]?.thumbnail)
const srcThumbnail = ref(thumbnail.value || NoThumbnail)

const handleError = () => {
  srcThumbnail.value = NoThumbnail
}
</script>

<template>
  <div
    :key="playlist.id"
    class="playlist-item"
    @click="emits('click', playlist.id)"
  >
    <!-- IMG -->
    <div class="w-full relative flex justify-center rounded-xl overflow-hidden">
      <img
        :src="srcThumbnail"
        class="w-full h-full aspect-video bg-[#d9d9d9]"
        loading="lazy"
        @error="handleError"
      />
      <div class="overlay-playlist">
        <div class="text-slate-100 mb-1 font-semibold">
          {{ formatViews(playlist.PlaylistItem?.length || 0) }}
        </div>
        <UnorderedListOutlined class="text-xl text-slate-100" />
      </div>
    </div>

    <!-- INFO -->
    <div class="flex w-full items-center mt-2">
      <div class="flex flex-col">
        <!-- title content -->
        <div class="title-video">Danh sách kết hợp - {{ playlist.name }}</div>
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
