<script setup lang="ts">
import { h } from 'vue'
import {
  DislikeOutlined,
  DownloadOutlined,
  LikeOutlined,
} from '@ant-design/icons-vue'
import { IStreams } from '@/api/model/piped'
import { formatViews, formatDate } from '@/utils'

const props = defineProps<{
  data: IStreams
}>()

const videoSteams = computed(() => {
  return props.data.videoStreams[0]
})
</script>

<template>
  <div class="px-9 flex w-full h-full pt-6 justify-center overflow-auto">
    <!-- Content -->
    <div class="w-3/5 pr-6 mb-3">
      <div class="center overflow-hidden rounded-xl mb-3">
        <video
          class="w-full"
          ref="videoRef"
          :src="videoSteams.url"
          type="video/*"
          controls
        ></video>
      </div>

      <!-- detail -->
      <div class="flex flex-col justify-center">
        <div class="title mb-2">{{ data.title }}</div>

        <div class="flex justify-between items-center">
          <div class="center">
            <a-avatar :src="data.uploaderAvatar" class="w-10 h-10" />
            <div class="ml-3">
              <div class="mb-1 font-medium">{{ data.uploader }}</div>
              <div class="text-sm">
                {{ formatViews(data.uploaderSubscriberCount) }} người đăng ký
              </div>
            </div>
          </div>

          <div class="flex gap-1">
            <a-button :icon="h(LikeOutlined)" class="center">
              {{ formatViews(data.likes, 0) }} Like
            </a-button>
            <a-button :icon="h(DislikeOutlined)" class="center">
              {{ formatViews(data.dislikes, 0) }} Dislike
            </a-button>
            <a-button type="primary" class="font-medium ml-2">Đăng ký</a-button>
          </div>
        </div>

        <div class="flex justify-between items-center mt-3">
          <a-typography-text code>
            {{ formatViews(data.views) }} lượt xem | Đã công chiếu vào
            {{ formatDate(new Date(data.uploadDate), 'DD-MM-YYYY hh:mm:ss') }}
          </a-typography-text>
          <a-button :icon="h(DownloadOutlined)" shape="round">
            Download
          </a-button>
        </div>

        <div class="my-3">
          <Detail :description="data.description" />
        </div>

        <div class="heading-comment">Comments</div>
        <Comments />
      </div>
    </div>

    <!-- List Videos -->
    <div class="w-[402px] min-w-[300px] pr-6">
      <ListVideos />
    </div>
  </div>
</template>
