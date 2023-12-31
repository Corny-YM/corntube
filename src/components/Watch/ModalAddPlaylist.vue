<script setup lang="ts">
import { h } from 'vue'
import { storeToRefs } from 'pinia'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { useApp } from '@/store/app'
import { useAuth } from '@/store/auth'
import { IPlaylistAddModalProps } from './watch.data'

const props = defineProps<IPlaylistAddModalProps>()

const emits = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const app = useApp()
const auth = useAuth()
const { userPlaylist } = storeToRefs(auth)

const inputValue = ref('')
const userPlaylistId = ref(new Map())

const open = computed({
  get: () => props.open,
  set: (value: boolean) => emits('update:open', value),
})
const isLimited = computed(() => inputValue.value.trim().length > 20)

const checkExisted = (key: number) => !!userPlaylistId.value.get(key)
const handleOk = () => {
  inputValue.value = ''
}
const handleSearch = () => {
  auth.createPlaylist(unref(inputValue))
  inputValue.value = ''
}
const handleRemoveItem = async (id: number) => {
  const itemId = userPlaylistId.value.get(id)
  if (!itemId) return
  await auth.removePlaylistItem(+itemId)
  userPlaylistId.value.delete(id)
}
const handleAddItem = async (id: number) => {
  const data = await auth.addPlaylistItem(
    {
      ...props.video,
      playlist_id: id,
    },
    async (value: number) => {
      await auth.removePlaylistItem(+value)
      userPlaylistId.value.delete(id)
    }
  )
  if (data) {
    userPlaylistId.value.set(id, data.id)
  }
}
const handleClickItem = async (e: MouseEvent) => {
  const id = (e.currentTarget as HTMLDivElement).dataset.id
  if (!id) return
  if (!checkExisted(+id)) return await handleAddItem(+id)
  return await handleRemoveItem(+id)
}

onMounted(() => {
  if (userPlaylist.value && userPlaylist.value.length) return
  auth.getPlaylist()
})
</script>

<template>
  <a-modal
    v-model:open="open"
    title="Thêm vào danh sách phát"
    :centered="true"
    :footer="null"
    @ok="handleOk"
  >
    <component :is="app.contextHolder" />
    <div class="w-full h-full flex items-center">
      <!-- List Playlist -->
      <div class="w-full flex flex-col justify-center items-center">
        <!-- Item -->
        <div class="w-full max-h-[384px] h-48 overflow-auto">
          <div
            v-if="!userPlaylist || !userPlaylist.length"
            class="w-full h-full center"
          >
            <EmptyData class="!m-0" />
          </div>
          <div
            v-else
            v-for="playlist in userPlaylist"
            :key="playlist.id"
            class="playlist-item px-2"
          >
            <div class="flex items-center">
              <div class="center w-5 h-5 mr-2"><AddPlaylist /></div>
              <div class="text-base font-bold">{{ playlist.name }}</div>
            </div>
            <a-button
              class="center font-medium"
              type="dashed"
              shape="circle"
              :data-id="playlist.id"
              :icon="
                h(!checkExisted(playlist.id) ? PlusOutlined : CloseOutlined)
              "
              @click="handleClickItem"
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
