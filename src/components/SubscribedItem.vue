<script setup lang="ts">
import { IChannelContent } from '@/api/model/piped'

defineProps<{
  subscribed: IChannelContent
}>()
</script>

<template>
  <div
    class="h-11 flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-lightHover"
  >
    <div class="flex justify-center items-center mr-4">
      <a-avatar class="w-7 h-7" :src="subscribed.thumbnail" />
    </div>
    <div
      class="text-[16px] font-medium overflow-hidden whitespace-nowrap text-ellipsis"
    >
      {{ subscribed.name }}
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
