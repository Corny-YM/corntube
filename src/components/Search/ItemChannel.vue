<script setup lang="ts">
import { formatViews, messagePopup } from '@/utils'
import { IChannelContent } from '@/api/model/piped'
import NoAvatar from '@/assets/imgs/NoAvatar.png'
import { useMutation } from '@tanstack/vue-query'
import { userSubscription } from '@/api/supabase'
import { useAuth } from '@/store/auth'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  data: IChannelContent
}>()

const auth = useAuth()
const { user } = storeToRefs(auth)

const { mutateAsync, isPending } = useMutation({
  mutationKey: ['subscriber', 'user'],
  mutationFn: userSubscription,
  onSuccess(data: any) {
    if (data?.message) {
      messagePopup({
        type: 'error',
        content: 'Đăng ký kênh thất bại. Vui lòng thử lại sau',
      })
    }
  },
  onError() {
    messagePopup({
      type: 'error',
      content: 'Đăng ký kênh thất bại. Vui lòng thử lại sau',
    })
  },
})

const handleSubscribed = () => {
  if (!user.value) return
  mutateAsync({
    user_id: user.value.id,
    subscriber: JSON.stringify(props.data),
  })
}
</script>

<template>
  <a :href="data.url" class="item-channel">
    <div class="channel-thumbnail">
      <a-image
        class="w-auto h-auto rounded-full object-contain self-stretch"
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
        class="h-9"
        type="primary"
        shape="round"
        size="middle"
        :loading="isPending"
        @click.prevent="handleSubscribed"
      >
        Đăng ký
      </a-button>
    </div>
  </a>
</template>

<style scoped lang="scss">
.item-channel {
  @apply w-full flex justify-start items-center mt-6 sm:mt-4 cursor-pointer;
}
.channel-thumbnail {
  @apply center mr-4;
  @apply sm:max-w-[300px] sm:min-w-[300px];
  @apply md:max-w-[360px] md:min-w-[360px];
  @apply lg:max-w-[500px] lg:min-w-[500px];
}

.title {
  @apply text-[#0F0F0F] text-[18px] font-medium line-clamp-2;
}

.text {
  @apply text-[#606060] text-xs;
}
</style>
