<script setup lang="ts">
import { ITrending } from '@/api/model/piped'

defineProps({
  data: {
    type: Array<ITrending>,
  },
  isDetail: {
    type: Boolean,
    default: true,
  },
  isPlaylist: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="w-full h-full overflow-y-auto pt-4 pb-4 video-grid">
    <slot name="item">
      <template v-for="video in data" :key="video.url">
        <VideoItem
          v-if="!video.isShort"
          :detail="isDetail"
          :playlist="isPlaylist"
          :video="video"
        />
      </template>
    </slot>
  </div>
</template>

<style scoped lang="scss">
.video-grid {
  display: grid;
  column-gap: normal;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 1.25rem;

  &.short-list, &.channel, &.livestream {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    padding-bottom: 0px;
  }
  &.playlist {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

// Responsive
@media (max-width: 1280px) {
  .video-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  }
}
@media (max-width: 1024px) {
  .video-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
}
@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    column-gap: auto;
  }
}
@media (max-width: 640px) {
  .video-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
