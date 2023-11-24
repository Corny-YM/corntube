<script setup lang="ts">
import { IPlaylist } from '@/api/model/piped'
import { randomItem } from '@/utils'

const props = defineProps<{
  data: IPlaylist
}>()

const router = useRouter()
const route = useRoute()

const hiddenVideos = ref(0)

const playlistId = computed(() => route.query.list)
const totalViews = computed(() =>
  props.data.relatedStreams.reduce((total, cur) => {
    return total + cur.views
  }, 0)
)

const url = computed(() => {
  if (!(props.data.relatedStreams.length > 0)) return ''
  const url = props.data.relatedStreams[0].url
  const videoId = url.split('=')[1]
  return `/watch?v=${videoId}&list=${unref(playlistId)!}`
})

const handleRandomUrl = () => {
  if (!props.data.relatedStreams.length) return
  const item = randomItem(props.data.relatedStreams)
  const videoId = item.url.split('=')[1]
  router.push({
    path: '/watch',
    query: {
      v: videoId,
      list: unref(playlistId)?.toString(),
    },
  })
}

const hiddenVisible = computed(() => {
  const length = props.data.relatedStreams.length
  const quantity = props.data.videos
  if (length < quantity) {
    hiddenVideos.value = quantity - length
    return true
  }
  return false
})
</script>

<template>
  <div
    class="w-full h-full flex flex-col lg:flex-row justify-between items-center lg:py-6 overflow-y-auto"
  >
    <div v-if="hiddenVisible" class="banner-hidden-video !flex lg:!hidden">
      Đã ẩn {{ hiddenVideos }} video không xem được
    </div>
    <!-- Info -->
    <PlaylistInfo
      :title="data.name"
      :thumbnail="data.thumbnailUrl"
      :uploader="data.uploader"
      :uploaderUrl="data.uploaderUrl"
      :videos="data.videos"
      :views="totalViews"
      :url="url"
      @click="handleRandomUrl"
    />

    <!-- playlist -->
    <div
      class="w-full h-fit lg:h-full flex flex-col justify-start items-start mb-5 lg:pr-4 lg:overflow-auto"
    >
      <div v-if="hiddenVisible" class="banner-hidden-video lg:!flex !hidden">
        Đã ẩn {{ hiddenVideos }} video không xem được
      </div>
      <!-- List Videos -->
      <PlaylistVideoItem
        v-for="(video, index) in data.relatedStreams"
        :key="video.url"
        :video="video"
        :index="index + 1"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner-hidden-video {
  @apply flex justify-center items-center;
  @apply flex-1 min-h-[56px];
  @apply lg:ml-9 lg:mb-2 self-stretch;
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
