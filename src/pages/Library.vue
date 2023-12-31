<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuth } from '@/store/auth'
import PlaylistItem from '@/components/Library/PlaylistItem.vue'
import PlaylistVideoItem from '@/components/Library/PlaylistVideoItem.vue'
import ModalAddPlaylist from '@/components/Library/ModalAddPlaylist.vue'

const router = useRouter()
const route = useRoute()
const auth = useAuth()
const { userPlaylist } = storeToRefs(auth)

const open = ref(false)

const playlistId = computed(() => +route.query?.playlist!)
const videos = computed(
  () =>
    userPlaylist.value.find((playlist) => playlist.id === unref(playlistId))
      ?.PlaylistItem
)

const handleClick = (id: number) => {
  router.push({
    query: {
      playlist: id,
    },
  })
}

onMounted(() => {
  if (userPlaylist.value && userPlaylist.value.length) return
  auth.getPlaylist()
})
</script>

<template>
  <div class="w-full h-full overflow-auto mt-2 pr-4 dark:text-lightText">
    <template v-if="!playlistId">
      <div class="w-full flex justify-end items-center">
        <a-button
          type="dashed"
          class="dark:bg-headerDark dark:text-lightText"
          @click="open = true"
        >
          Tạo danh sách
        </a-button>
      </div>
      <VideoList v-if="userPlaylist && userPlaylist.length" class="!h-fit">
        <template #item>
          <PlaylistItem
            v-for="playlist in userPlaylist"
            :key="playlist.id"
            :playlist="playlist"
            @click="handleClick"
          />
        </template>
      </VideoList>
      <div v-else class="w-full">
        <EmptyData description="Chưa có danh sách nào" />
      </div>
    </template>
    <div v-else-if="videos && videos.length" class="w-full h-full">
      <PlaylistVideoItem
        v-for="(video, index) in videos"
        :key="video.url?.toString()"
        :index="index + 1"
        :video="video"
      />
    </div>
    <div v-else class="w-full">
      <EmptyData description="Danh sách này chưa có video nào" />
    </div>

    <ModalAddPlaylist v-model:open="open" />
  </div>
</template>

<style scoped lang="scss"></style>
