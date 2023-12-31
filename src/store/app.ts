import { defineStore } from 'pinia'
import { ThemeEnum } from '@/enums/theme'
import { notification } from 'ant-design-vue'
import { ArgsProps } from 'ant-design-vue/es/notification/interface'

enum ItemEnum {
  COUNTRY = 'country',
  THEME = 'theme',
}
const initCountry = 'VN'

export const useApp = defineStore('app', () => {
  const [api, contextHolder] = notification.useNotification({
    placement: 'topRight',
    maxCount: 3,
  })

  const currentCountry = ref(
    localStorage.getItem(ItemEnum.COUNTRY) || initCountry
  )
  const currentTheme = ref(
    localStorage.getItem(ItemEnum.THEME) || ThemeEnum.DARK
  )

  const theme = computed(() =>
    currentTheme.value === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK
  )

  const toggleTheme = (value: ThemeEnum) => {
    currentTheme.value = value
    localStorage.setItem(ItemEnum.THEME, value)
  }
  const setCountry = (value: string) => {
    currentCountry.value = value
    localStorage.setItem(ItemEnum.COUNTRY, value)
  }

  const notificationPopup = (value: ArgsProps) => {
    api.info(value)
  }
  const notificationClose = async (key: string) => {
    await notification.close(key)
  }

  onMounted(() => {
    const localTheme = localStorage.getItem(ItemEnum.THEME)
    const localCountry = localStorage.getItem(ItemEnum.COUNTRY)
    if (!localTheme) localStorage.setItem(ItemEnum.THEME, ThemeEnum.DARK)
    if (!localCountry) localStorage.setItem(ItemEnum.COUNTRY, initCountry)
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
    currentCountry,
    toggleTheme,
    setCountry,
    notificationPopup,
    notificationClose,
    contextHolder,
  }
})
