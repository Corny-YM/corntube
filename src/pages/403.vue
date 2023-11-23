<script setup lang="ts">
import { h } from 'vue'
import { YoutubeOutlined } from '@ant-design/icons-vue'
import img403 from '@/assets/imgs/403.png'
</script>

<template>
  <div class="w-full h-screen center flex-col">
    <a-image :src="img403" :preview="false" />
    <div class="text">
      Trang này không có sẵn. Mong bạn thông cảm.<br />
      Bạn thử tìm cụm từ khác xem sao nhé.
    </div>
    <div class="center">
      <a-button
        href="/"
        :icon="h(YoutubeOutlined, { class: 'icon' })"
        size="large"
        class="center !flex font-medium"
      >
        Trang chủ
      </a-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.text {
  @apply my-4 text-center text-[#333] text-base font-medium;
  text-shadow: 0 0 0 transparent, 0 1px 1px #fff;
}

.icon {
  @apply text-blueAntd text-xl justify-center items-center;
  display: flex !important;
}
</style>
