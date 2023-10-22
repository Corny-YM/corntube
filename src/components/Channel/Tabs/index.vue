<script setup lang="ts">
import TabVideos from './TabVideos.vue'
import TabShorts from './TabShorts.vue'
import TabPlaylist from './TabPlaylist.vue'
import TabChannel from './TabChannel.vue'
import TabAbout from './TabAbout.vue'

const activeTabKey = ref('video')
</script>

<template>
  <div class="w-full px-24">
    <a-tabs v-model:activeKey="activeTabKey" class="w-full" @tabScroll="">
      <a-tab-pane key="video" class="font-medium">
        <template #tab><div class="px-8 font-medium">Videos</div></template>
        <TabVideos />
      </a-tab-pane>
      <a-tab-pane key="short" class="font-medium">
        <template #tab><div class="px-8 font-medium">Shorts</div></template>
        <TabShorts />
      </a-tab-pane>
      <a-tab-pane key="playlist" class="font-medium">
        <template #tab>
          <div class="px-8 font-medium">Danh sách phát</div>
        </template>
        <TabPlaylist />
      </a-tab-pane>
      <a-tab-pane key="channel" class="font-medium">
        <template #tab><div class="px-8 font-medium">Kênh</div></template>
        <TabChannel />
      </a-tab-pane>
      <a-tab-pane key="about" class="font-medium">
        <template #tab><div class="px-8 font-medium">Giới thiệu</div></template>
        <TabAbout />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
