<script setup lang="ts">
defineProps<{
  index: number
}>()
</script>

<template>
  <div class="playlist-video--item">
    <div class="w-9 font-medium text-center">{{ index }}</div>
    <div class="center w-40 rounded-2xl overflow-hidden aspect-video mr-2">
      <a-image
        :preview="false"
        src="https://i.ytimg.com/vi/5891KdSrQeo/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB0Fa8Hs6UzuQcm1ypVpKmWi80M3w"
      ></a-image>
    </div>
    <div class="flex-1 flex flex-col">
      <div class="max-h-[44px] text-base line-clamp-2 font-medium">
        STUDY WITH ME 👩🏼‍💻/ piano music for studying, working, focusing - my
        favorite piano playli STUDY WITH ME 👩🏼‍💻/ piano music for studying,
        working, focusing - my favorite piano playl STUDY WITH ME 👩🏼‍💻/ piano
        music for studying, working, focusing - my favorite piano playl STUDY
        WITH ME 👩🏼‍💻/ piano music for studying, working, focusing - my favorite
        piano playl STUDY WITH ME 👩🏼‍💻/ piano music for studying, working,
        focusing - my favorite piano playlist
      </div>
      <div class="text-xs text-[#606060]">
        Ashleyngusi <span>•</span> 97 N lượt xem <span>•</span> 2 năm trước
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.playlist-video--item {
  @apply flex justify-start items-center py-2 pr-4 cursor-pointer rounded-2xl;
  transition: all 150ms ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
</style>
