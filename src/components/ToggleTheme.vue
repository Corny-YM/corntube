<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useApp } from '@/store/app'
import { ThemeEnum } from '@/enums/theme'

type CheckedType = boolean | string | number

const app = useApp()
const { currentTheme } = storeToRefs(app)

const theme = computed(() => {
  if (currentTheme.value === ThemeEnum.DARK) return true
  return false
})
const checked = ref<boolean>(theme.value)

const handleChange = (checked: CheckedType) => {
  if (checked) app.toggleTheme(ThemeEnum.DARK)
  else app.toggleTheme(ThemeEnum.LIGHT)
}
</script>

<template>
  <a-switch
    v-model:checked="checked"
    checked-children="Dark"
    un-checked-children="Light"
    @change="handleChange"
  />
</template>
