<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuth } from '@/store/auth'

const auth = useAuth()
const { subscribedChannel } = storeToRefs(auth)

const channels = computed(() => subscribedChannel.value)
</script>

<template>
  <div v-if="!channels.length" class="w-full center">
    <EmptyData description="Tài khoản này chưa đăng ký kênh nào" />
  </div>
  <div v-else class="w-full h-full overflow-auto px-6 pt-2">
    <div class="max-w-[1250px] mx-auto mt-4 pb-8">
      <template v-for="item in channels" :key="item.url">
        <ItemChannel :data="JSON.parse(item.subscriber)" />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
