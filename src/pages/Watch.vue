<script setup lang="ts">
import { h } from 'vue'
import {
  DislikeOutlined,
  DownloadOutlined,
  LikeOutlined,
} from '@ant-design/icons-vue'
</script>

<template>
  <div class="px-9 flex w-full h-full pt-6 justify-center overflow-auto">
    <!-- Content -->
    <div class="w-3/5 pr-6 mb-3">
      <div class="max-h-[447px] h-full overflow-hidden rounded-xl">
        <iframe
          class="w-full h-full"
          src="https://www.youtube.com/embed/om2HC1v1d3U"
          title="FIORA LANE, YOU ALREADY KNOW HOW IT WENT 😎"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <!-- <video
          src="https://www.youtube.com/watch?v=om2HC1v1d3U&t=1s&ab_channel=Thebausffs"
          type="video/*"
          :style="{ height: '100%' }"
        ></video> -->
      </div>

      <!-- detail -->
      <div class="flex flex-col justify-center">
        <div class="title">FIORA LANE, YOU ALREADY KNOW HOW IT WENT 😎</div>

        <div class="flex justify-between items-center">
          <div class="center">
            <a-avatar
              src="https://pipedproxy.kavin.rocks/68s19fmu6QktKduViaG7Yt3XMrBzCp5zhU2EFgOatkYqbo89Laq-r3rhjPmGjxFE5-wp_KQo=s176-c-k-c0x00ffffff-no-rw?host=yt3.ggpht.com"
              class="w-10 h-10"
            />
            <div class="ml-3">
              <div class="mb-1 font-medium">Thebausffs</div>
              <div class="text-sm">742K subscribers</div>
            </div>
          </div>

          <div class="flex gap-1">
            <a-button :icon="h(LikeOutlined)">30N Like </a-button>
            <a-button :icon="h(DislikeOutlined)">Dislike</a-button>
            <a-button class="font-medium ml-2">Subscribed</a-button>
          </div>
        </div>

        <div class="flex justify-between items-center mt-3">
          <a-typography-text code>
            870,305 views | 07:00-23T07:00:27-09-2023
          </a-typography-text>
          <a-button :icon="h(DownloadOutlined)" shape="round">
            Download
          </a-button>
        </div>

        <div class="mt-3">
          <Detail />
        </div>

        <div class="heading-comment">Comments</div>
        <div>
          <Comments />
        </div>
      </div>
    </div>

    <!-- List Videos -->
    <div class="w-[402px] min-w-[300px] pr-6">
      <ListVideos />
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  white-space: normal;
  word-break: break-word;
  font-size: 20px;
  line-height: 2.8rem;
  font-weight: 500;
}

.heading-comment {
  display: flex;
  align-items: center;
  height: 30px;
  border-left: 3px solid #1677ff;
  font-size: 18px;
  font-weight: 600;
  padding-left: 8px;
  margin-top: 28px;
  margin-bottom: 18px;
}
</style>
