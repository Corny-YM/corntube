<script setup lang="ts">
import { IStreams } from '@/api/model/piped'
import { getStreams } from '@/api/piped'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons-vue'
import VolumeUp from '@/components/Icons/VolumeUp.vue'
import VolumeMuted from '@/components/Icons/VolumeMuted.vue'
import { useQuery } from '@tanstack/vue-query'

const props = defineProps<{
  open: boolean
  url: string
}>()

const emits = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const open = computed({
  get: () => props.open,
  set: (value) => emits('update:open', value),
})
const enabled = computed(() => !!props.url)

// Ref
const shortData = ref<IStreams | null>(null)
const refShortVideo = ref<HTMLVideoElement | null>(null)
const isPlayable = ref(false)
const isPlaying = ref(true)
const isMuted = ref(false)

const { isLoading } = useQuery({
  enabled,
  queryKey: ['tab', 'shorts', props.url],
  queryFn: () => getStreams(props.url!),
  select(data) {
    shortData.value = data
  },
})

const videoSrc = computed(() => {
  const arrVideos = unref(shortData)?.videoStreams.filter(
    (video) => !video.videoOnly
  )
  const selectedVideo =
    arrVideos?.sort((a, b) => parseInt(b.quality) - parseInt(a.quality)) || []
  return selectedVideo[0]?.url
})

const handlePlay = () => {
  if (unref(refShortVideo)?.currentTime === 0) return
  unref(refShortVideo)?.paused
    ? refShortVideo.value?.play()
    : refShortVideo.value?.pause()
  isPlaying.value = !isPlaying.value
}
const handleMute = () => {
  isMuted.value = !isMuted.value
}

const handleCancel = () => {
  isPlayable.value = false
  isPlaying.value = true
  isMuted.value = false
}
</script>

<template>
  <a-modal
    v-model:open="open"
    centered
    :footer="null"
    :closable="false"
    class="tab-short-modal"
    @cancel="handleCancel"
  >
    <div class="relative w-fit h-full center bg-black">
      <!-- Control Video -->
      <div class="custom-control-video !text-white">
        <div class="center cursor-pointer" @click="handlePlay">
          <PauseOutlined v-if="isPlaying" />
          <CaretRightOutlined v-if="!isPlaying" />
        </div>
        <div class="center cursor-pointer" @click="handleMute">
          <VolumeUp v-if="!isMuted" class="w-6 h-6 text-white" />
          <VolumeMuted v-if="isMuted" class="w-6 h-6 text-white" />
        </div>
      </div>

      <!-- Video -->
      <div
        v-if="isLoading || !isPlayable"
        class="absolute w-full h-full center z-10"
      >
        <a-spin size="large" />
      </div>
      <video
        class="w-full h-full object-cover"
        ref="refShortVideo"
        type="video/*"
        preload="metadata"
        loop
        autoplay
        :muted="isMuted"
        :src="open ? videoSrc : undefined"
        @waiting="isPlayable = false"
        @canplay="isPlayable = true"
      ></video>
    </div>
  </a-modal>
</template>

<style lang="scss" scoped>
.custom-control-video {
  @apply absolute top-4 left-0 right-0 z-10;
  @apply flex items-center justify-between;
  @apply text-white text-2xl;
  @apply px-4;
}
</style>
