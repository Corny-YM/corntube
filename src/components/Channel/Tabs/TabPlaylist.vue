<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import { messagePopup } from '@/utils'
import { getPlaylist, getTabsData } from '@/api/piped'
import type { ITabPlaylist, IPlaylistContent } from '@/api/model/piped'
import PlaylistItem from './components/PlaylistItem.vue'

const props = defineProps<{
  data: string
}>()

const router = useRouter()
const route = useRoute()

const playlistData = ref<IPlaylistContent[]>([])
const dataNextPage = ref('')

const channelId = computed(() => route.params.id.toString())

const { isLoading } = useQuery({
  enabled: !!unref(channelId) && !!props.data,
  queryKey: ['shorts', unref(channelId), props.data],
  queryFn: () => getTabsData<ITabPlaylist>(props.data),
  select(data) {
    playlistData.value = data.content
    dataNextPage.value = data.nextpage
  },
})

const { mutate, isPending } = useMutation({
  mutationKey: ['nextpage', dataNextPage.value],
  mutationFn: (params: { data: string; nextpage: string }) =>
    getTabsData<ITabPlaylist>(params.data, params.nextpage),
  onSuccess(data) {
    playlistData.value = [...playlistData.value, ...data.content]
    dataNextPage.value = data.nextpage || ''
  },
})

const { mutate: mutatePlaylist } = useMutation({
  mutationKey: ['playlist', 'get'],
  mutationFn: (value: string) => getPlaylist(value),
  onSuccess(data, variable) {
    const relatedStreams = data.relatedStreams
    const videoId = relatedStreams[0].url!
    router.push(`${videoId}&list=${variable}`)
  },
  onError(err) {
    messagePopup({ type: 'error' })
    console.log(err)
  },
})

const handleLoadNextPage = () => {
  if (!unref(dataNextPage)) return
  mutate({
    data: props.data,
    nextpage: dataNextPage.value,
  })
}

const handleClickItem = (url: string) => {
  const id = url.split('=')[1]
  mutatePlaylist(id)
}
</script>

<template>
  <div v-if="isLoading" class="w-full h-full center">
    <a-spin size="large" />
  </div>
  <div v-else-if="!playlistData || !playlistData.length" class="h-full center">
    <EmptyData description="Kênh này chưa có danh sách phát nào" />
  </div>
  <VideoList v-else class="playlist">
    <template #item>
      <PlaylistItem
        v-for="playlist in playlistData"
        :key="playlist.url"
        :playlist="playlist"
        @click="handleClickItem"
      />
    </template>
  </VideoList>
  <div v-if="dataNextPage" class="w-full center pb-4">
    <a-button
      class="dark:bg-headerDark dark:text-lightText"
      type="dashed"
      shape="round"
      :loading="isPending"
      @click="handleLoadNextPage"
    >
      Tải thêm
    </a-button>
  </div>
</template>

<style scoped lang="scss"></style>
