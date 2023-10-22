<script setup lang="ts">
import { UnorderedListOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <VideoList class="playlist">
    <template #item>
      <div
        v-for="n in 2"
        :key="n"
        class="w-fit center flex-col mx-2 mb-7 rounded-xl cursor-pointer"
      >
        <!-- IMG -->
        <div class="relative flex justify-center rounded-xl overflow-hidden">
          <a-image
            :preview="false"
            src="https://pipedproxy.kavin.rocks/vi/LdCTo9XSwZE/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBMDUlipSZrh3_isWRTkKam0GUpIQ&host=i.ytimg.com"
          />
          <div class="overlay-playlist">
            <div class="text-slate-100">20</div>
            <UnorderedListOutlined class="text-xl text-slate-100" />
          </div>
        </div>

        <!-- INFO -->
        <div class="flex w-full items-center mt-1">
          <div class="flex flex-col">
            <!-- title content -->
            <div class="title-video">BEST OF THEBAUSFFS</div>
            <!-- detail -->
            <div class="">Xem toàn bộ danh sách</div>
          </div>
        </div>
      </div>
    </template>
  </VideoList>
</template>

<style scoped lang="scss">
.overlay-playlist {
  position: absolute;
  width: 40%;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
