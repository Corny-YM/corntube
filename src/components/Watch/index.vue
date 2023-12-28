<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { h } from 'vue'
import {
  DislikeOutlined,
  DownloadOutlined,
  LikeOutlined,
  ShareAltOutlined,
} from '@ant-design/icons-vue'
import { useQuery } from '@tanstack/vue-query'
import { useAuth } from '@/store/auth'
import { formatViews, formatDate } from '@/utils'
import { getPlaylist } from '@/api/piped'
import { IPlaylist, IStreams, Type } from '@/api/model/piped'
import PlaylistAdd from '@/components/Icons/PlaylistAdd.vue'

const props = defineProps<{
  data: IStreams
}>()

const route = useRoute()
const auth = useAuth()
const { user, subscribedChannel } = storeToRefs(auth)

const openModalDownload = ref(false)
const openModalShare = ref(false)
const openModalAddPlaylist = ref(false)
const isDesktopSize = ref(false)
const playlistData = ref<IPlaylist | null>(null)

const videoId = computed(() => route.query.v!)
const listId = computed(() => route.query.list!)
const channelUrl = computed(() => props.data.uploaderUrl)
const channelId = computed(() => props.data.uploaderUrl.split('/')[2])
const videoSrc = computed(() => {
  const arrVideos = props.data?.videoStreams.filter((video) => !video.videoOnly)
  const selectedVideo =
    arrVideos?.sort((a, b) => parseInt(b.quality) - parseInt(a.quality)) || []
  return selectedVideo[0]?.url
})
const isSubscribed = computed(() => {
  const item = subscribedChannel.value.find((channel) => {
    const curChannelId = channelId.value.toString()
    return curChannelId === channel.channel_id
  })
  return item ? true : false
})
const mp3Options = computed(() => {
  const audioStreams = props.data.audioStreams.sort(
    (a, b) => parseInt(b.quality) - parseInt(a.quality)
  )
  return audioStreams.map((audio) => ({
    value: audio.url,
    label: audio.quality,
  }))
})
const mp4Options = computed(() => {
  const videoStreams = props.data.videoStreams
    ?.filter((video) => !video.videoOnly)
    .sort((a, b) => parseInt(b.quality) - parseInt(a.quality))
  return videoStreams.map((video) => ({
    value: video.url,
    label: video.quality,
  }))
})
const video = computed(() => ({
  duration: props.data.duration,
  shortDescription: props.data.description,
  thumbnail: props.data.thumbnailUrl,
  title: props.data.title,
  uploadedDate: props.data.uploadDate,
  uploaderAvatar: props.data.uploaderAvatar,
  uploaderName: props.data.uploader,
  uploaderUrl: props.data.uploaderUrl,
  uploaderVerified: props.data.uploaderVerified,
  url: route.fullPath,
  views: props.data.views,
}))

const { isLoading } = useQuery({
  enabled: !!unref(listId),
  queryKey: ['playlist', unref(listId)?.toString()],
  queryFn: () => getPlaylist(unref(listId)),
  select(data) {
    playlistData.value = data
  },
})

const handleSubscribed = () => {
  const data = {
    description: props.data.description,
    name: props.data.uploader,
    subscribers: props.data.uploaderSubscriberCount,
    thumbnail: props.data.uploaderAvatar,
    type: Type.Channel,
    url: props.data.uploaderUrl,
    verified: props.data.uploaderVerified,
    videos: -1,
  }
  auth.createSubscribed({
    user_id: user.value?.id!,
    channel_id: channelId.value.toString(),
    subscriber: JSON.stringify(data),
  })
}
const handleClickSubscription = () => {
  if (isSubscribed.value) {
    if (!user.value) return
    auth.removeSubscribed({
      user_id: user.value.id!,
      channel_id: channelId.value.toString(),
    })
  } else handleSubscribed()
}
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
          <div class="center mr-2 dark:text-lightText">
            <a :href="channelUrl" class="w-10 h-10 rounded-full">
              <a-avatar
                :src="data.uploaderAvatar + 123"
                class="w-10 h-10 center object-cover aspect-square dark:bg-sidebarDark"
              >
                <NoAvatar />
              </a-avatar>
            </a>
            <div class="ml-3">
              <div class="flex items-center">
                <a :href="channelUrl" class="font-medium">
                  {{ data.uploader }}
                </a>
                <div v-if="data.uploaderVerified" class="w-4 h-4 ml-2 center">
                  <check-circle />
                </div>
              </div>
              <div v-if="data.uploaderSubscriberCount > 0" class="text-sm mt-1">
                {{ formatViews(data.uploaderSubscriberCount) }} người đăng ký
              </div>
            </div>
          </div>

          <div class="flex flex-wrap sm:flex-nowrap pt-4">
            <a-button
              :icon="h(LikeOutlined)"
              class="center mb-2 dark:text-darkTitle dark:bg-headerDark"
            >
              {{ formatViews(data.likes, 0) }} Like
            </a-button>
            <a-button
              :icon="h(DislikeOutlined)"
              class="center mb-2 ml-1 md:ml-2 dark:text-darkTitle dark:bg-headerDark"
            >
              {{ formatViews(data.dislikes, 0) }} Dislike
            </a-button>
            <a-button
              class="font-medium mb-2 ml-1 md:ml-2 dark:text-lightText"
              :class="isSubscribed ? 'dark:bg-headerDark' : ''"
              :type="isSubscribed ? 'dashed' : 'primary'"
              @click.prevent="handleClickSubscription"
            >
              {{ isSubscribed ? 'Đã đăng ký' : 'Đăng ký' }}
            </a-button>
          </div>
        </div>

        <div class="flex flex-wrap-reverse justify-between items-center mt-3">
          <a-typography-text code class="dark:text-lightText py-2">
            {{ formatViews(data.views) }} lượt xem | Đã công chiếu vào
            {{ formatDate(new Date(data.uploadDate), 'DD-MM-YYYY hh:mm:ss') }}
          </a-typography-text>
          <div class="flex items-center">
            <ActionButton
              title="Chia sẻ"
              :icon="h(ShareAltOutlined)"
              @click="openModalShare = true"
            />
            <ActionButton
              title="Download"
              :icon="h(DownloadOutlined)"
              @click="openModalDownload = true"
            />
            <a-tooltip
              v-if="user"
              title="Thêm vào Playlist"
              :mouse-leave-delay="0"
            >
              <ActionButton
                :icon="h(PlaylistAdd)"
                shape="circle"
                @click="openModalAddPlaylist = true"
              />
            </a-tooltip>
          </div>
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

    <ModalAddPlaylist
      v-if="user"
      v-model:open="openModalAddPlaylist"
      :video="video"
    />
    <ModalShare v-model:open="openModalShare" />
    <ModalDownload
      v-model:open="openModalDownload"
      :options="{
        mp3: mp3Options,
        mp4: mp4Options,
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
.title {
  @apply text-lg;
  @apply font-medium;
  @apply dark:text-lightHover text-[#0F0F0F];
}

.heading-comment {
  @apply flex items-center pl-2 mt-7 mb-4;
  @apply h-8 text-lg font-semibold dark:text-lightText;
  border-left: 3px solid #1677ff;
}
</style>
