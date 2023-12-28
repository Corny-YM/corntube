<script setup lang="ts">
import { h } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { useAuth } from '@/store/auth'
import { IPlaylistAddModalProps } from './watch.data'
import { storeToRefs } from 'pinia'

const props = defineProps<IPlaylistAddModalProps>()

const emits = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const auth = useAuth()
const { userPlaylist } = storeToRefs(auth)

const inputValue = ref('')

const open = computed({
  get: () => props.open,
  set: (value: boolean) => emits('update:open', value),
})
const isLimited = computed(() => inputValue.value.trim().length > 20)

const handleOk = () => {
  inputValue.value = ''
}
const handleSearch = () => {
  auth.createPlaylist(unref(inputValue))
  inputValue.value = ''
}
const handleClickAddItem = (e: MouseEvent) => {
  const id = (e.currentTarget as HTMLDivElement).dataset.id
  console.log(id)
  auth.addPlaylistItem({
    ...props.video,
    playlist_id: +id!,
  })
}

onMounted(() => {
  if (userPlaylist.value && userPlaylist.value.length) return
  auth.getPlaylist()
})
</script>

<template>
  <a-modal
    v-model:open="open"
    title="Thêm vào Playlist"
    :centered="true"
    :footer="null"
    @ok="handleOk"
  >
    <div class="w-full flex items-center pt-4">
      <!-- List Playlist -->
      <div class="w-full flex flex-col justify-center items-center">
        <!-- Item -->
        <div class="w-full max-h-[384px] h-48 overflow-auto">
          <div
            v-if="!userPlaylist || !userPlaylist.length"
            class="w-full h-full center"
          >
            <!-- <a-spin size="large"></a-spin> -->
            <EmptyData class="!m-0" />
          </div>
          <div
            v-else
            v-for="playlist in userPlaylist"
            :key="playlist.id"
            :data-id="playlist.id"
            class="playlist-item"
            @click="handleClickAddItem"
          >
            <div class="flex items-center">
              <div class="center w-5 h-5 mr-2"><AddPlaylist /></div>
              <div class="text-base font-bold">{{ playlist.name }}</div>
            </div>
            <a-button
              type="dashed"
              shape="circle"
              :icon="h(PlusOutlined)"
              class="center font-medium"
            ></a-button>
          </div>
        </div>

        <div class="w-full mt-4">
          <a-input-search
            v-model:value="inputValue"
            :status="isLimited ? 'error' : ''"
            placeholder="Nhập tên danh sách phát"
            title="Tên"
            size="large"
            class="header--search-bar"
            @search="handleSearch"
          >
            <template #enterButton>
              <a-button
                :disabled="!inputValue"
                :danger="isLimited"
                class="dark:bg-darkHover dark:!text-lightText leading-normal"
                :class="{
                  'dark:hover:!text-blueAntd': inputValue,
                }"
              >
                Tạo
              </a-button>
            </template>
          </a-input-search>
          <div v-if="isLimited" class="px-2 font-semibold text-redAntd">
            Quá 20 ký tự
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<style scoped lang="scss">
.playlist-item {
  @apply w-full flex justify-between items-center;

  & + & {
    @apply mt-2;
  }
}
</style>
