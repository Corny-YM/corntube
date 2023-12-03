<script setup lang="ts">
import { VerticalAlignTopOutlined } from '@ant-design/icons-vue'
import AppHeader from '../container/AppHeader.vue'
import AppSidebar from '../container/AppSidebar.vue'

const props = defineProps({
  sidebar: {
    type: Boolean,
    default: true,
  },
})

const refContent = ref<HTMLDivElement | null>(null)
const isShow = ref(false)

const handleBackToTop = () => {
  refContent.value?.children[0]?.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  if (window?.innerWidth > 1280 && props?.sidebar) {
    isShow.value = true
  }
})
</script>

<template>
  <div class="app-layout">
    <AppHeader v-model:is-show="isShow" />
    <div class="content flex h-full">
      <AppSidebar :sidebar="sidebar" v-model:is-show="isShow" />
      <div
        ref="refContent"
        class="content flex-1"
        :class="sidebar ? 'xl:pl-4' : ''"
      >
        <router-view id="target_content"></router-view>
      </div>
      <a-float-button type="primary" class="bottom-4" @click="handleBackToTop">
        <template #icon> <VerticalAlignTopOutlined /> </template>
      </a-float-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  width: 100%;
  height: 100vh;
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
</style>
