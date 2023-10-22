<script setup lang="ts"></script>

<template>
  <Comment>
    <template #reply>
      <Comment is-children />
      <Comment is-children />
    </template>
  </Comment>
  <Comment>
    <template #reply>
      <Comment is-children />
    </template>
  </Comment>
</template>

<style scoped lang="scss">
.comment {
  font-size: 14px;
  line-height: 2rem;
  font-weight: 400;
  line-height: 2rem;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}
</style>
