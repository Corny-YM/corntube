<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import { getChannel, getNextDataChannel } from '@/api/piped'
import type { IChannel, ITrending } from '@/api/model/piped'
import ChannelHeader from '@/components/Channel/Header.vue'
import ChannelTabs from '@/components/Channel/Tabs/index.vue'
import { messagePopup } from '@/utils'

const route = useRoute()

const channelData = ref<IChannel | null>(null)
const relatedStreams = ref<ITrending[]>([])
const nextPageData = ref('')
const isBannerError = ref(false)
const channelId = computed(() => route.params.id.toString())

const { isLoading } = useQuery({
  queryKey: ['channel', unref(channelId)],
  queryFn: () => getChannel(unref(channelId)),
  enabled: !!unref(channelId),
  refetchOnWindowFocus: false,
  select(data) {
    channelData.value = data
    relatedStreams.value = data.relatedStreams
    nextPageData.value = data.nextpage
  },
})

const { mutate, isPending } = useMutation({
  mutationKey: ['channel', 'nextpage'],
  mutationFn: getNextDataChannel,
  onSuccess(data) {
    relatedStreams.value = [...relatedStreams.value, ...data.relatedStreams]
    nextPageData.value = data.nextpage || ''
  },
  onError(err) {
    console.log(err)
    messagePopup({ type: 'error' })
  },
})

const handleNextDataChannel = () => {
  if (unref(nextPageData)) {
    mutate({
      id: unref(channelId),
      nextpage: unref(nextPageData),
    })
  }
}
</script>

<template>
  <div v-if="isLoading" class="w-full h-full center">
    <a-spin size="large" />
  </div>
  <div
    v-else-if="!channelData || !Object.keys(channelData).length"
    class="h-full center"
  >
    <EmptyData />
  </div>
  <div
    v-else
    class="h-full flex flex-col items-center overflow-y-auto dark:text-lightText"
  >
    <!-- Banner Picture -->
    <div
      v-if="!isBannerError"
      class="w-full center dark:shadow-slate-200 dark:shadow"
    >
      <img
        class="w-full object-cover"
        :src="channelData.bannerUrl!"
        loading="lazy"
        @error="isBannerError = true"
      />
    </div>

    <div class="channel-content">
      <!-- Channel Header -->
      <ChannelHeader
        :name="channelData.name"
        :subscriber-count="channelData.subscriberCount"
        :avatar="channelData.avatarUrl"
        :verified="channelData.verified"
        :description="channelData.description"
      />

      <!-- Tabs -->
      <ChannelTabs
        :channelId="channelData.id"
        :tabs="channelData.tabs"
        :relatedStreams="relatedStreams"
        :description="channelData.description"
        :nextpage="nextPageData"
        :loading="isPending"
        @click="handleNextDataChannel"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.channel-content {
  @apply w-full py-0 px-2 sm:px-4 flex flex-col;

  @media (min-width: 860px) {
    width: 91.666667%;
    padding: 0;
  }

  @media (min-width: 1024px) {
    width: 83.333333%;
    padding: 0;
  }
}
</style>
