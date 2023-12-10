<script setup lang="ts">
import { ITrending } from '@/api/model/piped'
import { formatViews, formatDuration, formatTimeAgoToVietnamese } from '@/utils'
import NoThumbnail from '@/assets/imgs/NoThumbnail.png'
import NoAvatar from '@/components/Icons/NoAvatar.vue'

const props = defineProps<{
  video: ITrending
  detail?: boolean
  playlist?: boolean
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
  <a :href="video.url" class="video-item">
    <!-- IMG -->
    <div class="relative flex justify-center rounded-xl overflow-hidden">
      <img
        :src="srcThumbnail"
        class="w-full h-full aspect-video"
        loading="lazy"
        @error="handleError"
      />
      <a-tag class="absolute bg-slate-300 font-medium bottom-2 right-0">
        {{ duration }}
      </a-tag>
    </div>

    <!-- INFO -->
    <div class="flex items-center mt-3">
      <div v-if="detail" class="h-full mr-3">
        <router-link :to="`${video.uploaderUrl}`">
          <a-avatar
            class="center w-9 h-9 bg-slate-300"
            :src="video.uploaderAvatar"
          >
            <NoAvatar />
          </a-avatar>
        </router-link>
      </div>
      <div class="w-full flex flex-col justify-between">
        <!-- title content -->
        <div class="title-video" :class="!detail ? 'max-h-10' : 'max-h-11'">
          <a-tooltip :title="video.title">
            {{ video.title }}
          </a-tooltip>
        </div>
        <!-- channel -->
        <div v-if="detail" class="flex items-center">
          <a :href="video.uploaderUrl" class="text-sm" @click.stop="">
            {{ video.uploaderName }}
          </a>
          <div v-if="video.uploaderVerified" class="w-3 h-3 ml-2 center">
            <check-circle />
          </div>
        </div>
        <!-- detail -->
        <div class="font-normal" :class="!detail ? 'text-xs' : 'text-sm'">
          {{ views }} lượt xem • {{ date }}
        </div>
      </div>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.video-item {
  @apply h-auto w-full flex flex-col px-2 mb-7 rounded-xl cursor-pointer;
  color: initial;
  @apply dark:text-white;
}
</style>
