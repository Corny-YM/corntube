<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { IChapter } from '@/api/model/piped'
import { useApp } from '@/store/app'
import { formatDuration } from '@/utils'
import { CaretRightOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  chapters: IChapter[]
}>()

const app = useApp()
const { currentTime, time } = storeToRefs(app)

const activeChapters = ref(true)

const selectedIndex = computed(() => {
  let index = 0
  const chapters = props.chapters
  const length = chapters.length
  for (let i = length - 1; i >= 0; i--) {
    const chapter = chapters[i]
    if (chapter.start <= currentTime.value) {
      index = i
      break
    }
  }
  return index
})

const handleClickChapter = (e: MouseEvent) => {
  const curTarget = e.currentTarget as HTMLDivElement
  const index = curTarget.dataset.index
  const tmpTime = curTarget.dataset.time
  if (!index || !tmpTime || isNaN(+tmpTime) || +index === selectedIndex.value)
    return
  time.value = +tmpTime
}
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
      <div
        v-for="(chapter, index) in chapters"
        :key="chapter.start"
        class="chapter-item"
        :class="{
          // active: chapter.start <= currentTime,
          active: index === selectedIndex,
        }"
        :data-index="index"
        :data-time="chapter.start"
        @click="handleClickChapter"
      >
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
  @apply pb-3 pt-3 mb-6 lg:mb-4;
  @apply border border-solid border-[#0000001a];
  @apply dark:border-darkHover dark:text-lightText;

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
      @apply rotate-90;
    }
  }
}

.chapter-item {
  @apply w-full flex justify-start items-center;
  @apply py-1 cursor-pointer select-none;

  &:hover {
    @apply bg-[#0000000d] dark:bg-darkHover;
  }

  &.active {
    @apply bg-[#11458d80];
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
