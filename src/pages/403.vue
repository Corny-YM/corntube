<script setup lang="ts">
import { h } from 'vue'
import { YoutubeOutlined } from '@ant-design/icons-vue'
import img403 from '@/assets/imgs/403.png'
import { useApp } from '@/store/app'
import { storeToRefs } from 'pinia'
import { ThemeEnum } from '@/enums/theme'

const app = useApp()
const { currentTheme } = storeToRefs(app)

const isDark = computed(() => currentTheme.value === ThemeEnum.DARK)
</script>

<template>
  <div
    class="w-full h-screen center flex-col"
    :class="isDark ? 'bg-headerDark' : ''"
  >
    <a-image :src="img403" :preview="false" />
    <div class="text" :class="isDark ? '!text-slate-200' : ''">
      Trang này không có sẵn. Mong bạn thông cảm.<br />
      Bạn thử tìm cụm từ khác xem sao nhé.
    </div>
    <div class="center">
      <a-button
        href="/"
        size="large"
        class="center !flex font-medium"
        :class="isDark ? 'bg-sidebarDark text-white' : ''"
        :icon="h(YoutubeOutlined, { class: 'icon' })"
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
