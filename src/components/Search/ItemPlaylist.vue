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
    <div
      class="relative center max-w-[500px] min-w-[500px] mr-4 rounded-xl overflow-hidden shadow-md"
    >
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
    <div class="self-stretch flex-1 flex flex-col">
      <div class="title mb-1">
        {{ data.name }}
      </div>
      <div class="flex items-center">
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
      <a-typography-text code class="my-2">
        {{ formatViews(data.videos) }} videos
      </a-typography-text>
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
  @apply w-full flex justify-start items-center mt-4 cursor-pointer;

  &:hover .overlay {
    opacity: 1;
  }
  .overlay {
    @apply absolute inset-0 flex justify-center items-center opacity-0 select-none;
    background-color: rgba(0, 0, 0, 0.8);
    transition: all 150ms ease-in-out;
  }
}

.title {
  @apply text-[#0F0F0F] text-[18px] font-medium line-clamp-2;
}
.text {
  @apply text-[#606060] text-xs;
}
</style>
