<script setup lang="ts">
import { CheckCircleFilled } from '@ant-design/icons-vue'
import { storeToRefs } from 'pinia'
import { formatViews } from '@/utils'
import { useAuth } from '@/store/auth'
import { Type } from '@/api/model/piped'
import NoAvatar from '@/assets/imgs/NoAvatar.png'

const props = defineProps<{
  avatar: string
  name: string
  subscriberCount: number
  verified: boolean
  description: string
}>()

const route = useRoute()
const auth = useAuth()
const { user, subscribedChannel } = storeToRefs(auth)

const channelId = computed(() => route.params.id)

const isSubscribed = computed(() => {
  const item = subscribedChannel.value.find((channel) => {
    const curChannelId = channelId.value.toString()
    return curChannelId === channel.channel_id
  })
  return item ? true : false
})

const handleSubscribed = () => {
  const data = {
    description: props.description,
    name: props.name,
    subscribers: props.subscriberCount,
    thumbnail: props.avatar,
    type: Type.Channel,
    url: route.path,
    verified: props.verified,
    videos: -1,
  }
  auth.createSubscribed({
    user_id: user.value?.id!,
    channel_id: channelId.value.toString(),
    subscriber: JSON.stringify(data),
  })
}
const handleClickSubscription = () => {
  if (isSubscribed.value) {
    if (!user.value) return
    auth.removeSubscribed({
      user_id: user.value.id!,
      channel_id: channelId.value.toString(),
    })
  } else handleSubscribed()
}
</script>

<template>
  <div class="w-full">
    <div class="flex pt-6 pb-1">
      <!-- avatar -->
      <div class="center mr-6">
        <a-image
          class="rounded-full dark:shadow-slate-300 dark:shadow"
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
          <a-button
            shape="round"
            size="middle"
            class="h-9 dark:text-lightText"
            :class="isSubscribed ? 'dark:bg-headerDark' : ''"
            :type="isSubscribed ? 'dashed' : 'primary'"
            @click.prevent="handleClickSubscription"
          >
            {{ isSubscribed ? 'Đã đăng ký' : 'Đăng ký' }}
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
