<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { IOStream, ISubtitle, MIMEType } from '@/api/model/piped'
import { stringSubToTime, stringToSubtitles } from '@/utils'
import { useApp } from '@/store/app'
import { controls } from './watch.data'

export interface ISub {
  begin: number
  end: number
  text: string | null
}

const props = defineProps<{
  avatar: string
  poster: string
  audioStreams: IOStream[]
  videoStreams: IOStream[]
  subtitles: ISubtitle[]
}>()

const app = useApp()
const { currentTime, time } = storeToRefs(app)

const plyrRef = ref()
const videoRef = ref<HTMLVideoElement | null>(null)
const subs = ref<ISub[]>([])
const sub = ref<ISub>()
const hasSub = ref(false)

const videoSources = computed(() => {
  return props.videoStreams.filter(
    (video) => !video.videoOnly && video.mimeType === MIMEType.VideoMp4
  )
})

const handleTimeUpdate = (e: Event) => {
  const target = e.target as HTMLVideoElement
  const curTime = target.currentTime || 0
  if (curTime) currentTime.value = curTime

  if (!subs.value.length) return
  const tmpSub = subs.value.find(
    (item) => curTime > item.begin && curTime < item.end
  )
  sub.value = tmpSub
}
const handleListenEvent = () => {
  plyrRef.value.player.volume = 0.5
  plyrRef.value.player.on('enterfullscreen', () => {
    // TODO fullscreen subtitles
  })
  plyrRef.value.player.on('captionsenabled', () => {
    hasSub.value = true
  })
  plyrRef.value.player.on('captionsdisabled', () => {
    hasSub.value = false
  })
  plyrRef.value.player.on('languagechange', (event: any) => {
    const code = event?.detail?.plyr?.captions?.language
    fetchSubtitles(code)
  })
}
const fetchSubtitles = async (code?: string) => {
  const url = props.subtitles.find((sub) => sub.code === code)?.url
  if (!url) return
  const res = await fetch(url)
  const data = await res.text()
  const result = stringToSubtitles(data) || []
  const objTime = result.map((item) => stringSubToTime(item))
  if (result) subs.value = objTime
}

watch([time], () => {
  plyrRef.value.player.currentTime = time.value
})

onMounted(async () => {
  await fetchSubtitles()
  handleListenEvent()
})
</script>

<template>
  <!-- Video -->
  <div ref="mainVideoRef" class="video-container">
    <vue-plyr
      ref="plyrRef"
      :options="{
        quality: { default: '320p' },
        captions: {
          active: false,
        },
        settings: ['captions', 'quality', 'speed', 'loop'],
        controls: controls,
      }"
    >
      <video
        ref="videoRef"
        controls
        crossorigin="true"
        playsinline
        :data-poster="poster"
        @timeupdate="handleTimeUpdate"
      >
        <source
          v-for="source in videoSources"
          :key="source.url"
          :size="source.quality.slice(0, -1)"
          :src="source.url"
          :type="source.mimeType"
        />
        <track
          v-for="subtitle in subtitles"
          kind="captions"
          :key="subtitle.url"
          :label="subtitle.name"
          :src="subtitle.url"
          :srclang="subtitle.code"
        />
      </video>
    </vue-plyr>
    <span
      v-if="sub && hasSub"
      id="subtitle"
      class="subtitle"
      v-html="sub.text"
    ></span>
  </div>
</template>

<style scoped lang="scss">
.video-container {
  @apply relative center overflow-hidden;
  @apply rounded-xl mb-3 aspect-video bg-black;

  &:hover .subtitle {
    @apply bottom-[10%];
  }
}

.subtitle {
  @apply inline-block absolute bottom-[2%] left-1/2;
  @apply w-fit max-w-full h-fit rounded font-medium;
  @apply px-2 py-1 -translate-x-1/2;
  @apply bg-lightHover text-primaryDark;
  @apply dark:bg-headerDark dark:text-lightHover;
  transition: all 250ms ease-in-out;

  // TODO: fullscreen => show subtitle
  &::backdrop {
    @apply w-full h-full bg-red-50;
  }
}
</style>
