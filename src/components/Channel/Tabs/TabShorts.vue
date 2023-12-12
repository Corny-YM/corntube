<script setup lang="ts">
import { getTabsData } from '@/api/piped'
import type { IShort, ITabShort } from '@/api/model/piped'
import { useMutation, useQuery } from '@tanstack/vue-query'

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
  queryFn: () => getTabsData<ITabShort>(props.data),
  select(data) {
    shortsData.value = data.content
    dataNextPage.value = data.nextpage
  },
})

const { mutate, isPending } = useMutation({
  mutationKey: ['nextpage', dataNextPage.value],
  mutationFn: (params: { data: string; nextpage: string }) =>
    getTabsData<ITabShort>(params.data, params.nextpage),
  onSuccess(data) {
    shortsData.value = [...shortsData.value, ...data.content]
    dataNextPage.value = data.nextpage || ''
  },
})

const handleLoadNextPage = () => {
  if (!unref(dataNextPage)) return
  mutate({
    data: props.data,
    nextpage: dataNextPage.value,
  })
}

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
    <EmptyData description="Kênh này chưa có shorts nào" />
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
  <div v-if="dataNextPage" class="w-full center pb-4">
    <a-button
      class="dark:bg-headerDark dark:text-lightText"
      type="dashed"
      shape="round"
      :loading="isPending"
      @click="handleLoadNextPage"
    >
      Tải thêm
    </a-button>
  </div>
  <TabShortsModal :key="shortUrl" v-model:open="open" :url="shortUrl" />
</template>
