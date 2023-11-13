<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getPlaylist } from '@/api/piped'
import type { IPlaylist } from '@/api/model/piped'
import PagePlaylist from '@/components/Playlist/index.vue'

const route = useRoute()

const playlistId = computed(() => route.query.list)
const enabled = computed(() => !!route.query.list)
const playlistData = ref<IPlaylist | null>()

const { isLoading } = useQuery({
  enabled: unref(enabled),
  queryKey: ['playlist'],
  queryFn: () => getPlaylist(unref(playlistId)),
  select(data) {
    playlistData.value = data
  },
})
</script>

<template>
  <div v-if="isLoading" class="w-full h-full center">
    <a-spin size="large" />
  </div>
  <div
    v-else-if="!playlistData || !Object.keys(playlistData).length"
    class="h-full center"
  >
    <a-empty description="Không tìm thấy dữ liệu" />
  </div>
  <PagePlaylist v-else :data="playlistData" />
</template>
