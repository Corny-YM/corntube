<script lang="ts" setup>
import dayjs from 'dayjs'
import {
  LikeOutlined,
  DislikeOutlined,
  CaretRightOutlined,
} from '@ant-design/icons-vue'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

defineProps({
  isChildren: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <a-comment class="w-full">
    <a-button v-if="!isChildren" type="text" shape="round">
      <div class="center gap-2">
        <CaretRightOutlined />
        19 phản hồi
      </div>
    </a-button>
    <slot name="reply"></slot>
    <!-- Like & Dislike -->
    <template #actions>
      <span key="comment-basic-like">
        <a-tooltip title="Like">
          <LikeOutlined />
        </a-tooltip>
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
      <a class="font-medium text-sm !text-black">@osamahamarsheh2718</a>
    </template>

    <!-- Avatar -->
    <template #avatar>
      <a-avatar src="https://i.pravatar.cc/150?img=3" alt="Han Solo" />
    </template>

    <!-- Content -->
    <template #content>
      <p class="comment">
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    </template>

    <!-- Date -->
    <template #datetime>
      <div class="h-full center text-darkTitle">4 weeks ago</div>
    </template>
  </a-comment>
</template>
