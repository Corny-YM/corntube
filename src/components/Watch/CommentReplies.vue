<script setup lang="ts">
import { IComment } from '@/api/model/piped'
import { getMoreComments } from '@/api/piped'
import { messagePopup } from '@/utils'
import { useMutation, useQuery } from '@tanstack/vue-query'

const props = defineProps<{
  repliesPage: string
}>()

const route = useRoute()
const videoId = computed(() => route.query?.v)
const replies = computed(() => props.repliesPage)
const enabled = computed(() => !!props.repliesPage && !!unref(videoId))

const dataReplies = ref<IComment[]>([])
const dataNextPage = ref('')

const { isLoading } = useQuery({
  enabled: enabled,
  queryKey: ['replies', videoId, replies],
  refetchOnWindowFocus: false,
  queryFn: () =>
    getMoreComments({
      id: unref(videoId),
      nextpage: unref(replies),
    }),
  select(data) {
    dataReplies.value = data.comments
    dataNextPage.value = data.nextpage
  },
})

const { mutate, isPending } = useMutation({
  mutationKey: ['nextpage', 'comments'],
  mutationFn: getMoreComments,
  onSuccess(data) {
    dataReplies.value = [...unref(dataReplies), ...data.comments]
    dataNextPage.value = data.nextpage
  },
  onError() {
    messagePopup({ type: 'error' })
  },
})

const handleLoadMoreReplies = () => {
  if (!dataNextPage) return
  mutate({
    id: unref(videoId),
    nextpage: unref(dataNextPage),
  })
}
</script>

<template>
  <div v-if="isLoading" class="w-full center mt-8">
    <a-spin size="small" />
  </div>
  <div v-else-if="dataReplies && dataReplies.length" class="flex flex-col">
    <Comment
      v-for="reply in dataReplies"
      :key="reply.commentId"
      :content="reply"
    />
    <div class="mt-2 pl-8">
      <a-button
        v-if="dataNextPage"
        shape="round"
        type="dashed"
        size="small"
        :loading="isPending"
        @click="handleLoadMoreReplies"
      >
        Tải thêm
      </a-button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
