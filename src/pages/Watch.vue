<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getStreams } from '@/api/piped'
import { IStreams } from '@/api/model/piped'
import Watch from '@/components/Watch/index.vue'

const route = useRoute()

const videoId = computed(() => route.query.v)

const streamsData = ref<IStreams | null>(null)

const { isLoading } = useQuery({
  queryKey: ['streams', videoId],
  queryFn: () => getStreams(unref(videoId)),
  refetchOnWindowFocus: false,
  select(data) {
    streamsData.value = data
  },
})
</script>

<template>
  <div v-if="isLoading" class="w-full h-full center">
    <a-spin size="large" />
  </div>
  <div v-else-if="!streamsData" class="h-full center">
    <a-empty description="Không tìm thấy dữ liệu" />
  </div>
  <Watch v-else :data="streamsData" />
</template>

<style scoped lang="scss">
.title {
  white-space: normal;
  word-break: break-word;
  font-size: 20px;
  line-height: 2.8rem;
  font-weight: 500;
}

.heading-comment {
  display: flex;
  align-items: center;
  height: 30px;
  border-left: 3px solid #1677ff;
  font-size: 18px;
  font-weight: 600;
  padding-left: 8px;
  margin-top: 28px;
  margin-bottom: 18px;
}
</style>
