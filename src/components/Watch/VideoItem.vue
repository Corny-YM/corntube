<script setup lang="ts">
import { IRelatedStream, Type } from '@/api/model/piped'
import { formatDuration, formatViews, formatTimeAgoToVietnamese } from '@/utils'
import NoThumbnail from '@/assets/imgs/NoThumbnail.png'

const props = defineProps<{
  video: IRelatedStream
}>()

const srcThumbnail = ref(props.video.thumbnail)

const duration = computed(() => formatDuration(props.video.duration!))
const views = computed(() => formatViews(+props.video.views!))
const date = computed(() =>
  formatTimeAgoToVietnamese(props.video.uploadedDate!)
)

const handleError = () => {
  srcThumbnail.value = NoThumbnail
}
</script>

<template>
  <a v-if="video.type !== Type.Playlist" :href="video.url" class="video-item">
    <!-- IMG -->
    <div
      class="relative flex justify-center rounded-xl overflow-hidden min-w-[168px] h-24 mr-2"
    >
      <img
        :src="srcThumbnail"
        class="w-full h-full"
        loading="lazy"
        @error="handleError"
      />
      <a-tag
        class="absolute rounded-md bg-slate-300 font-medium bottom-1 -right-1"
      >
        {{ duration }}
      </a-tag>
    </div>

    <!-- INFO -->
    <div class="flex items-center">
      <div class="flex flex-col">
        <!-- title content -->
        <div class="title-video">
          {{ video.title }}
        </div>
        <!-- channel -->
        <div class="flex items-center mb-1 dark:text-darkTitle">
          <div class="text-xs">{{ video.uploaderName }}</div>
          <div v-if="video.uploaderVerified" class="w-3 h-3 ml-2 center">
            <check-circle />
          </div>
        </div>
        <!-- detail -->
        <div class="text-xs dark:text-darkTitle">{{ views }} lượt xem • {{ date }}</div>
      </div>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.video-item {
  @apply w-fit flex justify-center items-center;
  @apply mr-2 mb-2 rounded-xl cursor-pointer dark:text-lightText;
}
</style>
