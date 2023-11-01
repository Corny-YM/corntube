<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getChannel } from '@/api/piped'
import ChannelHeader from '@/components/Channel/Header.vue'
import ChannelTabs from '@/components/Channel/Tabs/index.vue'

const route = useRoute()

const channelId = computed(() => route.params.id.toString())
const channelData = ref([])

const { isLoading } = useQuery({
  queryKey: ['channel', unref(channelId)],
  queryFn: () => getChannel(unref(channelId)),
  enabled: !!unref(channelId),
  refetchOnWindowFocus: false,
  select(data) {
    // TODO: handle data res & UI
    console.log(data)
    channelData.value = data
  },
})
</script>

<template>
  <div v-if="isLoading" class="w-full h-full center">
    <a-spin size="large" />
  </div>
  <div v-else-if="!channelData || !channelData.length" class="h-full center">
    <a-empty description="Không tìm thấy dữ liệu" />
  </div>
  <div class="w-full h-full overflow-y-auto">
    <!-- Banner Picture -->
    <div class="center">
      <a-image
        width="100%"
        src="https://pipedproxy.kavin.rocks/v_1RuJiuBNSsxeunJJH8_X4GWCHjz13yxpizS4qgjajmrwQtvGaBKfpHZQjOrrU-VWP9Fa38Q5Q=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rw?host=yt3.googleusercontent.com"
        :preview="false"
      />
    </div>

    <!-- Channel Header -->
    <ChannelHeader />

    <!-- Tabs -->
    <ChannelTabs />
  </div>
</template>
