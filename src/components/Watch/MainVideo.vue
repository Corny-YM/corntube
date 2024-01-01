<script setup lang="ts">
import { IOStream, ISubtitle, MIMEType } from '@/api/model/piped'
import { stringSubToTime, stringToSubtitles } from '@/utils'
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

const videoRef = ref<HTMLVideoElement | null>(null)
const subs = ref<ISub[]>([])
const sub = ref<ISub>()

const videoSources = computed(() => {
  return props.videoStreams.filter(
    (video) => !video.videoOnly && video.mimeType === MIMEType.VideoMp4
  )
})

const handleTimeUpdate = (e: Event) => {
  const target = e.target as HTMLVideoElement
  const curTime = target.currentTime || 0
  if (!subs.value.length) return
  const tmpSub = subs.value.find(
    (item) => curTime + 0.5 > item.begin && curTime < item.end - 2.5
  )
  sub.value = tmpSub
}

onMounted(async () => {
  const res = await fetch(props.subtitles?.[0]?.url)
  const data = await res.text()
  const result = stringToSubtitles(data) || []
  const objTime = result.map((item) => stringSubToTime(item))
  if (result) subs.value = objTime
})
</script>

<template>
  <!-- Video -->
  <div class="video-container">
    <vue-plyr
      :options="{
        quality: { default: '720p' },
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

    <span v-if="sub" id="subtitle" class="subtitle">{{ sub.text }}</span>
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
  @apply flex absolute bottom-[2%] left-1/2;
  @apply w-fit max-w-full line-clamp-2 rounded font-medium;
  @apply px-2 py-1 -translate-x-1/2;
  @apply bg-lightHover text-primaryDark;
  @apply dark:bg-headerDark dark:text-lightHover;
  transition: all 250ms ease-in-out;
}
</style>
