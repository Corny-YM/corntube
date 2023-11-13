<script setup lang="ts">
import { IPlaylist } from '@/api/model/piped'
import { randomItem } from '@/utils'

const props = defineProps<{
  data: IPlaylist
}>()

const router = useRouter()
const route = useRoute()
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
</script>

<template>
  <div class="w-full h-full flex justify-between items-center py-6">
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
      class="w-full h-full flex flex-col justify-start items-start mr-6 overflow-auto"
    >
      <!-- List Videos -->
      <PlaylistVideoItem v-for="n in 8" :key="n" :index="n" />
    </div>
  </div>
</template>
