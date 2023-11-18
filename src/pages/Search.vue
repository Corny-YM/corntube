<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getSearchData } from '@/api/piped'

const route = useRoute()

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
    console.log(data)
  },
})
</script>

<template></template>

<style scoped lang="scss"></style>
