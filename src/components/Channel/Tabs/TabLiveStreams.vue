<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import { getTabsData } from '@/api/piped'
import type { ITabLiveStream, ILiveStream } from '@/api/model/piped'

const props = defineProps<{
  data: string
}>()

const route = useRoute()
const channelId = computed(() => route.params.id.toString())
const livestreamData = ref<ILiveStream[]>([])
const dataNextPage = ref('')

const { isLoading } = useQuery({
  enabled: !!unref(channelId) && !!props.data,
  queryKey: ['shorts', unref(channelId), props.data],
  queryFn: () => getTabsData<ITabLiveStream>(props.data),
  select(data) {
    livestreamData.value = data.content
    dataNextPage.value = data.nextpage
  },
})

const { mutate, isPending } = useMutation({
  mutationKey: ['nextpage', dataNextPage.value],
  mutationFn: (params: { data: string; nextpage: string }) =>
    getTabsData<ITabLiveStream>(params.data, params.nextpage),
  onSuccess(data) {
    livestreamData.value = [...livestreamData.value, ...data.content]
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
</script>

<template>
  <div v-if="isLoading" class="w-full h-full center">
    <a-spin size="large" />
  </div>
  <div
    v-else-if="!livestreamData || !livestreamData.length"
    class="w-full center"
  >
    <EmptyData description="Kênh này chưa có video nào" />
  </div>
  <VideoList :data="livestreamData" :is-detail="false" class="livestream" />
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
</template>
