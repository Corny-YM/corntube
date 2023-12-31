<script setup lang="ts">
import { useAuth } from '@/store/auth'

const props = defineProps<{
  open: boolean
}>()

const emits = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const auth = useAuth()

const inputValue = ref('')

const open = computed({
  get: () => props.open,
  set: (value: boolean) => emits('update:open', value),
})
const isLimited = computed(() => inputValue.value.trim().length > 20)

const handleOk = () => {
  inputValue.value = ''
}
const handleAddPlaylist = () => {
  auth.createPlaylist(unref(inputValue))
  inputValue.value = ''
  open.value = false
}
</script>

<template>
  <a-modal
    v-model:open="open"
    title="Thêm vào danh sách phát"
    :centered="true"
    :footer="null"
    @ok="handleOk"
  >
    <div class="w-full mt-4">
      <a-input-search
        v-model:value="inputValue"
        :status="isLimited ? 'error' : ''"
        placeholder="Nhập tên danh sách phát"
        title="Tên"
        size="large"
        class="header--search-bar"
        @search="handleAddPlaylist"
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
  </a-modal>
</template>

<style scoped lang="scss"></style>
