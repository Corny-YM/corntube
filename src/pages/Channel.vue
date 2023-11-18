<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import { getChannel, getNextDataChannel } from '@/api/piped'
import type { IChannel, ITrending } from '@/api/model/piped'
import ChannelHeader from '@/components/Channel/Header.vue'
import ChannelTabs from '@/components/Channel/Tabs/index.vue'
import { messagePopup } from '@/utils'
import NoBackground from '@/assets/imgs/NoBackground.jpg'

const route = useRoute()

const channelId = computed(() => route.params.id.toString())
const channelData = ref<IChannel | null>(null)
const relatedStreams = ref<ITrending[]>([])
const nextPageData = ref('')

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
    console.log(data)
    relatedStreams.value = [...relatedStreams.value, ...data.relatedStreams]
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
    <a-empty description="Không tìm thấy dữ liệu" />
  </div>
  <div v-else class="h-full flex flex-col items-center overflow-y-auto">
    <!-- Banner Picture -->
    <div class="w-full center">
      <a-image
        width="100%"
        :src="channelData.bannerUrl || ''"
        :preview="true"
        :fallback="NoBackground"
        class="max-h-40 object-cover"
      />
    </div>

    <div class="channel-content">
      <!-- Channel Header -->
      <ChannelHeader
        :name="channelData.name"
        :subscriber-count="channelData.subscriberCount"
        :avatar="channelData.avatarUrl"
        :verified="channelData.verified"
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
  width: 100%;
  padding: 0 16px;

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
