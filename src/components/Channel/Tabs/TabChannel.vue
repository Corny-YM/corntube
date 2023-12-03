<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import { getTabsData } from '@/api/piped'
import type { ITabChannel, IChannelContent } from '@/api/model/piped'
import NoAvatar from '@/assets/imgs/NoAvatar.png'
import { formatViews } from '@/utils'

const props = defineProps<{
  data: string
}>()
const route = useRoute()
const channelId = computed(() => route.params.id.toString())
const channelData = ref<IChannelContent[]>([])
const dataNextPage = ref('')

const { isLoading } = useQuery({
  enabled: !!unref(channelId) && !!props.data,
  queryKey: ['shorts', unref(channelId), props.data],
  queryFn: () => getTabsData<ITabChannel>(props.data),
  select(data) {
    channelData.value = data.content
    dataNextPage.value = data.nextpage
  },
})

const { mutate, isPending } = useMutation({
  mutationKey: ['nextpage', dataNextPage.value],
  mutationFn: (params: { data: string; nextpage: string }) =>
    getTabsData<ITabChannel>(params.data, params.nextpage),
  onSuccess(data) {
    channelData.value = [...channelData.value, ...data.content]
    dataNextPage.value = data.nextpage || ''
  },
})

const handleLoadNextPage = () => {
  if (!unref(dataNextPage)) return
  mutate({
    data: props.data,
    nextpage: dataNextPage.value,
  })
}
</script>

<template>
  <div v-if="isLoading" class="w-full h-full center">
    <a-spin size="large" />
  </div>
  <div v-else-if="!channelData || !channelData.length" class="h-full center">
    <EmptyData description="Kênh này chưa có bất kỳ kênh nào khác" />
  </div>
  <div class="channel-list mb-2">
    <div
      v-for="channel in channelData"
      :key="channel.url"
      class="center flex-col mb-4"
    >
      <a-image
        class="rounded-full"
        :width="103"
        :preview="false"
        :src="channel.thumbnail"
        :fallback="NoAvatar"
      />
      <a :href="channel.url" class="text-center font-medium my-1">{{
        channel.name
      }}</a>
      <div class="text-xs text-lightTitle">
        {{ formatViews(channel.subscribers, 0) }} người đăng ký
      </div>

      <a-button type="primary" shape="round" class="mt-4 text-xs">
        Đăng ký
      </a-button>
    </div>
  </div>
  <div v-if="dataNextPage" class="w-full center mb-4">
    <a-button
      type="dashed"
      shape="round"
      :loading="isPending"
      @click="handleLoadNextPage"
    >
      Tải thêm
    </a-button>
  </div>
</template>

<style scoped lang="scss">
.channel-list {
  @apply w-full grid gap-y-2;
  @apply grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5;
}
</style>
