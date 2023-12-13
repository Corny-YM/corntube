<script lang="ts" setup>
import { CaretRightOutlined } from '@ant-design/icons-vue'

defineProps<{
  description: string
}>()

const activeKey = ref()
</script>

<template>
  <a-collapse v-model:activeKey="activeKey" :bordered="false" class="dark:bg-darkHover">
    <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" class="dark:!text-lightText" />
    </template>
    <a-collapse-panel key="1">
      <template #header>
        <div class="dark:!text-lightText dark:font-medium">Hiển thị thêm</div>
      </template>
      <span v-html="description" class="video-description dark:text-lightText"></span>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped lang="scss"></style>
