<script setup lang="ts"></script>

<template>
  <div class="w-full h-full flex justify-between items-center py-6">
    <!-- Info -->
    <PlaylistInfo />

    <!-- playlist -->
    <div
      class="w-full h-full flex flex-col justify-start items-start mr-6 overflow-auto"
    >
      <!-- List Videos -->
      <PlaylistVideoItem v-for="n in 8" :key="n" :index="n" />
    </div>
  </div>
</template>
