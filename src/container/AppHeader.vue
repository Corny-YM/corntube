<script setup lang="ts">
import { MenuOutlined } from '@ant-design/icons-vue'
import { useMutation } from '@tanstack/vue-query'
import { loginGoogle } from '@/api/supabase'

const props = defineProps<{
  isShow: boolean
}>()

const emits = defineEmits(['update:isShow'])

const refUser = ref<HTMLDivElement | null>(null)
const refDropdown = ref<HTMLDivElement | null>(null)
const openDropdown = ref(false)

const isShow = computed({
  get: () => props.isShow,
  set: (value) => emits('update:isShow', value),
})

const { mutate } = useMutation({
  mutationKey: ['login'],
  mutationFn: loginGoogle,
})

const handleWindowClick = (e: Event) => {
  const target = e.target as HTMLElement

  const isClickUser = unref(refUser)?.contains(target)
  if (isClickUser) return
  const isContains = unref(refDropdown)?.contains(target)
  if (isContains) return

  openDropdown.value = false
}
const handleLogin = () => {
  mutate()
}

onMounted(() => {
  window.addEventListener('click', handleWindowClick)
})

onUnmounted(() => {
  window.removeEventListener('click', handleWindowClick)
})
</script>

<template>
  <header class="header">
    <!-- Logo -->
    <div class="flex items-center select-none">
      <!-- Toggle bar -->
      <div
        class="center w-full h-full md:text-xl mr-1 md:mr-2 p-2 cursor-pointer rounded-full hover:bg-lightHover"
        @click="isShow = !isShow"
      >
        <MenuOutlined />
      </div>

      <!-- Logo -->
      <router-link to="/" class="header-logo no-underline">
        <div
          class="text-xl md:text-3xl font-semibold font-rubikWet text-blueAntd"
        >
          CornTube
        </div>
      </router-link>
    </div>

    <!-- Search -->
    <SearchBar />

    <!-- More -->
    <div class="flex justify-center items-center gap-5">
      <ToggleTheme class="hidden md:inline-block" />
      <a-button type="dashed" class="btn-login" @click="handleLogin"
        >Đăng nhập</a-button
      >
      <!-- <a-dropdown
        class="cursor-pointer"
        :trigger="['click']"
        :open="openDropdown"
      >
        <div ref="refUser" class="center" @click="openDropdown = !openDropdown">
          <Avatar />
        </div>
        <template #overlay>
          <div
            ref="refDropdown"
            class="card-profile bg-white border border-solid border-slate-400"
          >
            <div class="card-profile__content cursor-default">
              <div class="flex justify-center items-center gap-4">
                <Avatar />
                <div class="flex flex-col gap-2">
                  <span class="font-semibold text-base">The Anh Nguyen</span>
                  <a-tag color="blue">theanh9356@gmail.com</a-tag>
                </div>
              </div>
            </div>
            <a-divider class="m-0" type="horizontal" />
            <div class="card-profile__action">
              <ToggleTheme class="inline-block md:hidden" />
              <div class="flex-1 flex justify-end items-center">
                <a-button type="primary">Đăng xuất</a-button>
              </div>
            </div>
          </div>
        </template>
      </a-dropdown> -->
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  z-index: 50;
  margin: 0;
  padding: 0.625rem 1rem;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-logo {
    display: flex;
    justify-items: center;
    font-size: 22px;
    color: #555;
    gap: 0.5rem;
    // border-right: solid 1px rgba(0, 0, 0, 0.1);
  }
}

.btn-login {
  @apply text-[#4096ff] border-[#4096ff] font-medium;
  transition: all 150ms linear;

  &:hover {
    @apply bg-[#4096ff25];
  }
}

.card-profile {
  width: max-content;
  border-radius: 8px;

  &__content {
    padding: 12px 16px;
  }

  &__action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
  }
}
</style>
