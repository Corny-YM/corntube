<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getSearchData } from '@/api/piped'
import { ISearch } from '@/api/model/piped'
import PageSearch from '@/components/Search/index.vue'

const route = useRoute()

const searchData = ref<ISearch | null>(null)

const query = computed(() => route.query.q!)

const { isLoading } = useQuery({
  enabled: !!unref(query),
  queryKey: ['search', unref(query)],
  queryFn: () =>
    getSearchData({
      q: unref(query).toString(),
      filter: 'all',
    }),
  refetchOnWindowFocus: false,
  select(data) {
    searchData.value = data
  },
})
</script>

<template>
  <div v-if="isLoading" class="w-full h-full center">
    <a-spin size="large" />
  </div>
  <div
    v-else-if="!searchData || !Object.keys(searchData).length"
    class="w-full h-full center"
  >
    <a-empty description="Không tìm thấy dữ liệu" />
  </div>
  <PageSearch v-else :data="searchData" />
</template>

<style scoped lang="scss"></style>
