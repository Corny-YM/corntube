<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { IRelatedStream } from '@/api/model/piped'
import { getStreams } from '@/api/piped'
import { randomItem } from '@/utils'
import { messagePopup } from '@/utils/index'
import VideoItem from '@/components/Watch/VideoItem.vue'

const props = defineProps<{
  relatedStreams: IRelatedStream[]
}>()

const dataRelatedStream = ref(props.relatedStreams)

const isShowBtn = computed(() => !!props.relatedStreams.length)

const { mutate, isPending } = useMutation({
  mutationKey: ['relatedStream', 'more'],
  mutationFn: getStreams,
  onSuccess(data) {
    dataRelatedStream.value = [
      ...unref(dataRelatedStream),
      ...data.relatedStreams,
    ]
  },
  onError() {
    messagePopup({ type: 'error' })
  },
})

const handleLoadMoreRelatedStream = () => {
  const selectedItem = randomItem(unref(dataRelatedStream))
  // TODO random to take one video
  if (!selectedItem.url) return messagePopup({ type: 'error' })
  const videoId = selectedItem.url.split('=')[1]
  mutate(videoId)
}
</script>

<template>
  <div class="w-96 pb-4">
    <VideoItem
      v-for="stream in dataRelatedStream"
      :key="stream.url"
      :video="stream"
    />
    <div class="w-full center mt-4">
      <a-button
        v-if="isShowBtn"
        shape="round"
        type="primary"
        :loading="isPending"
        @click="handleLoadMoreRelatedStream"
      >
        Tải thêm
      </a-button>
    </div>
  </div>
</template>
