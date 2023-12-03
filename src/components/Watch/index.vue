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

const isDesktopSize = ref(false)
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

const handleCheckWindowWidth = () => {
  if (window.innerWidth <= 1024) isDesktopSize.value = false
  else isDesktopSize.value = true
}

onMounted(() => {
  handleCheckWindowWidth()
  window.addEventListener('resize', handleCheckWindowWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleCheckWindowWidth)
})
</script>

<template>
  <div
    class="px-6 lg:px-9 flex w-full h-full pt-6 justify-center overflow-auto"
  >
    <!-- Content Watch Stream -->
    <div class="w-full lg:w-3/5 lg:pr-6 mb-3">
      <!-- Video -->
      <div class="center overflow-hidden rounded-xl mb-3 aspect-video bg-black">
        <video
          class="w-full h-full"
          ref="videoRef"
          :src="videoSrc"
          type="video/*"
          controls
        ></video>
      </div>

      <!-- Detail -->
      <div class="flex flex-col justify-center">
        <div class="title mb-2">{{ data.title }}</div>

        <div class="flex justify-between items-center flex-wrap">
          <div class="center mr-2">
            <a :href="channelUrl" class="w-10 h-10 rounded-full">
              <a-avatar
                :src="data.uploaderAvatar + 123"
                class="w-10 h-10 center object-cover aspect-square"
              >
                <NoAvatar />
              </a-avatar>
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

          <div class="flex flex-wrap sm:flex-nowrap pt-4">
            <a-button :icon="h(LikeOutlined)" class="center mb-2">
              {{ formatViews(data.likes, 0) }} Like
            </a-button>
            <a-button
              :icon="h(DislikeOutlined)"
              class="center mb-2 ml-1 md:ml-2"
            >
              {{ formatViews(data.dislikes, 0) }} Dislike
            </a-button>
            <a-button type="primary" class="font-medium mb-2 ml-1 md:ml-2"
              >Đăng ký</a-button
            >
            <a-button
              :icon="h(DownloadOutlined)"
              shape="round"
              class="block lg:hidden mb-2 ml-1 md:ml-2"
            >
              Download
            </a-button>
          </div>
        </div>

        <div class="flex justify-between items-center mt-3">
          <a-typography-text code>
            {{ formatViews(data.views) }} lượt xem | Đã công chiếu vào
            {{ formatDate(new Date(data.uploadDate), 'DD-MM-YYYY hh:mm:ss') }}
          </a-typography-text>
          <a-button
            :icon="h(DownloadOutlined)"
            shape="round"
            class="lg:block hidden"
          >
            Download
          </a-button>
        </div>

        <!-- Detail Description -->
        <div class="my-3">
          <Detail :description="data.description" />
        </div>

        <!-- Playlist -->
        <template v-if="!isDesktopSize">
          <div v-if="isLoading" class="w-full center mt-1 mb-6">
            <a-spin size="large" />
          </div>
          <VideosPlaylist
            v-else-if="!!playlistData && !!Object.keys(playlistData).length"
            :listId="listId?.toString()"
            :data="playlistData"
          />
        </template>

        <!-- Chapters Mobile -->
        <template v-if="!isDesktopSize">
          <Chapters
            v-if="!!data.chapters.length && !playlistData"
            :chapters="data.chapters"
          />
        </template>

        <!-- List Videos Tablet to Mobile -->
        <div class="block lg:hidden w-full min-w-[300px]">
          <ListVideos
            :key="videoId.toString()"
            :relatedStreams="data.relatedStreams"
          />
        </div>

        <!-- List Comments -->
        <div class="heading-comment">Comments</div>
        <Comments
          :key="videoId.toString()"
          :authorData="{
            name: data.uploader,
            avatar: data.uploaderAvatar,
          }"
        />
      </div>
    </div>

    <div class="flex flex-col">
      <!-- Playlist -->
      <template v-if="isDesktopSize">
        <div v-if="isLoading" class="w-full center mt-1 mb-6">
          <a-spin size="large" />
        </div>
        <VideosPlaylist
          v-else-if="!!playlistData && !!Object.keys(playlistData).length"
          :listId="listId?.toString()"
          :data="playlistData"
        />
      </template>

      <!-- Chapters -->
      <template v-if="isDesktopSize">
        <Chapters
          v-if="!!data.chapters.length && !playlistData"
          :chapters="data.chapters"
        />
      </template>

      <!-- List Videos Desktop -->
      <div class="hidden lg:block w-[402px] min-w-[300px] pr-6">
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
  @apply text-lg;
  @apply font-medium;
}
</style>
