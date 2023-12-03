<script lang="ts" setup>
import dayjs from 'dayjs'
import {
  LikeOutlined,
  DislikeOutlined,
  CaretDownOutlined,
  HeartFilled,
} from '@ant-design/icons-vue'
import relativeTime from 'dayjs/plugin/relativeTime'
import { formatTimeAgoToVietnamese, formatViews, messagePopup } from '@/utils'
import { IComment } from '@/api/model/piped'

dayjs.extend(relativeTime)

const props = defineProps<{
  content: IComment
  isChildren?: boolean
  authorData?: {
    name: string
    avatar: string
  }
}>()

const isFull = ref(false)
const repliesPage = ref('')
const isOpen = ref(false)

const channelUrl = computed(() => props.content.commentorUrl)

const handleClick = () => {
  if (!unref(repliesPage)) repliesPage.value = props.content.repliesPage || ''
  isOpen.value = !unref(isOpen)
}

const handleLike = () => {
  messagePopup({ type: 'info' })
}
</script>

<template>
  <a-comment v-if="!!content.author" class="w-full">
    <div class="flex flex-col">
      <a-button
        v-if="!isChildren && content.replyCount > 0"
        type="text"
        shape="round"
        class="w-fit"
        @click="handleClick"
      >
        <div class="center gap-2">
          <CaretDownOutlined
            class="icon-caret-down"
            :class="isOpen ? '-rotate-180' : ''"
          />
          {{ formatViews(content.replyCount) }} phản hồi
        </div>
      </a-button>
      <slot name="reply" v-if="content.repliesPage">
        <div class="reply-content" :class="isOpen ? 'show' : 'close'">
          <CommentReplies :repliesPage="repliesPage" :authorData="authorData" />
        </div>
      </slot>
    </div>

    <!-- Like & Dislike -->
    <template #actions>
      <div class="flex items-center">
        <div class="actions-item" @click="handleLike">
          <a-tooltip title="Like">
            <LikeOutlined />
          </a-tooltip>
          {{ formatViews(content.likeCount) }}
        </div>
        <div class="actions-item" @click="handleLike">
          <a-tooltip title="Dislike">
            <DislikeOutlined />
          </a-tooltip>
        </div>
        <template v-if="content.hearted">
          <a-tooltip :title="`💓 từ ${authorData?.name}`">
            <div class="actions-item center relative w-9 h-9 select-none">
              <a-avatar class="w-5 h-5" :src="authorData?.avatar" />
              <HeartFilled
                class="absolute bottom-0 right-0 -translate-x-1/4 -translate-y-1/4 center text-[#df3636]"
              />
            </div>
          </a-tooltip>
        </template>
        <div v-if="!isChildren" class="actions-item" @click="handleLike">
          Reply to
        </div>
      </div>
    </template>

    <!-- Author -->
    <template #author>
      <a
        :href="channelUrl"
        class="center font-medium text-sm !text-black cursor-pointer"
        :class="
          content.channelOwner ? 'px-2 py-[2px] rounded-xl bg-[#eee]' : ''
        "
      >
        {{ content.author }}
      </a>
    </template>

    <!-- Avatar -->
    <template #avatar>
      <a :href="channelUrl" class="rounded-full">
        <a-avatar
          class="w-8 h-8 center"
          :src="content.thumbnail"
          :alt="content.author"
        >
          <NoAvatar />
        </a-avatar>
      </a>
    </template>

    <!-- Content -->
    <template #content>
      <div class="flex flex-col">
        <div
          class="leading-normal cursor-default comment-content"
          :class="isFull ? 'showing' : ''"
          @click="isFull = !isFull"
        >
          <p class="comment" v-html="content.commentText"></p>
        </div>
      </div>
    </template>

    <!-- Date -->
    <template #datetime>
      <div class="h-full center text-darkTitle">
        {{ formatTimeAgoToVietnamese(content.commentedTime) }}
      </div>
    </template>
  </a-comment>
</template>

<style scoped lang="scss">
.comment-content {
  display: -webkit-inline-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;

  &.showing {
    -webkit-line-clamp: unset;
  }
}

.actions-item {
  & + & {
    @apply ml-2;
  }
}

.icon-caret-down {
  transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
}

.reply-content {
  transition: all 250ms ease-in-out;
  overflow-y: hidden;
  height: 100%;

  &.show {
    height: fit-content;
  }
  &.close {
    height: 0px !important;
  }
}
</style>
