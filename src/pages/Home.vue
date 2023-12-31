<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useApp } from '@/store/app'
import { messagePopup, randomItem } from '@/utils'
import { ITrending, Type } from '@/api/model/piped'
import { getStreams, getTrending } from '@/api/piped'
import VideoList from '@/components/Videos/VideoList.vue'

const app = useApp()
const { currentCountry } = storeToRefs(app)

const trendingData = ref<ITrending[]>([])

const { isLoading } = useQuery({
  queryKey: ['trending'],
  queryFn: () =>
    getTrending({
      region: currentCountry.value,
    }),
  refetchOnWindowFocus: false,
  select(data) {
    trendingData.value = data
  },
})

const { mutate, isPending } = useMutation({
  mutationKey: ['relatedStream', 'more'],
  mutationFn: getStreams,
  onSuccess(data) {
    const arr = data.relatedStreams.filter(
      (stream) => stream.type === Type.Stream
    ) as ITrending[]

    trendingData.value = [...unref(trendingData), ...arr]
  },
  onError() {
    messagePopup({ type: 'error' })
  },
})

const handleRandomUrl = () => {
  if (!trendingData.value.length) return
  const item = randomItem(trendingData.value)
  const videoId = item.url.split('=')[1]
  mutate(videoId)
}
</script>

<template>
  <div v-if="isLoading" class="w-full h-full center">
    <a-spin size="large" />
  </div>
  <div v-else-if="!trendingData || !trendingData.length" class="h-full center">
    <EmptyData />
  </div>
  <template v-else>
    <div class="w-full h-full overflow-auto">
      <VideoList :data="trendingData" class="!overflow-visible !h-fit" />
      <div class="w-full center pb-4">
        <a-button
          class="font-semibold dark:bg-headerDark dark:text-lightText"
          type="dashed"
          shape="round"
          size="large"
          :loading="isPending"
          @click="handleRandomUrl"
        >
          Tải thêm
        </a-button>
      </div>
    </div>
  </template>
</template>

<style scoped lang="scss"></style>
