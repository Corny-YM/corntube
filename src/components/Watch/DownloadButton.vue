<script setup lang="ts">
import { h } from 'vue'
import { DownloadOutlined } from '@ant-design/icons-vue'

const emits = defineEmits(['click'])
</script>

<template>
  <a-button
    class="dark:bg-headerDark dark:text-lightText"
    shape="round"
    :icon="h(DownloadOutlined)"
    @click="emits('click')"
  >
    Download
  </a-button>
</template>

<style scoped lang="scss"></style>
