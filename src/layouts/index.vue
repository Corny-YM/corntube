<script setup lang="ts">
import AppHeader from '../container/AppHeader.vue'
import AppSidebar from '../container/AppSidebar.vue'

const props = defineProps({
  sidebar: {
    type: Boolean,
    default: true,
  },
})

const isShow = ref(false)

onMounted(() => {
  if (window.innerWidth > 1280 && props.sidebar) {
    isShow.value = true
  }
})
</script>

<template>
  <div class="app-layout">
    <AppHeader v-model:is-show="isShow" />
    <div class="content flex h-full">
      <AppSidebar :sidebar="sidebar" v-model:is-show="isShow" />
      <div class="flex-1" :class="sidebar ? 'pl-4' : ''">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  width: 100vw;
  height: 100vh;
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.content {
  height: 100%;
}
</style>
