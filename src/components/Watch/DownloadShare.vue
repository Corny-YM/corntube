<script setup lang="ts">
import { CopyOutlined } from '@ant-design/icons-vue'
import { IShareModalProps } from './watch.data'
import { messagePopup } from '@/utils'

const props = defineProps<IShareModalProps>()

const emits = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const inputValue = ref<string>(window.location.href)

const open = computed({
  get: () => props.open,
  set: (value: boolean) => emits('update:open', value),
})

const handleOk = () => {}
const handleCopyUrl = () => {
  navigator.clipboard.writeText(inputValue.value)
  messagePopup({
    content: 'Sao chép đường dẫn thành công',
    type: 'success',
  })
}
</script>

<template>
  <a-modal
    v-model:open="open"
    title="Share"
    :centered="true"
    :footer="null"
    @ok="handleOk"
  >
    <div class="w-full flex items-center pt-4">
      <a-input-group compact class="flex items-center">
        <a-input
          v-model:value="inputValue"
          :style="{ width: 'calc(100% - 32px)' }"
        />
        <a-tooltip title="Sao chép đường dẫn">
          <a-button @click="handleCopyUrl">
            <template #icon><CopyOutlined /></template>
          </a-button>
        </a-tooltip>
      </a-input-group>
    </div>
  </a-modal>
</template>

<style scoped lang="scss">
.text {
  @apply dark:text-lightText;
}
</style>
