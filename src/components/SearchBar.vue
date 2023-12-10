<script lang="ts" setup>
import { useMutation } from '@tanstack/vue-query'
import { useDebounce } from '@/utils'
import { getSuggestions } from '@/api/piped'

interface Option {
  query: string
  category: string
  value: string
  count: number
}

const router = useRouter()
const route = useRoute()

const value = ref(route.query.q?.toString() || '')
const dataSource = ref<Option[]>([])

const { mutate, isPending } = useMutation({
  mutationKey: ['suggestions', 'get'],
  mutationFn: getSuggestions,
  onSuccess(data) {
    dataSource.value = data.map((suggestion) => ({
      query: suggestion,
      category: suggestion,
      value: suggestion,
      count: 0,
    }))
  },
})

const handleSelect = (value: any) => {
  if (!value.trim()) return
  router.push({
    path: '/search',
    query: {
      q: value,
    },
  })
}
const handleKeyDown = (e: KeyboardEvent) => {
  if (!unref(value).trim()) return
  if (e.code === 'Enter') {
    router.push({
      path: '/search',
      query: {
        q: unref(value),
      },
    })
  }
}
const handleMutateSearch = useDebounce(() => {
  const inputValue = unref(value)
  mutate(inputValue)
}, 500)

watch(
  () => unref(value),
  () => {
    if (!unref(value).trim()) {
      dataSource.value = []
      return
    }
    handleMutateSearch()
  }
)
</script>

<template>
  <div class="">
    <a-auto-complete
      v-model:value="value"
      class="md:w-80 border-0 mx-2 dark:bg-headerDark"
      :dropdown-match-select-width="252"
      :options="dataSource"
      :defaultActiveFirstOption="false"
      @select="handleSelect"
      @keydown="handleKeyDown"
    >
      <a-input-search
        class="header--search-bar"
        size="large"
        placeholder="Tìm kiếm"
        enter-button
        :loading="isPending"
        @search="handleSelect"
      ></a-input-search>
    </a-auto-complete>
  </div>
</template>

<style scoped lang="scss"></style>
