<script setup lang="ts">
import { IChapter } from '@/api/model/piped'
import { formatDuration } from '@/utils'
import { CaretRightOutlined } from '@ant-design/icons-vue'

defineProps<{
  chapters: IChapter[]
}>()

const activeChapters = ref(true)
</script>

<template>
  <div class="chapters">
    <!-- content -->
    <div class="w-full flex justify-between items-center px-4">
      <div class="flex flex-col justify-center text-xl font-bold">
        Đoạn video có tiêu đề
      </div>
      <CaretRightOutlined
        class="icon"
        :class="activeChapters ? 'active' : ''"
        @click.stop.prevent="activeChapters = !activeChapters"
      />
    </div>

    <div class="list" :class="activeChapters ? 'active' : ''">
      <div v-for="(chapter, index) in chapters" class="chapter-item">
        <div
          class="min-w-[24px] center text-xs text-lightTitle dark:text-lightText"
        >
          {{ index + 1 }}
        </div>
        <div class="chapter-item--img">
          <img :src="chapter.image" class="w-full h-full" loading="lazy" />
        </div>
        <div class="flex items-center pr-2">
          <div class="flex flex-col">
            <div class="text-sm font-medium">
              {{ chapter.title }}
            </div>
            <a-tag class="chapter-start">
              {{ formatDuration(chapter.start) }}
            </a-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chapters {
  @apply flex flex-col items-center;
  @apply w-full lg:w-[402px] h-fit rounded-xl;
  @apply pb-2 pt-3 mb-6 lg:mb-4;
  @apply dark:border-darkHover dark:text-lightText;
  border: 1px solid rgba(0, 0, 0, 0.1);

  .list {
    @apply hidden flex-col items-center;
    @apply w-full max-h-72 xl:max-h-96 overflow-auto mt-4;
    transition: all 150ms ease-in-out;

    &.active {
      @apply flex;
    }
  }

  .icon {
    @apply flex justify-center items-center h-fit p-2 text-2xl;
    @apply cursor-pointer select-none rounded-full;
    @apply hover:bg-lightHover dark:hover:bg-darkHover;
    transition: all 150ms linear;

    &.active {
      transform: rotate(90deg);
    }
  }
}

.chapter-item {
  @apply w-full flex justify-start items-center;
  @apply py-1 cursor-pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &.active {
    background-color: rgba(17, 69, 141, 0.5);
  }

  &--img {
    @apply flex justify-center min-w-[100px] h-14;
    @apply rounded-xl overflow-hidden mr-2;
  }
}

.chapter-start {
  @apply w-fit mt-2 px-1 py-[3px];
  @apply rounded-[4px] bg-slate-300 font-medium leading-3;
}
</style>
