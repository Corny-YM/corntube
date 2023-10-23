<script lang="ts" setup>
import { CaretRightOutlined } from '@ant-design/icons-vue'

defineProps<{
  description: string
}>()

const activeKey = ref()
</script>

<template>
  <a-collapse v-model:activeKey="activeKey" :bordered="false">
    <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template>
    <a-collapse-panel key="1" header="Hiển thị thêm">
      <span v-html="description" class="video-description"></span>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped lang="scss"></style>
