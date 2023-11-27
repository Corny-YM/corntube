<script setup lang="ts">
import { useLocalDBStore } from '@/store/localDB'
import { storeToRefs } from 'pinia'
import ItemVideos from '@/components/History/ItemVideos.vue'

const localDBStore = useLocalDBStore()
const { data, isLoading } = storeToRefs(localDBStore)

const searchQuery = ref('')

const handleSearch = (value: string) => {
  localDBStore.getData(value)
}

onMounted(() => {
  localDBStore.getData(searchQuery.value)
})
</script>

<template>
  <div class="w-full h-full overflow-auto px-6 pt-2">
    <div class="max-w-[1250px] mx-auto mt-4 pb-8">
      <div class="w-full text-4xl font-bold mb-8">Nhật ký xem</div>
      <div class="flex w-full justify-between">
        <a-button
          type="primary"
          shape="round"
          class="mr-2 opacity-70 hover:opacity-100 transition-all font-medium"
        >
          Xóa toàn cả nhật ký xem
        </a-button>
        <a-input-search
          v-model:value="searchQuery"
          class="max-w-[250px]"
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
