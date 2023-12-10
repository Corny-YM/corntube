import { defineStore } from 'pinia'
import { ThemeEnum } from '@/enums/theme'

export const useApp = defineStore('app', () => {
  const currentTheme = ref(localStorage.getItem('theme') || ThemeEnum.DARK)

  const theme = computed(() =>
    currentTheme.value === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK
  )

  const toggleTheme = (value: ThemeEnum) => {
    currentTheme.value = value
    localStorage.setItem('theme', value)
  }

  onMounted(() => {
    const localTheme = localStorage.getItem('theme')
    if (!localTheme) {
      localStorage.setItem('theme', ThemeEnum.DARK)
    }
  })

  watch(
    [currentTheme, theme],
    () => {
      const el = document.documentElement
      el.classList.add(currentTheme.value)
      el.classList.remove(theme.value)
    },
    {
      immediate: true,
    }
  )

  return {
    currentTheme,
    toggleTheme,
  }
})
