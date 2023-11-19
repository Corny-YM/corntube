<script setup lang="ts">
import { SelectValue } from 'ant-design-vue/es/select'
import { DefaultOptionType } from 'ant-design-vue/es/vc-cascader'
import { IRelatedStream, ISearch } from '@/api/model/piped'
import { Type } from '@/api/model/piped'
import { filterSearch } from './search.data'

defineProps<{
  data: ISearch
}>()

const filterValue = ref(filterSearch![0].label || 'Tất cả')

const handleFilterFocus = () => {
  console.log('focus')
}
const handleFilterChange = (
  value: SelectValue,
  option: DefaultOptionType | DefaultOptionType[]
) => {
  console.log(`selected ${value}`)
  console.log(option)
}
</script>

<template>
  <div class="w-full h-full overflow-auto px-6 pt-2">
    <div class="max-w-[1250px] mx-auto flex justify-end items-center">
      <a-select
        ref="select"
        class="w-40"
        v-model:value="filterValue"
        :options="filterSearch"
        @focus="handleFilterFocus"
        @change="handleFilterChange"
      ></a-select>
    </div>

    <div class="max-w-[1250px] mx-auto pb-8">
      <template v-for="item in data.items">
        <ItemVideos
          v-if="item.type === Type.Stream"
          :data="(item as IRelatedStream)"
        />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
