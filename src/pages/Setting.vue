<script setup lang="ts">
import { SelectProps } from 'ant-design-vue'
import { SelectValue } from 'ant-design-vue/es/select'
import { useQuery } from '@tanstack/vue-query'
import { getCountries } from '@/api/country'
import { useApp } from '@/store/app'
import { storeToRefs } from 'pinia'

const app = useApp()
const { currentCountry } = storeToRefs(app)

const options = ref<SelectProps['options']>([])
const country = ref<string>(currentCountry.value)

const { isLoading } = useQuery({
  queryKey: ['settings', 'countries'],
  queryFn: () => getCountries(),
  select(res) {
    options.value = res.data.map((item) => ({
      value: item.alpha2Code || item.alpha3Code,
      label: item.name,
    }))
  },
})

const handleChange = (value: SelectValue) => {
  if (!value) return
  app.setCountry(value.toString())
}
</script>

<template>
  <div class="w-full h-full px-6 pt-2 dark:text-lightText">
    <div class="max-w-3xl mx-auto mt-4 pb-8">
      <div class="flex justify-between items-center w-full">
        <div class="center w-fit">
          <div class="center w-5 h-5 dark:text-lightText"><Location /></div>
          <div class="font-medium ml-2">Location</div>
        </div>
        <a-select
          class="w-52"
          placeholder="Chọn một vị trí"
          v-model:value="country"
          :disabled="!options || !options.length"
          :loading="isLoading"
          :options="options"
          @change="handleChange"
        ></a-select>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
