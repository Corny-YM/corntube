<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getChannel } from '@/api/piped'
import type { IChannel } from '@/api/model/piped'
import ChannelHeader from '@/components/Channel/Header.vue'
import ChannelTabs from '@/components/Channel/Tabs/index.vue'

const route = useRoute()

const channelId = computed(() => route.params.id.toString())
const channelData = ref<IChannel | null>(null)

const { isLoading } = useQuery({
  queryKey: ['channel', unref(channelId)],
  queryFn: () => getChannel(unref(channelId)),
  enabled: !!unref(channelId),
  refetchOnWindowFocus: false,
  select(data) {
    channelData.value = data
  },
})
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
      <a-image width="100%" :src="channelData.bannerUrl" :preview="false" />
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
        :relatedStreams="channelData.relatedStreams"
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
