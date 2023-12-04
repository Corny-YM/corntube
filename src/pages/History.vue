<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Modal } from 'ant-design-vue'
import { useLocalDBStore } from '@/store/localDB'
import ItemVideos from '@/components/History/ItemVideos.vue'
import { createVNode } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const localDBStore = useLocalDBStore()
const { data, isLoading } = storeToRefs(localDBStore)

const searchQuery = ref('')

const handleSearch = (value: string) => {
  localDBStore.getData(value)
}
const handleClearHistory = () => {
  Modal.confirm({
    title: 'Xóa toàn bộ nhật ký xem?',
    icon: createVNode(ExclamationCircleOutlined),
    content:
      'Toàn bộ nhật ký xem của bạn sẽ bị xóa. Sau khi xóa không thể hoàn tác',
    okType: 'danger',
    okCancel: true,
    onOk() {
      localDBStore.clearAll()
    },
  })
}

onMounted(() => {
  localDBStore.getData(searchQuery.value)
})

onUnmounted(() => {
  localDBStore.getData()
})
</script>

<template>
  <div class="w-full h-full overflow-auto px-6 pt-2">
    <div class="max-w-[1250px] mx-auto mt-4 pb-8">
      <div class="w-full text-4xl font-bold mb-8">Nhật ký xem</div>
      <div class="flex flex-col-reverse min-[500px]:flex-row w-full justify-between items-end">
        <a-button
          class="w-fit mr-2 min-[500px]:opacity-70 hover:opacity-100 transition-all font-medium"
          type="primary"
          shape="round"
          @click="handleClearHistory"
        >
          Xóa toàn bộ nhật ký xem
        </a-button>
        <a-input-search
          v-model:value="searchQuery"
          class="mb-4 min-[500px]:mb-0 min-[500px]:max-w-[250px]"
          placeholder="Tìm kiếm trong danh sách video đã xem"
          enter-button
          :loading="isLoading"
          @search="handleSearch"
        />
      </div>

      <!-- List -->
      <div class="w-full h-auto">
        <EmptyData v-if="!data.length" description="Không tìm thấy dữ liệu" />
        <ItemVideos
          v-else
          v-for="video in data"
          :key="video.id"
          :data="video"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
