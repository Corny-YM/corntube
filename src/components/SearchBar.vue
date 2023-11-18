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

const value = ref('')
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
  if (!value) return
  router.push({
    path: '/search',
    query: {
      q: value,
    },
  })
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
  <div>
    <a-auto-complete
      v-model:value="value"
      class="max-w-xs w-80 border-0"
      :dropdown-match-select-width="252"
      :options="dataSource"
      @select="handleSelect"
    >
      <template #option="item">
        <div class="flex justify-between">
          <span class="font-medium">{{ item.category }}</span>
        </div>
      </template>
      <a-input-search
        size="large"
        placeholder="Tìm kiếm"
        enter-button
        :loading="isPending"
        @search="handleSelect"
      ></a-input-search>
    </a-auto-complete>
  </div>
</template>
