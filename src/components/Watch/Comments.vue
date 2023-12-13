<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import { getComments, getNextDataComments } from '@/api/piped'
import { IComment } from '@/api/model/piped'
import { messagePopup } from '@/utils'
import NoComments from '@/assets/imgs/NoComments.png'

defineProps<{
  authorData: {
    name: string
    avatar: string
  }
}>()

const route = useRoute()

const videoId = computed(() => route.query?.v)

const dataComment = ref<IComment[]>([])
const dataNextPage = ref('')

const { isLoading } = useQuery({
  queryKey: ['comment', unref(videoId)],
  queryFn: () => getComments(unref(videoId)),
  refetchOnWindowFocus: false,
  select(data) {
    dataComment.value = data.comments
    dataNextPage.value = data.nextpage
  },
})

const { mutate, isPending } = useMutation({
  mutationKey: ['nextpage', 'comments'],
  mutationFn: getNextDataComments,
  onSuccess(data) {
    dataComment.value = [...unref(dataComment), ...data.comments]
    dataNextPage.value = data.nextpage
  },
  onError() {
    messagePopup({ type: 'error' })
  },
})

const handleLoadMoreComments = () => {
  if (!dataNextPage) return
  mutate({
    id: unref(videoId),
    nextpage: unref(dataNextPage),
  })
}
</script>

<template>
  <div v-if="isLoading" class="w-full h-full center mt-8">
    <a-spin size="large" />
  </div>
  <div v-else-if="!dataComment || !dataComment.length" class="h-full center">
    <EmptyData :image="NoComments" description="Chưa có bình luận nào" />
  </div>
  <div v-else class="mb-8">
    <Comment
      v-for="comment in dataComment"
      :key="comment.commentId + comment.author"
      :content="comment"
      :author-data="authorData"
    />
    <div class="w-full center mt-2">
      <a-button
        v-if="dataNextPage"
        shape="round"
        type="dashed"
        class="dark:text-lightText dark:bg-headerDark"
        :loading="isPending"
        @click="handleLoadMoreComments"
      >
        Tải thêm
      </a-button>
    </div>
  </div>
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
