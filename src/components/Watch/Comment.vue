<script lang="ts" setup>
import dayjs from 'dayjs'
import {
  LikeOutlined,
  DislikeOutlined,
  CaretRightOutlined,
} from '@ant-design/icons-vue'
import relativeTime from 'dayjs/plugin/relativeTime'
import { formatViews } from '@/utils'
import { IComment } from '@/api/model/piped'

dayjs.extend(relativeTime)

defineProps<{
  content: IComment
  isChildren?: boolean
}>()

const refComment = ref<HTMLDivElement | null>(null)
const repliesPage = ref('')
const isFull = ref(false)
</script>

<template>
  <a-comment class="w-full">
    <div class="flex flex-col">
      <a-button
        v-if="!isChildren && content.replyCount > 0"
        type="text"
        shape="round"
        class="w-fit"
        @click="repliesPage = content.repliesPage!"
      >
        <div class="center gap-2">
          <CaretRightOutlined />
          {{ formatViews(content.replyCount) }} phản hồi
        </div>
      </a-button>
      <slot name="reply"> <CommentReplies /> </slot>
    </div>

    <!-- Like & Dislike -->
    <template #actions>
      <span key="comment-basic-like">
        <a-tooltip title="Like">
          <LikeOutlined />
        </a-tooltip>
        {{ formatViews(content.likeCount) }}
      </span>
      <span key="comment-basic-dislike">
        <a-tooltip title="Dislike">
          <DislikeOutlined />
        </a-tooltip>
      </span>
      <span v-if="!isChildren" key="comment-basic-reply-to">Reply to</span>
    </template>

    <!-- Author -->
    <template #author>
      <a
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
      <a-avatar :src="content.thumbnail" :alt="content.author" />
    </template>

    <!-- Content -->
    <template #content>
      <div class="flex flex-col">
        <div
          class="leading-normal cursor-default comment-content"
          :class="isFull ? 'showing' : ''"
          @click="isFull = !isFull"
        >
          <p ref="refComment" class="comment" v-html="content.commentText"></p>
        </div>
      </div>
    </template>

    <!-- Date -->
    <template #datetime>
      <div class="h-full center text-darkTitle">
        {{ content.commentedTime }}
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
</style>
