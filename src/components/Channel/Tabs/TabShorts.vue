<script setup lang="ts">
import { getTabsData } from '@/api/piped'
import type { IShort } from '@/api/model/piped'
import { useQuery } from '@tanstack/vue-query'

const props = defineProps<{
  data: string
}>()

const route = useRoute()

const channelId = computed(() => route.params.id.toString())
const shortsData = ref<IShort[]>([])
const dataNextPage = ref('')
const open = ref(false)
const shortUrl = ref('')

const { isLoading } = useQuery({
  enabled: !!unref(channelId) && !!props.data,
  queryKey: ['shorts', unref(channelId), props.data],
  queryFn: () => getTabsData(props.data),
  select(data) {
    shortsData.value = data.content
    dataNextPage.value = data.nextpage
  },
})

const openModal = (url: string) => {
  if (url) {
    open.value = true
    shortUrl.value = url.split('=')[1]
  }
}
</script>

<template>
  <div v-if="isLoading" class="w-full h-full center">
    <a-spin size="large" />
  </div>
  <div v-else-if="!shortsData || !shortsData.length" class="h-full center">
    <a-empty description="Kênh này chưa có shorts nào" />
  </div>
  <VideoList v-else class="short-list">
    <template #item>
      <ShortVideo
        v-for="short in shortsData"
        :key="short.url"
        :short="short"
        @click="openModal"
      />
    </template>
  </VideoList>
  <div v-if="dataNextPage" class="w-full center mb-4">
    <a-button :type="true ? 'primary' : undefined" shape="round">
      Tải thêm
    </a-button>
  </div>
  <TabShortsModal :key="shortUrl" v-model:open="open" :url="shortUrl" />
</template>
