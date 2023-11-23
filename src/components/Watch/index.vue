<script setup lang="ts">
import { h } from 'vue'
import {
  DislikeOutlined,
  DownloadOutlined,
  LikeOutlined,
} from '@ant-design/icons-vue'
import { useQuery } from '@tanstack/vue-query'
import { formatViews, formatDate } from '@/utils'
import { getPlaylist } from '@/api/piped'
import { IPlaylist, IStreams } from '@/api/model/piped'

const props = defineProps<{
  data: IStreams
}>()

const route = useRoute()

const playlistData = ref<IPlaylist | null>(null)

const videoId = computed(() => route.query.v!)
const listId = computed(() => route.query.list!)
const channelUrl = computed(() => props.data.uploaderUrl)
const videoSrc = computed(() => {
  const arrVideos = props.data?.videoStreams.filter((video) => !video.videoOnly)
  const selectedVideo =
    arrVideos?.sort((a, b) => parseInt(b.quality) - parseInt(a.quality)) || []
  return selectedVideo[0]?.url
})

const { isLoading } = useQuery({
  enabled: !!unref(listId),
  queryKey: ['playlist', unref(listId)?.toString()],
  queryFn: () => getPlaylist(unref(listId)),
  select(data) {
    playlistData.value = data
  },
})
</script>

<template>
  <div class="px-9 flex w-full h-full pt-6 justify-center overflow-auto">
    <!-- Content -->
    <div class="w-3/5 pr-6 mb-3">
      <div class="center overflow-hidden rounded-xl mb-3 aspect-video bg-black">
        <video
          class="w-full h-full"
          ref="videoRef"
          :src="videoSrc"
          type="video/*"
          controls
        ></video>
      </div>

      <!-- detail -->
      <div class="flex flex-col justify-center">
        <div class="title mb-2">{{ data.title }}</div>

        <div class="flex justify-between items-center flex-wrap">
          <div class="center">
            <a :href="channelUrl" class="w-10 h-10 rounded-full">
              <a-avatar
                :src="data.uploaderAvatar"
                class="w-full h-full object-cover"
              />
            </a>
            <div class="ml-3">
              <a :href="channelUrl" class="font-medium">
                {{ data.uploader }}
              </a>
              <div v-if="data.uploaderSubscriberCount > 0" class="text-sm mt-1">
                {{ formatViews(data.uploaderSubscriberCount) }} người đăng ký
              </div>
            </div>
          </div>

          <div class="flex gap-1 pt-4 pb-2">
            <a-button :icon="h(LikeOutlined)" class="center">
              {{ formatViews(data.likes, 0) }} Like
            </a-button>
            <a-button :icon="h(DislikeOutlined)" class="center">
              {{ formatViews(data.dislikes, 0) }} Dislike
            </a-button>
            <a-button type="primary" class="font-medium ml-2">Đăng ký</a-button>
            <a-button :icon="h(DownloadOutlined)" shape="round" class="block lg:hidden ml-2">
              Download
            </a-button>
          </div>
        </div>

        <div class="flex justify-between items-center mt-3">
          <a-typography-text code>
            {{ formatViews(data.views) }} lượt xem | Đã công chiếu vào
            {{ formatDate(new Date(data.uploadDate), 'DD-MM-YYYY hh:mm:ss') }}
          </a-typography-text>
          <a-button :icon="h(DownloadOutlined)" shape="round" class="lg:block hidden">
            Download
          </a-button>
        </div>

        <div class="my-3">
          <Detail :description="data.description" />
        </div>

        <div class="heading-comment">Comments</div>
        <Comments :key="videoId.toString()" />
      </div>
    </div>

    <div class="flex flex-col">
      <!-- Playslist -->
      <div v-if="isLoading" class="w-full center mt-1 mb-6">
        <a-spin size="large" />
      </div>
      <VideosPlaylist
        v-else-if="!!playlistData && !!Object.keys(playlistData).length"
        :listId="listId?.toString()"
        :data="playlistData"
      />

      <!-- Chapters -->
      <Chapters
        v-if="!!data.chapters.length && !playlistData"
        :chapters="data.chapters"
      />

      <!-- List Videos -->
      <div class="w-[402px] min-w-[300px] pr-6">
        <ListVideos
          :key="videoId.toString()"
          :relatedStreams="data.relatedStreams"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  @apply text-sm sm:text-base md:text-lg;
  @apply font-medium;
}
</style>
