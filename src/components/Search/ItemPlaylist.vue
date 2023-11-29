<script setup lang="ts">
import { IPlaylistContent } from '@/api/model/piped'
import { getPlaylist } from '@/api/piped'
import { formatViews, messagePopup } from '@/utils'
import { CaretRightOutlined, CheckCircleFilled } from '@ant-design/icons-vue'
import { useMutation } from '@tanstack/vue-query'

const props = defineProps<{
  data: IPlaylistContent
}>()

const router = useRouter()

const { mutate } = useMutation({
  mutationKey: ['playlist', 'get'],
  mutationFn: getPlaylist,
  onSuccess(data, variable) {
    const relatedStreams = data.relatedStreams
    const videoId = relatedStreams[0].url!
    router.push(`${videoId}&list=${variable}`)
  },
  onError(err) {
    messagePopup({ type: 'error' })
    console.log(err)
  },
})

const handleClick = () => {
  const listId = props.data.url.split('=')[1]
  if (!listId) return
  mutate(listId)
}
</script>

<template>
  <div class="item-playlist" @click="handleClick">
    <div class="playlist-thumbnail">
      <img
        :src="data.thumbnail"
        class="w-full h-full object-contain self-stretch"
        loading="lazy"
      />

      <div class="overlay text-xs text-white">
        <CaretRightOutlined class="center mr-1 text-xl" />
        <div class="uppercase font-medium">Phát tất cả</div>
      </div>
    </div>
    <div class="self-stretch flex-1 flex flex-col mt-3 sm:mt-0">
      <div class="title mb-1">
        {{ data.name }}
      </div>
      <div class="flex flex-row sm:flex-col items-center sm:items-start">
        <div class="flex items-center py-2 sm:py-0 pr-2 sm:pr-0">
          <a
            :href="data.uploaderUrl"
            class="text hover:!text-[#3791de]"
            @click.stop=""
          >
            {{ data.uploaderName }}
          </a>
          <div
            v-if="data.uploaderVerified"
            class="h-full center ml-2 text-xs text"
          >
            <CheckCircleFilled class="center text-sm" />
          </div>
        </div>
        <a-typography-text code class="sm:my-2">
          {{ formatViews(data.videos) }} videos
        </a-typography-text>
      </div>
      <a-button
        type="dashed"
        size="middle"
        class="w-fit h-9 center"
        :href="data.url"
        @click.stop=""
      >
        XEM TOÀN BỘ DANH SÁCH
      </a-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-playlist {
  @apply w-full justify-start items-center mt-6 sm:mt-4 cursor-pointer;
  @apply flex flex-col sm:flex-row;

  &:hover .overlay {
    opacity: 1;
  }
  .overlay {
    @apply absolute inset-0 flex justify-center items-center opacity-0 select-none;
    background-color: rgba(0, 0, 0, 0.8);
    transition: all 150ms ease-in-out;
  }
}

.playlist-thumbnail {
  @apply relative center mr-4 rounded-xl overflow-hidden shadow-md;
  @apply max-w-full min-w-full;
  @apply sm:max-w-[300px] sm:min-w-[300px];
  @apply md:max-w-[360px] md:min-w-[360px];
  @apply lg:max-w-[500px] lg:min-w-[500px];
}

.title {
  @apply text-[#0F0F0F] text-[18px] font-medium line-clamp-2;
}
.text {
  @apply text-[#606060] text-xs;
}
</style>
