<script lang="ts" setup>
import { ref } from 'vue'
interface Option {
  query: string
  category: string
  value: string
  count: number
}
const value = ref('')
const dataSource = ref<Option[]>([])
const onSelect = (value: any) => {
  console.log('onSelect', value)
}

const getRandomInt = (max: number, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const searchResult = (query: string): Option[] => {
  return new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_item, idx) => ({
      query,
      category: `${query}${idx}`,
      value: `${query}${idx}`,
      count: getRandomInt(200, 100),
    }))
}
const handleSearch = (val: string) => {
  dataSource.value = val ? searchResult(val) : []
}
</script>

<template>
  <div>
    <a-auto-complete
      v-model:value="value"
      :dropdown-match-select-width="252"
      :options="dataSource"
      class="max-w-xs w-80 border-0"
      @select="onSelect"
      @search="handleSearch"
    >
      <template #option="item">
        <div style="display: flex; justify-content: space-between">
          <span>
            Found {{ item.query }} on
            <a
              :href="`https://s.taobao.com/search?q=${item.query}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ item.category }}
            </a>
          </span>
          <span>{{ item.count }} results</span>
        </div>
      </template>
      <a-input-search
        size="large"
        placeholder="Tìm kiếm"
        enter-button
      ></a-input-search>
    </a-auto-complete>
  </div>
</template>
