<script setup lang="ts">
defineProps({
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
      <VideoItem
        v-for="n in 50"
        :key="n"
        :detail="isDetail"
        :playlist="isPlaylist"
      />
    </slot>
  </div>
</template>

<style scoped lang="scss">
.video-grid {
  display: grid;
  column-gap: normal;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 1.25rem;
  &.short-list {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  &.playlist {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

// Responsive
@media (max-width: 1280px) {
  .video-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 1024px) {
  .video-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 1.5rem;
  }
}
@media (max-width: 640px) {
  .video-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
