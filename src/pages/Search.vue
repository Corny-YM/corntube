<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getSearchData } from '@/api/piped'
import { ISearch } from '@/api/model/piped'
import PageSearch from '@/components/Search/index.vue'

const route = useRoute()

const searchData = ref<ISearch | null>(null)
const filter = ref<'all' | 'videos' | 'channels' | 'playlists'>('all')

const query = computed(() => route.query.q!)

const { isLoading, refetch } = useQuery({
  enabled: !!unref(query),
  refetchOnWindowFocus: false,
  queryKey: ['search', unref(query).toString(), unref(filter)],
  queryFn: () =>
    getSearchData({
      q: unref(query).toString(),
      filter: unref(filter),
    }),
  select(data) {
    searchData.value = data
  },
})

watch([filter, query], () => {
  if (!unref(filter) || !unref(query)) return
  refetch()
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
    <EmptyData />
  </div>
  <PageSearch
    v-else
    :key="query.toString() + searchData.nextpage!"
    :data="searchData"
    v-model:filter="filter"
  />
</template>

<style scoped lang="scss"></style>
