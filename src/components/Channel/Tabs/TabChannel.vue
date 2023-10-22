<template>
  <div class="w-full flex flex-wrap justify-evenly items-center">
    <div v-for="n in 10" :key="n" class="w-52 center flex-col mb-4">
      <a-image
        class="rounded-full"
        :width="103"
        src="https://yt3.googleusercontent.com/CZiQg0rRX-GmjzH8Pbp8ah2QfDDfMhnbHan3ThbyKk7pGqsdHAtFyZJQWjRb-f5zizIpcpaH-Q=s176-c-k-c0x00ffffff-no-rj-mo"
        :preview="false"
      />
      <div class="font-medium my-1">Long Áo Đen</div>
      <div class="text-xs text-lightTitle">64 N người đăng ký</div>

      <a-button shape="round" class="mt-4 text-xs">Đăng ký</a-button>
    </div>
  </div>
</template>
