<script setup lang="ts">
import VideoList from '@/components/Videos/VideoList.vue'
import { useQuery } from '@tanstack/vue-query'
import { getTrending } from '@/api/piped'
import { ITrending } from '@/api/model/piped'

const trendingData = ref<ITrending[]>([])

const { isLoading } = useQuery({
  queryKey: ['trending'],
  queryFn: () =>
    getTrending({
      region: 'VN',
    }),
  refetchOnWindowFocus: false,
  select(data) {
    trendingData.value = data
  },
})
</script>

<template>
  <!-- LIST VIDEO -->
  <div v-if="isLoading" class="w-full h-full center">
    <a-spin size="large" />
  </div>
  <div v-else-if="!trendingData || !trendingData.length" class="h-full center">
    <a-empty description="Không tìm thấy dữ liệu" />
  </div>
  <VideoList v-else :data="trendingData" />
</template>

<style scoped lang="scss"></style>
