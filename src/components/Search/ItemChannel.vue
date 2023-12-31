<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { formatViews } from '@/utils'
import { IChannelContent } from '@/api/model/piped'
import { useAuth } from '@/store/auth'
import NoAvatar from '@/assets/imgs/NoAvatar.png'

const props = defineProps<{
  data: IChannelContent
}>()

const auth = useAuth()
const { user, subscribedChannel } = storeToRefs(auth)

const isSubscribed = computed(() => {
  const item = subscribedChannel.value.find((channel) => {
    const curChannelId = props.data.url.split('/')[2]
    return curChannelId === channel.channel_id
  })
  return item ? true : false
})

const handleClickSubscription = () => {
  if (isSubscribed.value) {
    if (!user.value) return
    auth.removeSubscribed({
      user_id: user.value.id!,
      channel_id: props.data.url.split('/')[2],
    })
  } else {
    auth.createSubscribed({
      user_id: user.value?.id!,
      channel_id: props.data.url.split('/')[2],
      subscriber: JSON.stringify(props.data),
    })
  }
}
</script>

<template>
  <a :href="data.url" class="item-channel">
    <div class="channel-thumbnail">
      <a-image
        class="w-auto h-auto rounded-full object-contain self-stretch dark:shadow-slate-300 dark:shadow"
        loading="lazy"
        :preview="false"
        :src="data.thumbnail"
        :fallback="NoAvatar"
      />
    </div>

    <div class="flex-1 flex flex-col pr-4">
      <div class="mb-1 flex items-center">
        <div class="title">{{ data.name }}</div>
        <div v-if="data.verified" class="w-4 h-4 ml-2 center">
          <check-circle />
        </div>
      </div>
      <div class="text mb-1">
        {{ formatViews(data.subscribers, 0) }} người đăng ký
        {{ data.videos > 0 ? `• ${formatViews(data.videos)}` : null }}
      </div>
      <i class="text line-clamp-2">{{ data.description }}</i>
    </div>

    <div class="self-stretch center">
      <a-button
        class="h-9 dark:text-lightText"
        :class="isSubscribed ? 'dark:bg-headerDark' : ''"
        :type="isSubscribed ? 'dashed' : 'primary'"
        shape="round"
        size="middle"
        @click.prevent="handleClickSubscription"
      >
        {{ isSubscribed ? 'Đã đăng ký' : 'Đăng ký' }}
      </a-button>
    </div>
  </a>
</template>

<style scoped lang="scss">
.item-channel {
  @apply w-full flex justify-start items-center mt-6 sm:mt-4 cursor-pointer;
}
.channel-thumbnail {
  @apply flex justify-center items-center mr-4;
  @apply sm:max-w-[300px] sm:min-w-[300px];
  @apply md:max-w-[360px] md:min-w-[360px];
  @apply lg:max-w-[500px] lg:min-w-[500px];
}

.title {
  @apply text-[18px] font-medium line-clamp-2;
  @apply dark:text-lightHover text-[#0F0F0F];
}

.text {
  @apply dark:text-darkTitle text-[#606060] text-xs;
}
</style>
