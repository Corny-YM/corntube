<script setup lang="ts">
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

const handleGetTarget = () => {
  const target = document.getElementById('target_content')
  return target as HTMLElement | Window | Document
  // return refContent.value?.children[0] as HTMLElement | Window | Document
}

onMounted(() => {
  handleGetTarget()
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
      <a-back-top
        class="bottom-4"
        tooltip="Back to top"
        type="primary"
        :duration="250"
        :visibility-height="400"
        :target="handleGetTarget"
      />
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
