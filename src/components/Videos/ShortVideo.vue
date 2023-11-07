<script setup lang="ts">
import { IShort } from '@/api/model/piped'
import NoAvatar from '@/assets/imgs/NoAvatar.png'

const props = defineProps<{
  short: IShort
}>()

const emits = defineEmits<{
  (e: 'click', url: string): void
}>()

const handleClick = () => {
  emits('click', props.short.url)
}
</script>

<template>
  <div class="short-item" @click="handleClick">
    <!-- IMG -->
    <div class="flex justify-center rounded-xl overflow-hidden">
      <a-image :preview="false" :src="short.thumbnail" :fallback="NoAvatar" />
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
  @apply h-auto flex flex-col items-center mx-2 rounded-xl cursor-pointer;
  @apply w-full sm:w-fit;
  @apply mb-2 sm:mb-7;
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
