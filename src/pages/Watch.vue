<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getStreams } from '@/api/piped'
import { IStreams } from '@/api/model/piped'
import { useLocalDBStore } from '@/store/localDB'
import Watch from '@/components/Watch/index.vue'

const route = useRoute()
const { insert } = useLocalDBStore()

const videoId = computed(() => route.query.v)
const enabled = computed(() => !!route.query.v)

const streamsData = ref<IStreams | null>(null)

const { isLoading, refetch } = useQuery({
  queryKey: ['streams', unref(videoId)],
  queryFn: () => {
    return getStreams(unref(videoId))
  },
  enabled: !!unref(enabled),
  refetchOnWindowFocus: false,
  select(data) {
    streamsData.value = data
    insert({
      id: unref(videoId)?.toString()!,
      url: `/watch?v=${unref(videoId)}`,
      title: data.title,
      duration: data.duration,
      description: data.description,
      thumbnailUrl: data.thumbnailUrl,
      uploadDate: data.uploadDate,
      uploader: data.uploader,
      uploaderUrl: data.uploaderUrl,
      uploaderVerified: data.uploaderVerified,
      uploaderAvatar: data.uploaderAvatar,
      views: data.views,
      timestamp: new Date().getTime(),
    })
  },
})

watch(
  () => unref(videoId),
  () => {
    if (!!unref(videoId)) refetch()
  }
)
</script>

<template>
  <div v-if="isLoading" class="w-full h-full center">
    <a-spin size="large" />
  </div>
  <div v-else-if="!streamsData" class="h-full center">
    <EmptyData />
  </div>
  <Watch v-else :data="streamsData" />
</template>

<style scoped lang="scss">
.title {
  white-space: normal;
  word-break: break-word;
  font-size: 20px;
  line-height: 2.8rem;
  font-weight: 500;
}
</style>
