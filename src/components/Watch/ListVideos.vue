<script setup lang="ts">
import { IRelatedStream } from '@/api/model/piped'
import { getStreams } from '@/api/piped'
import VideoItem from '@/components/Watch/VideoItem.vue'
import { useMutation } from '@tanstack/vue-query'

defineProps<{
  relatedStreams: IRelatedStream[]
}>()

const dataNextPage = ref('')

const { mutate, isPending } = useMutation({
  mutationKey: ['relatedStream', 'more'],
  mutationFn: getStreams,
  onSuccess(data) {
    console.log(data.relatedStreams)
  },
})

const handleLoadMoreRelatedStream = () => {
  // TODO random to take one video
  mutate('')
}
</script>

<template>
  <div class="w-96">
    <VideoItem
      v-for="stream in relatedStreams"
      :key="stream.url"
      :video="stream"
    />
    <div class="w-full center mt-4">
      <a-button
        v-if="dataNextPage"
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
