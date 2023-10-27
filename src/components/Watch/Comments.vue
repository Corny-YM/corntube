<script setup lang="ts">
import { Empty } from 'ant-design-vue'
import { useQuery } from '@tanstack/vue-query'
import { getComments } from '@/api/piped'
import { IComment } from '@/api/model/piped'

const route = useRoute()

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
const dataComment = ref<IComment[]>([])
const videoId = computed(() => route.query?.v)

const { isLoading } = useQuery({
  queryKey: ['comment', videoId],
  queryFn: () => getComments(unref(videoId)),
  select(data) {
    dataComment.value = data.comments
  },
})
</script>

<template>
  <div v-if="isLoading" class="w-full h-full center mt-8">
    <a-spin size="large" />
  </div>
  <div v-else-if="!dataComment || !dataComment.length" class="h-full center">
    <a-empty :image="simpleImage" description="Chưa có bình luận nào" />
  </div>
  <Comment
    v-else
    v-for="comment in dataComment"
    :key="comment.commentId"
    :content="comment"
  >
    <!-- <template #reply>
      <Comment is-children :content="comment" />
      <Comment is-children :content="comment" />
    </template> -->
  </Comment>
  <!-- <Comment>
    <template #reply>
      <Comment is-children />
      <Comment is-children />
    </template>
  </Comment>
  <Comment>
    <template #reply>
      <Comment is-children />
    </template>
  </Comment> -->
</template>

<style scoped lang="scss">
.comment {
  font-size: 14px;
  line-height: 2rem;
  font-weight: 400;
  line-height: 2rem;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}
</style>
