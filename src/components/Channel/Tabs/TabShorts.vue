<template>
  <VideoList class="short-list">
    <template #item>
      <ShortVideo v-for="n in 2" :key="n" />
    </template>
  </VideoList>
</template>
