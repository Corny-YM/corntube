<script setup lang="ts">
import { CaretRightOutlined } from '@ant-design/icons-vue'
import { IPlaylist } from '@/api/model/piped'
import { formatDuration } from '@/utils'

const props = defineProps<{
  listId: string
  data: IPlaylist
}>()

const router = useRouter()
const route = useRoute()

const refVideos = ref<HTMLDivElement[]>([])
const hiddenVideos = ref(0)
const activePlaylist = ref(true)

const currentVideoId = computed(() => route.query.v!)
const playlistUrl = computed(() => `/playlist?list=${props.listId}`)
const hiddenVisible = computed(() => {
  const length = props.data.relatedStreams.length
  const quantity = props.data.videos
  if (length < quantity) {
    hiddenVideos.value = quantity - length
    return true
  }
  return false
})
const isActive = (url: string) => {
  const videoId = url.split('=')[1]
  if (unref(currentVideoId) === videoId) return 'active'
  return ''
}

const handleClickVideo = (url: string) => {
  const videoId = url.split('=')[1]
  router.push({
    path: '/watch',
    query: {
      v: videoId,
      list: props.listId,
    },
  })
}

onMounted(() => {
  const arrList = unref(refVideos)
  arrList.forEach((element) => {
    if (!element.className.includes('active')) return
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })
  })
})
</script>

<template>
  <div class="videos-playlist">
    <!-- content -->
    <div class="w-full flex justify-between items-center px-4">
      <div class="flex flex-col justify-center">
        <a :href="playlistUrl" class="title mb-1 cursor-pointer">
          {{ data.name }}
        </a>
        <a :href="data.uploaderUrl" class="author cursor-pointer">{{
          data.uploader
        }}</a>
      </div>
      <CaretRightOutlined
        class="icon"
        :class="activePlaylist ? 'active' : ''"
        @click.stop.prevent="activePlaylist = !activePlaylist"
      />
    </div>

    <div class="list" :class="activePlaylist ? 'active' : ''">
      <a
        v-for="(video, index) in data.relatedStreams"
        ref="refVideos"
        class="video-item"
        :class="isActive(video.url) ? 'active' : ''"
        :href="`${video.url}&list=${listId}`"
        :data-url="video.url"
        @click.prevent="handleClickVideo(video.url)"
      >
        <div
          class="min-w-[24px] center text-xs text-lightTitle dark:text-lightText"
        >
          {{ index + 1 }}
        </div>
        <div class="video-item--img">
          <img :src="video.thumbnail" class="w-full h-full" loading="lazy" />
          <a-tag class="video-duration">
            {{ formatDuration(video.duration) }}
          </a-tag>
        </div>
        <div class="flex items-center pr-2">
          <div class="flex flex-col">
            <div class="title-video">
              {{ video.title }}
            </div>
            <div class="mb-1 text-xs dark:text-darkTitle">{{ video.uploaderName }}</div>
          </div>
        </div>
      </a>

      <div
        v-if="hiddenVisible"
        class="w-full px-6 py-2 text-sm text-lightTitle dark:text-lightText"
      >
        Đã ẩn {{ hiddenVideos }} video không xem được
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.videos-playlist {
  @apply flex flex-col items-center;
  @apply w-full lg:w-[402px] lg:h-fit rounded-xl;
  @apply pb-2 pt-3 mb-6 lg:mb-4;
  @apply dark:border-darkHover dark:text-lightText;
  border: 1px solid rgba(0, 0, 0, 0.1);

  .list {
    @apply hidden flex-col items-center;
    @apply w-full max-h-72 xl:max-h-96 overflow-auto mt-4;
    transition: all 150ms ease-in-out;

    &.active {
      @apply flex;
    }
  }
  .title,
  .author {
    @apply text-ellipsis whitespace-pre;
    @apply dark:text-lightHover text-[#0F0F0F];
  }
  .title {
    @apply text-xl font-bold;
    @apply dark:text-lightHover;
  }
  .author {
    @apply text-xs font-normal;
  }
  .icon {
    @apply flex justify-center items-center h-fit p-2 text-2xl;
    @apply cursor-pointer select-none rounded-full;
    @apply hover:bg-lightHover dark:hover:bg-darkHover;
    transition: all 150ms linear;

    &.active {
      transform: rotate(90deg);
    }
  }
}

.video-item {
  @apply w-full flex justify-start items-center;
  @apply py-1 cursor-pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &.active {
    background-color: rgba(17, 69, 141, 0.5);
  }

  &--img {
    @apply relative flex justify-center min-w-[100px] h-14;
    @apply rounded-xl overflow-hidden mr-2;
  }
}

.video-duration {
  @apply absolute bottom-1 -right-1;
  @apply rounded-[4px] bg-slate-300 font-medium leading-3;
  @apply px-1 py-[3px];
}
</style>
