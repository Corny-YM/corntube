<script setup lang="ts">
import { IShort } from '@/api/model/piped'
import NoThumbnail from '@/assets/imgs/NoThumbnail.png'

const props = defineProps<{
  short: IShort
}>()

const emits = defineEmits<{
  (e: 'click', url: string): void
}>()

const srcThumbnail = ref(props.short.thumbnail)

const handleClick = () => {
  emits('click', props.short.url)
}
const handleError = () => {
  srcThumbnail.value = NoThumbnail
}
</script>

<template>
  <div class="short-item" @click="handleClick">
    <!-- IMG -->
    <div
      class="w-full h-full flex justify-center items-center rounded-xl overflow-hidden bg-[#d9d9d9]"
    >
      <img
        :src="srcThumbnail"
        class="w-full h-full object-contain aspect-[9/16]"
        @error="handleError"
      />
    </div>

    <!-- INFO -->
    <div class="flex items-center mt-3">
      <div class="flex flex-col">
        <!-- title content -->
        <div class="title-video">{{ short.title }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.short-item {
  @apply h-auto flex flex-col items-center sm:mx-2 rounded-xl cursor-pointer;
  @apply w-full sm:w-fit;
  @apply mb-2 sm:mb-7;
  @apply dark:text-lightText;
  color: initial;
}

.title-video {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;

  max-width: 100%;
  max-height: 4.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.25rem /* 4px */;
  font-size: 0.875rem /* 14px */;
  font-weight: 500;
  line-height: 1.25rem /* 20px */;
}
</style>
