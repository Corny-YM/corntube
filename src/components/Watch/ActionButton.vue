<script setup lang="ts">
defineProps<{
  icon: VNode
  shape?: 'default' | 'circle' | 'round'
  title?: string
}>()

const emits = defineEmits(['click'])
</script>

<template>
  <a-button
    class="action-btn dark:bg-headerDark dark:text-lightText"
    :shape="shape || 'round'"
    :icon="icon"
    @click="emits('click')"
  >
    {{ title }}
  </a-button>
</template>

<style scoped lang="scss">
.action-btn {
  & + & {
    @apply ml-2;
  }
}
</style>
