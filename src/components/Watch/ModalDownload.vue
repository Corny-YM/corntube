<script setup lang="ts">
import { IDownloadModalProps, RadioEnum } from './watch.data'

const props = defineProps<IDownloadModalProps>()

const emits = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const radio = ref<string>(RadioEnum.MP3)
const quality = ref<string>()
const options = computed(() => {
  if (radio.value === RadioEnum.MP3) return props.options.mp3
  else return props.options.mp4
})

const open = computed({
  get: () => props.open,
  set: (value: boolean) => emits('update:open', value),
})

const handleOk = () => {}
const handleChangeRadio = () => {
  quality.value = undefined
}
const handleDownload = () => {
  if (!quality.value) return
}
</script>

<template>
  <a-modal
    v-model:open="open"
    title="Download"
    :centered="true"
    :footer="null"
    @ok="handleOk"
  >
    <div class="w-full flex items-center pt-4">
      <div class="w-full flex flex-col items-center">
        <!-- Options -->
        <a-radio-group
          v-model:value="radio"
          class="w-full"
          @change="handleChangeRadio"
        >
          <a-radio :value="RadioEnum.MP3" class="text">Mp3</a-radio>
          <a-radio :value="RadioEnum.MP4" class="text">Mp4</a-radio>
        </a-radio-group>

        <!-- Selection quality -->
        <a-select
          title="Chất lượng"
          class="w-full my-4 dark:text-lightText"
          placeholder="Chọn chất lượng"
          v-model:value="quality"
          :disabled="!options?.length"
          :options="options"
        ></a-select>

        <!-- Button -->
        <div class="w-full center">
          <a-button
            type="primary"
            shape="round"
            target="_blank"
            :href="quality"
            :disabled="!quality"
            @click="handleDownload"
          >
            Download {{ radio === RadioEnum.MP3 ? 'Mp3' : 'Mp4' }}
          </a-button>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<style scoped lang="scss">
.text {
  @apply dark:text-lightText;
}
</style>
