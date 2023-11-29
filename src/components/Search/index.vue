<script setup lang="ts">
import { SelectValue } from 'ant-design-vue/es/select'
import {
  IChannelContent,
  IPlaylistContent,
  IRelatedStream,
  ISearch,
} from '@/api/model/piped'
import { useMutation } from '@tanstack/vue-query'
import { getNextDataSearch } from '@/api/piped'
import { Type } from '@/api/model/piped'
import { filterSearch } from './search.data'
import ItemVideos from '@/components/Search/ItemVideos.vue'

const props = defineProps<{
  data: ISearch
  filter: string
}>()

const emits = defineEmits(['update:filter'])

const route = useRoute()

const filterValueLabel = ref(
  filterSearch?.find((item) => item.value === props.filter)?.label || 'Tất cả'
)

const searchData = ref(props.data.items)
const nextpage = ref(props.data.nextpage!)

const query = computed(() => route.query.q!)
const filter = computed({
  get: () => props.filter,
  set: (value: string) => emits('update:filter', value),
})

const { mutate, isPending } = useMutation({
  mutationKey: ['nextpage', 'search'],
  mutationFn: getNextDataSearch,
  onSuccess(data) {
    searchData.value = [...searchData.value, ...data.items]
    nextpage.value = data.nextpage!
  },
})

const handleLoadNextPage = () => {
  if (!unref(nextpage)) return
  mutate({
    q: unref(query).toString(),
    filter: 'all',
    nextpage: unref(nextpage).toString(),
  })
}
const handleFilterFocus = () => {}
const handleFilterChange = (value: SelectValue) => {
  filter.value = value?.toString()!
}
</script>

<template>
  <div class="w-full h-full overflow-auto px-6 pt-2">
    <div class="max-w-[1250px] mx-auto flex justify-end items-center">
      <a-select
        ref="select"
        class="w-40"
        v-model:value="filterValueLabel"
        :options="filterSearch"
        @focus="handleFilterFocus"
        @change="handleFilterChange"
      ></a-select>
    </div>

    <div class="max-w-[1250px] mx-auto mt-4 pb-8">
      <template v-for="item in searchData" :key="item.url">
        <ItemVideos
          v-if="item.type === Type.Stream"
          :data="(item as IRelatedStream)"
        />
        <ItemChannel
          v-if="item.type === Type.Channel"
          :data="(item as IChannelContent)"
        />
        <ItemPlaylist
          v-if="item.type === Type.Playlist"
          :data="(item as IPlaylistContent)"
        />
      </template>

      <div v-if="!!nextpage && nextpage !== 'null'" class="w-full center mt-6">
        <a-button
          type="dashed"
          shape="round"
          size="large"
          :loading="isPending"
          @click="handleLoadNextPage"
        >
          Tải thêm
        </a-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
