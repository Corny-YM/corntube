<script setup lang="ts">
import NoVideos from '@/assets/imgs/NoVideos.png'
import { VueNode } from 'ant-design-vue/es/_util/type'

defineProps<{
  image?: VueNode
  description?: string
}>()

const defaultDesc = ref('Không tìm thấy dữ liệu')
</script>

<template>
  <a-empty
    :image="image || NoVideos"
    :description="description || defaultDesc"
    class="mt-24 mb-14 dark:!text-white"
  />
</template>
