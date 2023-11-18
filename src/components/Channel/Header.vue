<script setup lang="ts">
import { formatViews } from '@/utils'
import { CheckCircleFilled } from '@ant-design/icons-vue'
import NoAvatar from '@/assets/imgs/NoAvatar.png'

defineProps<{
  avatar: string
  name: string
  subscriberCount: number
  verified: boolean
}>()
</script>

<template>
  <div class="w-full">
    <div class="flex pt-6 pb-1">
      <!-- avatar -->
      <div class="center mr-6">
        <a-image
          class="rounded-full"
          :width="128"
          :src="avatar"
          :fallback="NoAvatar"
          :preview="false"
        />
      </div>
      <div
        class="w-full flex flex-col sm:flex-row justify-center items-start sm:items-center"
      >
        <!-- info -->
        <div class="w-full flex flex-col justify-center">
          <div class="flex items-center">
            <div class="m-0 text-2xl font-medium">{{ name }}</div>
            <div v-if="verified" class="h-full center ml-2">
              <CheckCircleFilled class="center text-sm" />
            </div>
          </div>
          <div v-if="subscriberCount > 0" class="flex text-sm">
            {{ formatViews(subscriberCount) }} người đăng ký
          </div>
        </div>
        <!-- Btn subscribe -->
        <div class="center mt-4 sm:mt-0">
          <a-button :type="true ? 'primary' : undefined" shape="round">
            Đăng ký
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
