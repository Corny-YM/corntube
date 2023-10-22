<script setup lang="ts">
import { CheckCircleFilled } from '@ant-design/icons-vue'
</script>

<template>
  <div class="w-full">
    <div class="flex px-24 pt-6 pb-1">
      <!-- avatar -->
      <div class="center mr-6">
        <a-image
          :width="128"
          class="rounded-full"
          src="https://yt3.googleusercontent.com/68s19fmu6QktKduViaG7Yt3XMrBzCp5zhU2EFgOatkYqbo89Laq-r3rhjPmGjxFE5-wp_KQo=s176-c-k-c0x00ffffff-no-rj"
        />
      </div>
      <!-- info -->
      <div class="w-full flex flex-col justify-center">
        <div class="flex items-center gap-1">
          <div class="m-0 text-2xl font-medium">Thebausffs</div>
          <CheckCircleFilled class="text-sm" />
        </div>
        <div class="flex text-sm">703 N Người đăng ký</div>
      </div>
      <!-- Btn subscribe -->
      <div class="center">
        <a-button :type="true ? 'primary' : undefined" shape="round">
          Đăng ký
        </a-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
