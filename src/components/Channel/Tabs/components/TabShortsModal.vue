<script setup lang="ts">
import { getStreams } from '@/api/piped'
import { useQuery } from '@tanstack/vue-query'

const props = defineProps<{
  open: boolean
  url: string
}>()

const emits = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const open = computed({
  get: () => props.open,
  set: (value) => emits('update:open', value),
})
const enabled = computed(() => !!props.url)

// TODO show data

const { data, isLoading } = useQuery({
  enabled,
  queryKey: ['tab', 'shorts', props.url],
  queryFn: () => getStreams(props.url!),
  select(data) {
    console.log(data)
  },
})
</script>

<template>
  <a-modal v-model:open="open" centered :footer="null" :closable="false">
    <div class="center w-full h-full">
      {{ isLoading }}
      {{ url }}
      {{ data }}
    </div>
  </a-modal>
</template>
