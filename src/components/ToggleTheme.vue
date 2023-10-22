<script lang="ts" setup>
const checked = ref<boolean>(false)
</script>

<template>
  <a-switch
    v-model:checked="checked"
    checked-children="Dark"
    un-checked-children="Light"
  />
</template>
