<script lang="ts" setup>
import dayjs from 'dayjs'
import {
  LikeOutlined,
  DislikeOutlined,
  CaretDownOutlined,
} from '@ant-design/icons-vue'
import relativeTime from 'dayjs/plugin/relativeTime'
import { formatViews, messagePopup } from '@/utils'
import { IComment } from '@/api/model/piped'

dayjs.extend(relativeTime)

const props = defineProps<{
  content: IComment
  isChildren?: boolean
}>()

const isFull = ref(false)
const refComment = ref<HTMLDivElement | null>(null)
const repliesPage = ref('')
const isOpen = ref(false)

const handleClick = () => {
  if (!unref(repliesPage)) repliesPage.value = props.content.repliesPage!
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
      <slot name="reply">
        <div class="reply-content" :class="isOpen ? 'show' : 'close'">
          <CommentReplies :repliesPage="repliesPage" />
        </div>
      </slot>
    </div>

    <!-- Like & Dislike -->
    <template #actions>
      <span key="comment-basic-like" @click="handleLike">
        <a-tooltip title="Like">
          <LikeOutlined />
        </a-tooltip>
        {{ formatViews(content.likeCount) }}
      </span>
      <span key="comment-basic-dislike" @click="handleLike">
        <a-tooltip title="Dislike">
          <DislikeOutlined />
        </a-tooltip>
      </span>
      <span v-if="!isChildren" key="comment-basic-reply-to" @click="handleLike">
        Reply to
      </span>
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
@/utils/format
