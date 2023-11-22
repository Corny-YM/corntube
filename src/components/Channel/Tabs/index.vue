<script setup lang="ts">
import { TabsProps } from 'ant-design-vue'
import { htmlRender } from '@/utils/index'
import { ITrending } from '@/api/model/piped'
import TabVideos from './TabVideos.vue'
import TabShorts from './TabShorts.vue'
import TabPlaylist from './TabPlaylist.vue'
import TabChannel from './TabChannel.vue'

defineProps<{
  channelId: string
  tabs: {
    name: string
    data: string
  }[]
  relatedStreams: ITrending[]
  description: string
  nextpage: string
  loading: boolean
}>()

const emits = defineEmits(['click'])

const mode = ref<TabsProps['tabPosition']>('top')

const tabName = (name: string) => {
  if (name === 'shorts') return 'Shorts'
  if (name === 'playlists') return 'Danh sách phát'
  if (name === 'channels') return 'Kênh'
  if (name === 'livestreams') return 'Live streams'
}

const activeTabKey = ref('videos')
</script>

<template>
  <a-tabs
    v-model:activeKey="activeTabKey"
    :tab-position="mode"
    class="custom-tabs"
  >
    <a-tab-pane key="videos" class="font-medium">
      <template #tab><div class="tab-item font-medium">Videos</div></template>
      <div
        v-if="!relatedStreams || !relatedStreams.length"
        class="w-full center"
      >
        <EmptyData description="Kênh này chưa có video nào" />
      </div>
      <TabVideos v-else :videos="relatedStreams" />
      <div v-if="nextpage" class="w-full center mb-4">
        <a-button
          :loading="loading"
          type="dashed"
          shape="round"
          @click="emits('click')"
        >
          Tải thêm
        </a-button>
      </div>
    </a-tab-pane>

    <!-- Generated Tab -->
    <a-tab-pane v-for="tab in tabs" :key="tab.name">
      <template #tab>
        <div class="tab-item font-medium">{{ tabName(tab.name) }}</div>
      </template>
      <TabShorts v-if="tab.name === 'shorts'" :data="tab.data" />
      <TabPlaylist v-if="tab.name === 'playlists'" :data="tab.data" />
      <TabChannel v-if="tab.name === 'channels'" :data="tab.data" />
      <TabLiveStreams v-if="tab.name === 'livestreams'" :data="tab.data" />
    </a-tab-pane>

    <a-tab-pane key="about">
      <template #tab>
        <div class="tab-item font-medium">Giới thiệu</div>
      </template>
      <span v-html="htmlRender(description)" class="pb-8"></span>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped lang="scss">
.custom-tabs {
  @media (max-width: 640px) {
    width: calc(100vw - 16px);
  }
}

.tab-item {
  @apply md:px-4 lg:px-8;
}
</style>
